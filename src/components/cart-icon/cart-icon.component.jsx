import { useContext, useEffect, useState } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/img/shopping-bag.svg';

import { getCartCount } from '../../tools/cart';

import { CartContext } from '../../contexts/cart.context';

import {
    CartIconContainer,
    Icon,
    ItemCount
} from './cart-icon.styles';

const CartIcon = ({ loggedInStatus }) => {
    const { cartItems } = useContext(CartContext);

    const [count, setCount] = useState(null);

    useEffect(() => {
        const getCart = async () => {
            const res = await getCartCount();
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
        window.location = '/checkout';
    }

    return(
        <CartIconContainer onClick={() => navigateToCart()}>
            <Icon>
                <ShoppingIcon />
            </Icon>
            <ItemCount>
                {count}
            </ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;