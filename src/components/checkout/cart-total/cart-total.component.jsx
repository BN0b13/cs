import { useEffect, useContext, useState } from 'react';

import { CartContext } from '../../../contexts/cart.context';

import {
    convertProductPrice
} from '../../../tools/cart';

import {
    CartFinalTotalContainer,
    CartTotalContainer,
    CartDetailsContainer,
    CartSubtotalContainer,
    CartSubtotalText,
    CartShippingContainer,
    CartShippingText,
    CartTotalText
} from './cart-total.styles';

const CartTotal = ({ subtotal, shippingAndHandling }) => {
    const [ mobileView, setMobileView ] = useState(false);
    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        if(window.screen.width < 500) {
            setMobileView(true);
        }
    }, []);

    return (
        <CartTotalContainer mobileView={mobileView}>
            <CartDetailsContainer mobileView={mobileView}>
                <CartSubtotalContainer>
                    <CartSubtotalText>
                            Subtotal: 
                    </CartSubtotalText>
                    <CartSubtotalText>
                            { convertProductPrice(subtotal) }
                    </CartSubtotalText>
                </CartSubtotalContainer>
                <CartShippingContainer>
                    <CartShippingText>
                            Shipping:
                    </CartShippingText>
                    <CartShippingText>
                            { convertProductPrice(shippingAndHandling) }
                    </CartShippingText>
                </CartShippingContainer>
                <CartFinalTotalContainer>
                    <CartTotalText>
                            Total:
                    </CartTotalText>
                    <CartTotalText>
                            { convertProductPrice(subtotal + shippingAndHandling) }
                    </CartTotalText>
                </CartFinalTotalContainer>
            </CartDetailsContainer>
        </CartTotalContainer>
    )
}

export default CartTotal;