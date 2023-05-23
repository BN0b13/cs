import { useContext } from 'react';

import {
    VscChevronDown,
    VscChevronUp,
    VscChromeClose
} from "react-icons/vsc";

import { CartContext } from '../../../contexts/cart.context';

import { convertProductPrice } from '../../../tools/cart';
// import { setMobileView } from '../../../tools/mobileView';

import logo from '../../../assets/img/logo.png';

import {
    CartItemContainer,
    CartItemQuantityContainer,
    CartItemQuantityText,
    CartItemText,
    CartItemTextContainer,
    DeleteProductContainer,
    ProductImage
} from './cart-item.styles';

const CartItem = ({ quantity, product }) => {
    const { addItemToCart, deleteItemFromCart, removeItemFromCart } = useContext(CartContext);

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
                <VscChevronUp onClick={() => increment()} />
                    <CartItemQuantityText>
                        { quantity }
                    </CartItemQuantityText>
                <VscChevronDown onClick={() => decrement()} />
            </CartItemQuantityContainer>
            <CartItemTextContainer>
                <CartItemText>
                    { convertProductPrice(product.price * quantity) }
                </CartItemText>
            </CartItemTextContainer>
            <DeleteProductContainer>
                <VscChromeClose onClick={() => deleteItemFromCart({ productId: product.id })} />
            </DeleteProductContainer>
        </CartItemContainer>
    )
}

export default CartItem;