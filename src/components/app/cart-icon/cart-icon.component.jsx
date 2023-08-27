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

    const { cartItems } = useContext(CartContext);
    const { colors } = useContext(ConfigurationContext);

    const [count, setCount] = useState(cartTokenCount ? cartTokenCount : 0);

    useEffect(() => {
        const getCart = async () => {
            const res = await getCartCount();
            localStorage.setItem(cartTokenName, res);
            setCount(res);
        }
        if(loggedInStatus) {
            getCart();
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