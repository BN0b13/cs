

import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { sequelize } from "../db.js";

import { Order } from '../models/Associations.js';

import InventoryRepository from '../repositories/InventoryRepository.js';
import ProductRepository from '../repositories/ProductRepository.js';
import SaleRepository from '../repositories/SaleRepository.js';

const inventoryRepository = new InventoryRepository();
const productRepository = new ProductRepository();
const saleRepository = new SaleRepository();

export default class SaleService {

    updateOrderTotalWithActiveSales = async (orderProducts) => {
        // console.log('Update Order Total with active sales: PRODUCTS: ', products);
        let subtotal = 0;
        let saleSubtotal = 0;
        let sale = null;
        const orderProductIds = [];

        let newProducts = [];
        let inventoryTypes = [];

        orderProducts.map(product => orderProductIds.push(product.productId));

        const getProductsInOrder = await productRepository.getProductsByIds(orderProductIds);

        // console.log('GET products: ', getProductsInOrder.rows);

        orderProducts.map(requestedOrderProduct =>
            getProductsInOrder.rows.map(product => 
                product.Inventories.map(inventory => {
                    // console.log('Inventory: ', inventory.dataValues);

                    // Build product data for products in cart
                    const data = {
                        product,
                        inventory,
                        quantity: requestedOrderProduct.quantity
                    };

                    newProducts.push(data);

                    // Calculate subtotal before sale

                    inventory.id === requestedOrderProduct.inventoryId ? 
                    subtotal = subtotal + (inventory.price * requestedOrderProduct.quantity) 
                    : 
                    '';

                    // Group Inventory Types - TODO: need to map over something else, products in cart? If product in cart inventoryId matches current inventory...something something something?
                    // if(inventoryTypes.length === 0){
                    //     console.log('First item of inventory type array.');
                    //     inventoryTypes.push({
                    //         inventory: inventory.dataValues,
                    //         quantity: requestedOrderProduct.quantity
                    //     });
                    // } else {
                    //     inventoryTypes.map((item, index) => {
                    //         if(item.type === inventory.type && item.size === inventory.size) {
                    //             console.log('This inventory type exists already');

                    //             item = {
                    //                 inventory: inventory.dataValues,
                    //                 quantity: item.quantity + requestedOrderProduct.quantity
                    //             }
                    //         } else {
                                  
                    //         }
                    //     });
                    // }
                })));
        
        // console.log('subtotal: ', subtotal);
        // console.log('Final inventory types arr: ', inventoryTypes);

        // const activeSales = await saleRepository.getActiveSales();

        // console.log('Active Sales: ', activeSales.rows);

        // if(activeSales.rows.length > 0) {
        //     if(activeSales.rows[0].type === 'bogo') {
            
        //         let productCount = 0;
        //         let discountAmountRemoved = 0;
    
        //         orderProductsArray.map(product => {
        //             total = total + (product.quantity * product.price);
        //             productCount = productCount + product.quantity;
        //         });
    
        //         const price = orderProductsArray[0].price;
        //         total = price * Math.floor(productCount/2);
        //         discountAmountRemoved = (price * productCount) - total;
                
        //         if(productCount%2 !== 0) {
        //             total = total + price;
        //             discountAmountRemoved = discountAmountRemoved - price;
        //         }
        //     }
        // }
        
        return {
            subtotal,
            // saleId: activeSales.rows.length > 0 ? activeSales.rows[0].id : null
        };
    }

    processCart = (cart) => {
        // console.log('Cart: ', cart);
        // console.log('Products: ', cart.cart.products);

        let typesOfProducts = [];

        const cloneProducts = cart.cart.products.filter(product => product.type === 'clones');
        const merchandiseProducts = cart.cart.products.filter(product => product.type === 'merchandise');
        const seedProducts = cart.cart.products.filter(product => product.type === 'seeds');

        // console.log('Clone Products: ', cloneProducts);
        // console.log('Merchandise Products: ', merchandiseProducts);
        // console.log('Seed Products: ', seedProducts);

        
        return cart;
    }
}