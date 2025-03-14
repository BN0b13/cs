import { useContext } from 'react';

import {
    VscChevronDown,
    VscChevronUp,
    VscChromeClose
} from "react-icons/vsc";

import { CartContext } from '../../contexts/cart.context';

import { convertProductPrice } from '../../tools/cart';
import { setMobileView } from '../../tools/mobileView';

import { api } from '../../config/router';
import { imageRouter } from '../../config/images';

import {
    CartItemContainer,
    CartItemQuantityContainer,
    CartItemQuantityText,
    CartItemSubtext,
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

const CartItem = ({ quantity, product, inventoryId }) => {
    const { addItemToCart, deleteItemFromCart, removeItemFromCart } = useContext(CartContext);
    const inventory = product.Inventories.filter(item => item.id === inventoryId)[0];

    const increment = async () => {
        if(quantity >= inventory.quantity) {
            return
        }
        addItemToCart({
            categoryId: product.categoryId,
            productId: product.id,
            inventoryId,
            quantity: 1
        });
    }

    const decrement = async () => {
        removeItemFromCart({ 
            productId: product.id,
            inventoryId
        });
    }

    const informationDisplay = () => {
        if(setMobileView()) {
            return (
                <MobileInformationContainer>
                    <MobileTopContainer>
                        <CartItemText onClick={() => window.location=`shop/${product.Category.type}/${product.Category.name}/${product.name}`}>
                            { product.name } { inventory.type === 'Regular' ? '(R)' : inventory.type === 'Feminized' ? '(F)' : '' } - { inventory.size }
                        </CartItemText>
                        <DeleteProductContainer>
                            <VscChromeClose onClick={() => deleteItemFromCart({ productId: product.id, inventoryId })} />
                        </DeleteProductContainer>
                    </MobileTopContainer>
                    <MobileBottomContainer>
                        <CartItemQuantityContainer>
                            <VscChevronDown onClick={() => decrement()} />
                                <CartItemQuantityText>
                                    { quantity }
                                </CartItemQuantityText>
                            <VscChevronUp onClick={() => increment()} />
                        </CartItemQuantityContainer>
                        <CartItemTextContainer cursor={'default'}>
                            <TotalText>
                                { convertProductPrice(inventory.price * quantity) }
                            </TotalText>
                        </CartItemTextContainer>
                        
                    </MobileBottomContainer>
                </MobileInformationContainer>
            )
        }

        return (
            <>
                <CartItemTextContainer onClick={() => window.location=`shop/${product.Category.type}/${product.Category.name}/${product.name}`}>
                    <CartItemText fontSize={'20px'} >
                        { product.name } { inventory.type === 'regular' ? '(R)' : inventory.type === 'feminized' ? '(F)' : '' }
                    </CartItemText>
                    <CartItemSubtext>
                        { inventory.size } - { inventory.sizeDescription }
                    </CartItemSubtext>
                </CartItemTextContainer>
                <CartItemQuantityContainer>
                    <VscChevronDown onClick={() => decrement()} />
                        <CartItemQuantityText>
                            { quantity }
                        </CartItemQuantityText>
                    <VscChevronUp onClick={() => increment()} />
                </CartItemQuantityContainer>
                <CartItemTextContainer cursor={'default'}>
                    <CartItemText fontSize={'20px'}>
                        { convertProductPrice(inventory.price * quantity) }
                    </CartItemText>
                </CartItemTextContainer>
                <DeleteProductContainer>
                    <VscChromeClose onClick={() => deleteItemFromCart({ productId: product.id, inventoryId })} />
                </DeleteProductContainer>
            </>
        )
    }

    return (
        <CartItemContainer>
            <MainContentContainer>
                <ImageContainer>
                    {product.ProductImages.length > 0 ? 
                        <ProductImage onClick={() => window.location=`shop/${product.Category.type}/${product.Category.name}/${product.name}`}>
                            <img src={api + product.ProductImages[0].path} alt={`${product.name}`} />
                        </ProductImage> 
                    : 
                        <ProductImage onClick={() => window.location=`shop/${product.Category.type}/${product.Category.name}/${product.name}`}>
                            <img src={imageRouter.logos.logo.path} alt={`${product.name}`} />
                        </ProductImage> 
                    }
                </ImageContainer>
                { informationDisplay() }
            </MainContentContainer>
        </CartItemContainer>
    )
}

export default CartItem;