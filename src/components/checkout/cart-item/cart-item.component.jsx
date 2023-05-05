import { useContext, useEffect, useState } from 'react';

import {
    BsFillCaretUpFill,
    BsFillCaretDownFill,
    BsX
} from 'react-icons/bs';

import { CartContext } from '../../../contexts/cart.context';

import {
    convertProductPrice
} from '../../../tools/cart';

import logo from '../../../assets/img/logo.png';

import {
    CartItemMobileView,
    CartItemContainer,
    CartItemQuantityContainer,
    CartItemQuantityText,
    CartItemText,
    CartItemTextContainer,
    DeleteProductContainer,
    ProductImage
} from './cart-item.styles';

const CartItem = ({ quantity, product }) => {
    const [ mobileView, setMobileView ] = useState(false);
    const { addItemToCart, deleteItemFromCart, removeItemFromCart } = useContext(CartContext);

    useEffect(() => {
        if(window.screen.width < 500) {
            setMobileView(true);
        }
    }, []);

    const increment = async () => {
        if(quantity >= product.Inventories.length) {
            return
        }
        await addItemToCart({
            productId: product.id,
            quantity: 1 
        });
    }

    const decrement = async () => {
        removeItemFromCart({ productId: product.id });
    }

    return (
        <CartItemContainer>
            {product.image ? 
            <ProductImage onClick={() => window.location=`shop/${product.Category.name}/${product.name}`}>
                <img src={product.image} alt={`${product.name}`} />
            </ProductImage> 
            : 
            <ProductImage onClick={() => window.location=`shop/${product.Category.name}/${product.name}`}>
                <img src={logo} alt={`${product.name}`} />
            </ProductImage> 
            }
            <CartItemTextContainer onClick={() => window.location=`shop/${product.Category.name}/${product.name}`}>
                <CartItemText >
                    { product.name }
                </CartItemText>
            </CartItemTextContainer>
            <CartItemQuantityContainer>
                <BsFillCaretUpFill onClick={() => increment()} />
                    <CartItemQuantityText>
                        { quantity }
                    </CartItemQuantityText>
                <BsFillCaretDownFill onClick={() => decrement()} />
            </CartItemQuantityContainer>
            <CartItemTextContainer>
                <CartItemText>
                    { convertProductPrice(product.price * quantity) }
                </CartItemText>
            </CartItemTextContainer>
            <DeleteProductContainer>
                <BsX onClick={() => deleteItemFromCart({ productId: product.id })} />
            </DeleteProductContainer>
        </CartItemContainer>
    )
}

export default CartItem;