import { useContext, useEffect, useState } from 'react';

import {
    VscArrowRight,
    VscChevronDown,
    VscChevronUp
} from "react-icons/vsc";

import Button from '../button/button.component';
import Snackbar from '../snackbar/snackbar.component';

import { CartContext } from '../../contexts/cart.context';

import { getProductInventory, convertProductPrice } from '../../tools/cart';

import logo from '../../assets/img/logo.png';

import {
    CategoryLink,
    ProductButtonContainer,
    ProductButtonCount,
    ProductContainer,
    ProductCountInput,
    ProductDisplayContainer,
    ProductMobileContainer,
    ProductImage,
    ProductInformation,
    ProductQuantityContainer,
    ProductTitle,
    ProductText
} from './product-display.styles';

import { tokenName } from '../../config';

const ProductDisplay = ({ product }) => {
    const [messageType, setMessageType] = useState(null);
    const [messageContents, setMessageContents] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [inventory, setInventory] = useState(null);

    const { addItemToCart } = useContext(CartContext);

    const {
        id,
        name, 
        time, 
        price, 
        mother, 
        father,
        sex
    } = product;

    useEffect(() => {
        const getInventory = async () => {
            const res = await getProductInventory(id);
            const startingQuantity = res >= 1 ? 1 : 0;
            setQuantity(startingQuantity);
            setInventory(res);
        }
        getInventory();
    }, []);

    const message = (message, type = null) => {
        setMessageType(type);
        setMessageContents(message);
        setShowMessage(true);
    }

    const loggedIn = async (id, quantity) => {
        const loggedInStatus = localStorage.getItem(tokenName);
        if(!loggedInStatus) {
            message('Please login to add to cart.');
            return;
        }
        if(quantity === 0) {
            message('This product is no longer available.');
            return;
        }
        addItemToCart({productId: id, quantity});
        message('Product added to cart.', 'success')
    }


    const increaseQuantity = () => {
        if(quantity >= inventory) {
            return
        }
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if(quantity <= 1) {
            return
        }
        setQuantity(quantity - 1);
    }

    const productDisplayContents = () => {
        return (
            <>
                <ProductImage>
                    <img src={logo} alt={`${name}`} />
                </ProductImage>
                <ProductInformation>
                    <ProductText>Name: {name}</ProductText>
                    <ProductText>Lineage: {mother} x {father}</ProductText>
                    <ProductText>Time: {time}</ProductText>
                    <ProductText>Pack: 10+ {sex} seeds</ProductText>
                    <ProductText>Price: {convertProductPrice(price)}</ProductText>
                    <ProductButtonContainer>
                        <ProductButtonCount>
                            <ProductQuantityContainer>
                                <VscChevronUp onClick={() => increaseQuantity()} />
                                <ProductCountInput onChange={(e) => console.log(e.target.value)} value={quantity} />
                                <VscChevronDown onClick={() => decreaseQuantity()} />
                            </ProductQuantityContainer>
                            <Button onClick={() => loggedIn(id, quantity)}>Add to Cart</Button>
                        </ProductButtonCount>
                        {showMessage && 
                            <Snackbar type={messageType} msg={messageContents} show={() => setShowMessage(false)} />
                        }
                    </ProductButtonContainer>
                </ProductInformation>
            </>
        )
    }

    const productDisplayLayout = () => {
        if(window.screen.width < 500) {
            return (
                <ProductMobileContainer>
                    {productDisplayContents()}
                </ProductMobileContainer>
            );
        }
        return (
            <ProductContainer>
                {productDisplayContents()}
            </ProductContainer>
        )
    }

    return (
        <ProductDisplayContainer>
            <ProductTitle>
                <CategoryLink to={`/shop`}>
                    Shop
                </CategoryLink>
                    {'  '}
                <VscArrowRight />
                    {'  '}
                <CategoryLink to={`/shop/${product.Category.name}`}>
                    {product.Category.name}
                </CategoryLink>
                    {'  '}
                <VscArrowRight />
                    {'  '}
                {name}
            </ProductTitle>
            {productDisplayLayout()}
        </ProductDisplayContainer>
    )
}

export default ProductDisplay;