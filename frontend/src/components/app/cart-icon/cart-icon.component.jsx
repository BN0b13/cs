import { useContext, useEffect, useState } from 'react';

import { ReactComponent as ShoppingIcon } from '../../../assets/img/shopping-bag.svg';

import { getCartCount } from '../../../tools/cart';

import { CartContext } from '../../../contexts/cart.context';
import { ConfigurationContext } from '../../../contexts/configuration.context';

import { tokenName, cartTokenName } from '../../../config';

import {
    CartIconContainer,
    Icon,
    ItemCount
} from './cart-icon.styles';

const CartIcon = () => {
    const loggedInStatus = localStorage.getItem(tokenName);
    const cartTokenCount = localStorage.getItem(cartTokenName);
    const [count, setCount] = useState(cartTokenCount ? cartTokenCount : 0);

    const { cartItems } = useContext(CartContext);
    const { colors } = useContext(ConfigurationContext);


    useEffect(() => {
        const getCart = async () => {
            const res = await getCartCount();
            localStorage.setItem(cartTokenName, res.currentCount);
            setCount(res.currentCount);
        }

        if(loggedInStatus) {
            getCart();
        } else {
            setCount(0);
        }
    }, [ loggedInStatus, cartItems ]);

    const navigateToCart = () => {
        if(!loggedInStatus) {
            return
        }
        window.location = '/cart';
    }

    return(
        <CartIconContainer onClick={() => navigateToCart()}>
            <Icon theme={colors}>
                <ShoppingIcon />
            </Icon>
            <ItemCount>
                {count}
            </ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;