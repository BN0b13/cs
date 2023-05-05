import React, { useContext, useEffect, useState } from 'react';

import Spinner from '../../components/spinner/spinner.component';

import CartItem from '../../components/checkout/cart-item/cart-item.component';
import CartTotal from '../../components/checkout/cart-total/cart-total.component';

import { CartContext } from '../../contexts/cart.context';

import {
    CheckoutPageContainer,
    CheckoutPageEmpty,
    CheckoutPageTitle,
} from './checkout.styles';

import { shippingAndHandling } from '../../config';

import { convertProductPrice } from '../../tools/cart';
import Client from '../../tools/client';

const client = new Client();

const CheckoutPage = () => {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const [subtotal, setSubtotal] = useState(null);
    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        const getCart = async () => {
            const getProducts = await client.getProducts();
            const res = await client.getCart();
            let total = 0;
            res.rows[0].products.map(item => {
                const product = getProducts.rows.filter(prod => prod.id === item.productId);
                total = total + (item.quantity * product[0].price);
            });
            setSubtotal(total);
            setProducts(getProducts.rows);
            setCart(res.rows[0].products);
        }
        getCart();
    }, [ cartItems ]);
    

    return (
        <CheckoutPageContainer>
            <CheckoutPageTitle>Checkout</CheckoutPageTitle>
            { !cart ?  
                <Spinner />
            :
                <>
                    {cart.length === 0 ?
                        <CheckoutPageEmpty>Your Cart is Empty</CheckoutPageEmpty>
                    :
                     <>
                        {cart.map((item, index) => {
                        const product = products.filter(prod => prod.id === item.productId);
                        return <CartItem key={index} quantity={item.quantity} product={product[0]} />
                        })}
                        <CartTotal subtotal={subtotal} shippingAndHandling={shippingAndHandling} />
                     </>
                    }
                </>
            }
        </CheckoutPageContainer>
    );
};

export default CheckoutPage;