import { Sequelize, Op } from 'sequelize';
import dayjs from 'dayjs';

import { sequelize } from '../db.js';

import { Coupon, Order, Sale } from '../models/Associations.js';

class OrderRepository {

    // READ

    async getOrders({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            return await Order.findAndCountAll({
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ],
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: (page * size),
            });
        } catch (err) {
            console.log('Get Orders Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByStatus(status) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    status
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

            return res;
        } catch (err) {
            console.log('Get All Orders Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderById(id) {
        try {
            const res = await Order.findOne({
                where: {
                    id
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

            if(res === null) {
                return {
                    status: 404
                }
            }

            return res;
        } catch (err) {
            console.log('Get Order Error: ', err);
            throw Error('There was an error getting order by id');
        }
    }

    async getOrdersByUserId(id) {
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
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByProductId(productId) {
        try {
            const res = await sequelize.query(`select *
            from ${process.env.PG_SCHEMA_NAME}."Orders"
            where products @> '[{"productId": ${productId}}]'::jsonb`);
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderByRefId(refId) {
        try {
            const res = await Order.findOne({
                where: {
                    refId: refId
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

            if(res === null) {
                return {
                    status: 404
                }
            }

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

            if(res === null) {
                return {
                    status: 404
                }
            }
            
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersPerDay(startDate = null, endDate = null) {
        try {
            const whereCondition = {};
    
            if (startDate && endDate) {
                const start = new Date(startDate * 1000);
                const end = new Date(endDate * 1000);
    
                if (isNaN(start) || isNaN(end)) {
                    throw new Error('Invalid date format');
                }
    
                whereCondition.createdAt = {
                    [Op.between]: [start, end]
                };
            }
    
            return await Order.findAll({
                where: whereCondition,
                attributes: [
                    [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'income'] 
                ],
                group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
                order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'DESC']]
            });
        } catch (err) {
            console.error('Error fetching new orders per day:', err);
            throw err;
        }
    }

    // UPDATE

    async updateOrder(id, data) {
        try {
            const res = await Order.update(
                data,
                {
                    where: {
                                id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    // DELETE

    async deleteOrder(id) {
        try {
            const res = await Order.destroy(
                {
                    where: {
                                id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('DELETE Order Error: ', err);
            throw Error('There was an error deleting the order');
        }
    }
    
}

export default OrderRepository;