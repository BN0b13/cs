import React, { useContext, useEffect, useState } from 'react';

import Spinner from '../../components/spinner/spinner.component';

import Cart from '../../components/cart/cart.component';

import { CartContext } from '../../contexts/cart.context';

import {
    CartInformation,
    CartInformationContainer,
    CartPageContainer,
    CartPageEmpty,
    CartShipping,
    CartSubtotal,
    CartPageTitle,
    CartTotal,
    CartTotalContainer
} from './cart.styles';

import { shippingAndHandling } from '../../config';

import { convertProductPrice } from '../../tools/cart';
import Client from '../../tools/client';

const client = new Client();

const CartPage = () => {
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
        <CartPageContainer>
            <CartPageTitle>Cart</CartPageTitle>
            { !cart ?  
                <Spinner />
            :
                <>
                    {cart.length === 0 ?
                        <CartPageEmpty>Your Cart is Empty</CartPageEmpty>
                    :
                     <>
                        {cart.map((item, index) => {
                        const product = products.filter(prod => prod.id === item.productId);
                        return <Cart key={index} quantity={item.quantity} product={product[0]} />
                        })}
                        <CartInformationContainer>
                            <CartInformation>

                            </CartInformation>
                            <CartTotalContainer>
                                <CartSubtotal>
                                        Subtotal: { convertProductPrice(subtotal) }
                                </CartSubtotal>
                                <CartShipping>
                                        Shipping: { convertProductPrice(shippingAndHandling) }
                                </CartShipping>
                                <CartTotal>
                                        Total: { convertProductPrice(subtotal + shippingAndHandling) }
                                </CartTotal>
                            </CartTotalContainer>
                        </CartInformationContainer>
                     </>
                    }
                </>
            }
        </CartPageContainer>
    );
};

export default CartPage;