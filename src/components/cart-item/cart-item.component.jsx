import { useContext } from 'react';

import {
    VscChevronDown,
    VscChevronUp,
    VscChromeClose
} from "react-icons/vsc";

import { CartContext } from '../../contexts/cart.context';

import { convertProductPrice } from '../../tools/cart';
import { setMobileView } from '../../tools/mobileView';

import { api } from '../../config';

import logo from '../../assets/img/logo.png';

import {
    CartItemContainer,
    CartItemQuantityContainer,
    CartItemQuantityText,
    CartItemText,
    CartItemTextContainer,
    DeleteProductContainer,
    ImageContainer,
    MainContentContainer,
    MobileBottomContainer,
    MobileInformationContainer,
    MobileTopContainer,
    ProductImage,
    TotalText
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

    const informationDisplay = () => {
        if(setMobileView()) {
            return (
                <MobileInformationContainer>
                    <MobileTopContainer>
                        <CartItemText onClick={() => window.location=`shop/${product.Category.name}/${product.name}`}>
                            { product.name }
                        </CartItemText>
                        <DeleteProductContainer>
                            <VscChromeClose onClick={() => deleteItemFromCart({ productId: product.id })} />
                        </DeleteProductContainer>
                    </MobileTopContainer>
                    <MobileBottomContainer>
                        <CartItemQuantityContainer>
                            <VscChevronUp onClick={() => increment()} />
                                <CartItemQuantityText>
                                    { quantity }
                                </CartItemQuantityText>
                            <VscChevronDown onClick={() => decrement()} />
                        </CartItemQuantityContainer>
                        <CartItemTextContainer>
                            <TotalText>
                                { convertProductPrice(product.Inventories[0].price * quantity) }
                            </TotalText>
                        </CartItemTextContainer>
                        
                    </MobileBottomContainer>
                </MobileInformationContainer>
            )
        }

        return (
            <>
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
                        { convertProductPrice(product.Inventories[0].price * quantity) }
                    </CartItemText>
                </CartItemTextContainer>
                <DeleteProductContainer>
                    <VscChromeClose onClick={() => deleteItemFromCart({ productId: product.id })} />
                </DeleteProductContainer>
            </>
        )
    }

    return (
        <CartItemContainer>
            <MainContentContainer>
                <ImageContainer>
                    {product.ProductImages.length > 0 ? 
                        <ProductImage onClick={() => window.location=`shop/${product.Category.name}/${product.name}`}>
                            <img src={api + product.ProductImages[0].path} alt={`${product.name}`} />
                        </ProductImage> 
                    : 
                        <ProductImage onClick={() => window.location=`shop/${product.Category.name}/${product.name}`}>
                            <img src={logo} alt={`${product.name}`} />
                        </ProductImage> 
                    }
                </ImageContainer>
                { informationDisplay() }
            </MainContentContainer>
        </CartItemContainer>
    )
}

export default CartItem;