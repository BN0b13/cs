import { Cart, Inventory, Product } from '../models/Associations.js';

import ProductService  from '../services/ProductService.js';

const productService = new ProductService();

export default class CartService {

    emptyCart = async (userId) => {
        return Cart.update(
            {
                products: []
            },
            { 
                where: {
                    userId
                }
            });
    }

    updateCart = async (userId, cart) => {
        let canUpdateCart = true;

        for(let product of cart.products) {
            const res = await Product.findOne({
                where: {
                    id: product.productId
                },
                include: [
                    { 
                        model: Inventory
                    }
                ]
            });

            if(res === null) {
                return {
                    status: 404
                }
            }

            const inventory = res.Inventories.filter(data => data.id === product.inventoryId)[0];

            if(product.quantity > inventory.quantity) {
                canUpdateCart = false;
            }
        }

        if(!canUpdateCart) {
            return {
                status: 400
            }
        }

        return Cart.update(
            {
                products: cart.products
            },
            { 
                where: {
                    userId
                }
            });
    }
}