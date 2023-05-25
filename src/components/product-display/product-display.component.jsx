import { useContext, useEffect, useState } from 'react';

import {
    VscArrowRight,
    VscChevronDown,
    VscChevronUp
} from "react-icons/vsc";

import Button from '../button/button.component';
import Snackbar from '../snackbar/snackbar.component';

import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';

import { getProductInventory, convertProductPrice } from '../../tools/cart';
import { setMobileView } from '../../tools/mobileView';

import logo from '../../assets/img/logo.png';

import {
    CategoryLink,
    ProductButtonContainer,
    ProductButtonCount,
    ProductContainer,
    ProductCountInput,
    ProductDescriptionText,
    ProductDisplayContainer,
    ProductMobileContainer,
    ProductImage,
    ProductInformation,
    ProductQuantityContainer,
    ProductTitle,
    ProductSubtext,
    ProductText,
} from './product-display.styles';

const ProductDisplay = ({ product }) => {
    const [messageType, setMessageType] = useState(null);
    const [messageContents, setMessageContents] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [inventory, setInventory] = useState(null);

    const { addItemToCart } = useContext(CartContext);
    const { currentUser } = useContext(UserContext);

    const {
        id,
        name, 
        details,
        price
    } = product;

    useEffect(() => {
        const getInventory = async () => {
            const res = await getProductInventory(id);
            const startingQuantity = res >= 1 ? 1 : 0;
            setQuantity(startingQuantity);
            setInventory(res);
        }
        getInventory();
    }, [ id ]);

    const message = (message, type = null) => {
        setMessageType(type);
        setMessageContents(message);
        setShowMessage(true);
    }

    const loggedIn = async (id, quantity) => {
        if(!currentUser) {
            message('Please login to add to cart.');
            return;
        }
        if(quantity === 0) {
            message('This product is no longer available.');
            return;
        }
        addItemToCart({productId: id, quantity});
        message('Product added to cart.', 'success');
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
                    <ProductText>{name}</ProductText>
                    <ProductDescriptionText>{details.description}</ProductDescriptionText>
                    <ProductSubtext>Lineage: {details.mother} x {details.father}</ProductSubtext>
                    <ProductSubtext>Time: {details.time}</ProductSubtext>
                    <ProductSubtext>Pack: 10+ {details.sex} seeds</ProductSubtext>
                    <ProductSubtext>Price: {convertProductPrice(price)}</ProductSubtext>
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
        if(setMobileView()) {
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