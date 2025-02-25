import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { sequelize } from "../db.js";

import { Coupon, Inventory, Order, Sale, User } from '../models/Associations.js';

import CartService from './CartService.js';
import EmailService from './EmailService.js';
import InventoryService from './InventoryService.js';
import OrderRepository from '../repositories/OrderRepository.js';
import PaymentService from './PaymentService.js'
import ProductService from './ProductService.js';
import SaleService from './SaleService.js';
import UserRepository from '../repositories/UserRepository.js';

const cartService = new CartService();
const emailService = new EmailService();
const inventoryService = new InventoryService();
const orderRepository = new OrderRepository();
const paymentService = new PaymentService();
const productService = new ProductService();
const saleService = new SaleService();
const userRepository = new UserRepository();

export default class OrderService {

    // Read

    searchOrders = async ({ search = '', page, size, sortKey, sortDirection }) => {
        try {
            const getCount = await sequelize.query(`
            select *
            from  ${process.env.PG_SCHEMA_NAME}."Orders" as "Order"
            where ("Order"."refId" ilike '%${search}%' or "Order".status ilike '%${search}%' or "Order".tracking ilike '%${search}%')
            `);

            const currentPage = page * size;
            const res = await sequelize.query(`
            SELECT *
            FROM  ${process.env.PG_SCHEMA_NAME}."Orders" AS "Order"
            WHERE ("Order"."refId" ilike '%${search}%' OR "Order".status ilike '%${search}%' or "Order".tracking ilike '%${search}%')
            ORDER BY "Order"."${sortKey}" ${sortDirection}
            LIMIT ${size}
            OFFSET ${currentPage}
            `);

            return {
                count: getCount[1].rowCount,
                rows: res[0]
            };
        } catch (err) {
            console.log('Search Orders Error: ', err);
            throw Error('There was an error searching Orders');
        }
    }

    checkUserCreditAmount = async (userId, credit, total) => {
        let updatedCredit = credit;

        if(credit > total) {
            updatedCredit = credit - total;
        }

        const getUser = await userRepository.getUserById(userId);

        if(!getUser.credit || getUser.credit < updatedCredit) {
            return {
                error: 'User does not have enough credit on account to support the amount on order'
            }
        }

        return {
            currentUserCredit: getUser.credit,
            newUserCredit: getUser.credit - updatedCredit,
            credit: updatedCredit,
            total: total - updatedCredit
        };
    }

    // Create

    createOrder = async (params) => {
        const {
            userId,
            products,
            billingAddress,
            shippingAddress,
            shippingId,
            shippingTotal = 0,
            deliveryInsurance,
            deliveryInsuranceTotal = 0,
            couponId = null,
            notes = null,
            paymentType,
            credit = null
        } = params;
        let total = shippingTotal + deliveryInsuranceTotal;

        const handleSales = await saleService.updateOrderTotalWithActiveSales(products, shippingTotal, deliveryInsuranceTotal);
        total = total + handleSales.subtotal;

        let orderCreditData = null;

        if(credit) {
            const creditCheck = await this.checkUserCreditAmount(userId, credit, total);
            if(creditCheck.error) {
                return {
                    error: creditCheck.error
                }
            } else {
                orderCreditData = creditCheck;
                total = creditCheck.total
            }
        }

        const refId = uuidv4();

        try {
            const res = await sequelize.transaction(async (t) => {
        
                const orderData = {
                    userId,
                    refId,
                    products,
                    total,
                    billingAddress,
                    shippingAddress,
                    shippingId,
                    shippingTotal,
                    deliveryInsurance,
                    deliveryInsuranceTotal,
                    couponId,
                    saleId: handleSales.saleId,
                    status: 'pending',
                    paid: false,
                    paymentLink: '',
                    fulfilledBy: null,
                    tracking: null,
                    notes,
                    paymentType
                };

                if(orderCreditData) {
                    orderData.credit = orderCreditData;
                    const newUserCredit = {
                        credit: orderCreditData.newUserCredit
                    };

                    await User.update(newUserCredit, {
                        where: {
                            id: userId
                        },
                        transaction: t 
                    });
                }

                const result = await Order.create(orderData, { transaction: t });
                return result;
            });

            return {
                result: res,
                status: 201,
                refId
            };
        } catch (err) {
            console.log('Order Create Error: ', err);
            throw Error('There was an error creating the Order');
        }
    }

    sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    checkOrderStatus = async (id) => {
        let orderPending = true;
        let order;

        while(orderPending) {
            await this.sleep(1000);
            const getOrder = await orderRepository.getOrderById(id);
            
            if(getOrder.dataValues.status !== 'pending') {
                orderPending = false;
                order = getOrder.dataValues;
                break;
            }
        }

        return order;
    }

    processOrder = async (params) => {
        const {
            userId,
            email,
            orderRefId
        } = params;

        const order = await Order.findOne({
            where: {
                refId: orderRefId
            }
        });

        const orderId = order.dataValues.id;
        const orderProducts = order.dataValues.products;

        const checkInventory = await this.confirmInventoryIsAvailable(orderProducts);

        if(!checkInventory.result) {
            await orderRepository.deleteOrder(orderId);
            await cartService.emptyCart(userId);

            return {
                status: 404,
                message: 'Inventory not available'
            };
        }

        let newInventoryQuantity = [];
        
        checkInventory.data.map(inventory => newInventoryQuantity.push(inventory));

        try {
            const res = await sequelize.transaction(async (t) => {
                for(const singleInventory of newInventoryQuantity) {
                    await inventoryService.modifyInventory(singleInventory, { transaction: t });
                }

                
                await cartService.emptyCart(userId, { transaction: t });

                await orderRepository.updateOrder(orderId, { status: 'new' });

                await emailService.orderReceivedEmail({ buyerEmail: email, refId: orderRefId });

                return;
            });

            return {
                status: 201
            };
        } catch (err) {
            console.log('Order Create Error: ', err);
            throw Error('There was an error creating the Order');
        }
    }

    confirmInventoryIsAvailable = async (orderProducts) => {
        const getInventory = await Inventory.findAndCountAll();
        let result = true;
        let data = [];

        orderProducts.map(product => {
            const productInventory = getInventory.rows.filter(inventory => inventory.id === product.inventoryId)[0].dataValues;

            if(productInventory.quantity < product.quantity) {
                result = false;
            } else {
                data.push({
                    id: product.inventoryId,
                    quantity: productInventory.quantity - product.quantity
                });
            }
        });

        return {
            result,
            data
        };
    }

    // Read

    async getOrderById(id) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    userId: id
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });

            const data = res.rows[0].products;
            const ids = data.map(item => item.productId);
            const products = await productService.getProductsByIds(ids);
            const productData = products.rows.map(item => item.dataValues);

            data.forEach((item, index) => {
                item['product'] = productData.filter(product => product.id === item.productId);
            });

            res.rows[0].products = data;

            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderByRef(refId) {
        try {
            const res = await Order.findOne({
                where: {
                    refId
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });

            if(!res) {
                return {
                    status: 404
                }
            }

            const data = res.products;
            const ids = data.map(item => item.productId);
            const products = await productService.getProductsByIds(ids);
            const productData = products.rows.map(item => item.dataValues);

            data.forEach((item, index) => {
                item['product'] = productData.filter(product => product.id === item.productId);
            });

            res.products = data;

            return res;
        } catch (err) {
            console.log('Get Order By Ref Error: ', err);
            throw Error('There was an error getting order by ref');
        }
    }

    async cancelOrder(id) {
        const order = await Order.findOne({
            where: {
                id
            }
        });

        console.log('Order db res: ', order.dataValues);
        const orderProducts = order.dataValues.products;
        console.log('Order Products: ', orderProducts);

        for(const product of orderProducts) {
            const inventory = await Inventory.findOne({
                where: {
                    id: product.inventoryId
                }
            });

            const quantity = inventory.dataValues.quantity;

            await Inventory.update(
                {
                    quantity: quantity + product.quantity
                },
                {
                    where: {
                        id: product.inventoryId
                    }
                }
            );
        }

        await Order.update(
            {
                status: 'canceled'
            },
            {
                where: {
                    id
                }
            }
        )

        return {
            status: 200
        }
    }

    async sendPaymentLink(orderId, data) {
        try {
        const {
            email,
            refId,
            paymentLink,
            status
        } = data;

        const params = {
            status,
            paymentLink
        }
        
            const res = await Order.update(
                params,
                {
                    where: {
                        id: orderId
                    }
                }
            );

            await emailService.sendPaymentLink({ buyerEmail: email, refId, paymentLink });

            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }

    }

    async shipOrder(id, data) {
        try {
        const {
            email,
            refId,
            status,
            tracking
        } = data;

        const params = {
            status,
            tracking
        }
        
            const res = await Order.update(
                params,
                {
                    where: {
                        id
                    }
                }
            );

            await emailService.orderShippedEmail({ buyerEmail: email, refId, tracking });

            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }

    }
}