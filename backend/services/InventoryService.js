import { Op } from 'sequelize';

import { Inventory, Product } from '../models/Associations.js';

export default class InventoryService {

    modifyInventory = async ({ id, quantity }) => {
        // GET OP.in inventory ids
        // 
        try {
            return await Inventory.update(
                {
                    quantity
                },
                {
                    where: {
                        id
                    }
                });
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error updating Inventory');
        }
    }

    // modifyInventory = async (ids) => {
    //     try {
    //         return await Inventory.update(
    //             {
    //                 available: false
    //             },
    //             {
    //                 where: {
    //                     id: {
    //                         [Op.in]: ids
    //                     }
    //                 }
    //             });
    //     } catch (err) {
    //         console.log('GET Product Error: ', err);
    //         throw Error('There was an error updating Inventory');
    //     }
    // }

    deleteInventoryById = async (id) => {
        const inventory = await Inventory.findOne({
            where: {
                id
            }
        });
        
        const product = await Product.findOne({
            where: {
                id: inventory.dataValues.productId
            },
            include: [
                { 
                    model: Inventory,
                    required: true
                },
            ]
        });

        if(product.dataValues.Inventories.length === 1) {
            return {
                status: 403,
                message: 'Unable to delete inventory. Only inventory associated with product.'
            }
        }

        await Inventory.destroy({
            where: {
                id
            }
        });
        
        return {
            status: 200
        }
    }
}