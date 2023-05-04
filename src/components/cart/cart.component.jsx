import { useContext } from 'react';

import {
    BsFillCaretUpFill,
    BsFillCaretDownFill,
    BsX
} from 'react-icons/bs';

import { CartContext } from '../../contexts/cart.context';

import {
    convertProductPrice
} from '../../tools/cart';

import logo from '../../assets/img/logo.png';

import {
    CartContainer,
    CartQuantityContainer,
    CartQuantityText,
    CartText,
    CartTextContainer,
    DeleteProductContainer,
    ProductImage
} from './cart.styles';

const Cart = ({ quantity, product }) => {
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
        <CartContainer>
            {product.image ? 
            <ProductImage>
                <img src={product.image} alt={`${product.name}`} />
            </ProductImage> 
            : 
            <ProductImage>
                <img src={logo} alt={`${product.name}`} />
            </ProductImage> 
            }
            <CartTextContainer>
                <CartText >
                    { product.name }
                </CartText>
            </CartTextContainer>
            <CartQuantityContainer>
                <BsFillCaretUpFill onClick={() => increment()} />
                    <CartQuantityText>
                        { quantity }
                    </CartQuantityText>
                <BsFillCaretDownFill onClick={() => decrement()} />
            </CartQuantityContainer>
            <CartTextContainer>
                <CartText>
                    { convertProductPrice(product.price * quantity) }
                </CartText>
            </CartTextContainer>
            <DeleteProductContainer>
                <BsX onClick={() => deleteItemFromCart({ productId: product.id })} />
            </DeleteProductContainer>
        </CartContainer>
    )
}

export default Cart;