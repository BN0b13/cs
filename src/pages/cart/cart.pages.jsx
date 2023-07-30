import { useContext, useEffect, useState } from 'react';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import CartItem from '../../components/cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import {
    CartCollapseButtonContainer,
    CartItemsContainer,
    CartPageContainer,
    CartPageEmpty,
    CartPageTitle,
    SubtotalContainer,
    SubtotalText
} from './cart.styles';

import { convertProductPrice } from '../../tools/cart';
import Client from '../../tools/client';

const client = new Client();

const CartPage = () => {

    const [cart, setCart] = useState(null);
    const [subtotal, setSubtotal] = useState(null);

    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        const getCart = async () => {
            const res = await client.getCartContents();
            let subtotal = 0;
            res.rows[0].products.map(item => subtotal = subtotal + (item.quantity * item.product[0].price));
            setSubtotal(subtotal);
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
                cart.length === 0 ?
                    <CartPageEmpty>Your Cart is Empty</CartPageEmpty>
                :
                    <>
                        <CartItemsContainer>
                            {
                                cart.map((item, index) => 
                                    <CartItem key={index} quantity={item.quantity} product={item.product[0]} />
                                )
                            }
                        </CartItemsContainer>
                        <SubtotalContainer>
                            <SubtotalText>
                                Subtotal:
                            </SubtotalText>
                            <SubtotalText>
                                { convertProductPrice(subtotal) }
                            </SubtotalText>
                        </SubtotalContainer>
                        <CartCollapseButtonContainer>
                            <Button onClick={() => window.location = '/checkout'}>Checkout</Button>
                        </CartCollapseButtonContainer>
                    </>
            }
        </CartPageContainer>
    );
};

export default CartPage;