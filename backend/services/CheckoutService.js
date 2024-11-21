import { deliveryInsurance, shippingAndHandling } from '../config.js';

import CartRepository from '../repositories/CartRepository.js';
import CartService from '../services/CartService.js';
import ProductRepository from '../repositories/ProductRepository.js';
import SaleRepository from '../repositories/SaleRepository.js';
import SaleService from '../services/SaleService.js';

const cartRepository = new CartRepository();
const cartService = new CartService();
const productRepository = new ProductRepository();
const saleRepository = new SaleRepository();
const saleService = new SaleService();

export default class CheckoutService {
    
    checkoutSetUp = async (id) => {
        const getSales = await saleRepository.getActiveSales();
        const getCart = await cartRepository.getCart(id);
        const cart = getCart.dataValues;
        let products = [];
        let subtotal = 0;

        for(let product of cart.products) {
            const getProduct = await productRepository.getProductById(product.productId);
            const data = getProduct.data;
            const inventory = data.Inventories.filter(item => item.id === product.inventoryId)[0];
            subtotal = subtotal + (inventory.price * product.quantity);
            products.push({
                product: data,
                inventory,
                quantity: product.quantity
            });
        }

        cart.products = products;

        let data = {
            deliveryInsurance,
            shippingAndHandling,
            cart,
            subtotal
        };

        if (getSales.rows.length > 0) {
            console.log('Sale is active, processing cart...');
            data = saleService.processCart(data);
        }
        
        return data;
    }
}