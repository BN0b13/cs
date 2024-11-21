import { Op } from 'sequelize';

import { Cart, Product } from '../models/Associations.js';

class CartRepository {


    // CREATE

    async create(id) {
        try {
            const params = {
                userId: id,
                products: []
            };

            const res = await Cart.create(params);

            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the cart');
        }
    }

    // READ

    async getCart(id) {
        try {
            const res = await Cart.findOne({
                where: {
                    userId: id
                }
            });
            
            if(res === null) {
                await this.create(id);
                return await Cart.findOne({
                    where: {
                        userId: id
                    }
                });
            }

            return res;
        } catch (err) {
            console.log('Get Cart Error: ', err);
            throw Error('There was an error getting cart');
        }
    }

    async getCartsWithContents() {
        try {
            const res = await Cart.findAndCountAll();
            const cartsWithContents = res.rows.filter(cart => cart.products.length > 0);

            return cartsWithContents;
        } catch (err) {
            console.log('Get Cart Error: ', err);
            throw Error('There was an error getting cart');
        }
    }

    // UPDATE

    async patchCart(id, data) {
        try {
            const res = await Cart.update(
                data,
                {
                    where: {
                                userId: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update to Cart Error: ', err);
            throw Error('There was an error updating to cart');
        }
    }

    // DELETE

    async deleteCart(id) {
        try {
            const res = await Cart.destroy({
                where: {
                    id
                }
            });

            return {
                result: res
            }
        } catch (err) {
            console.log('DELETE Cart Error: ', err);
            throw Error('There was an error deleting cart');
        }
    }
}

export default CartRepository;