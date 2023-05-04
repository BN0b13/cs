import { useContext, useEffect, useState } from 'react';

import {
    BsArrowRight,
    BsFillCaretUpFill,
    BsFillCaretDownFill
} from 'react-icons/bs';

import Button from '../button/button.component';
import Snackbar from '../snackbar/snackbar.component';

import { CartContext } from '../../contexts/cart.context';

import { getProductInventory } from '../../tools/cart';

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
    const [showError, setShowError] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [inventory, setInventory] = useState(null);

    const { addItemToCart } = useContext(CartContext);

    const {
        id,
        name, 
        time, 
        type, 
        mother, 
        father 
    } = product;

    useEffect(() => {
        const getInventory = async () => {
            const res = await getProductInventory(id);
            setInventory(res);
        }
        getInventory();
    }, []);

    const loggedIn = async (id, quantity) => {
        const loggedInStatus = localStorage.getItem(tokenName);
        if(!loggedInStatus) {
            setShowError(true);
            return;
        }
        addItemToCart({productId: id, quantity});
    }


    const increaseQuantity = () => {
        if(quantity >= inventory) {
            return
        }
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if(quantity === 1) {
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
                    <ProductText>Type: {type}</ProductText>
                    <ProductButtonContainer>
                        <ProductButtonCount>
                            <ProductQuantityContainer>
                                <BsFillCaretUpFill onClick={() => increaseQuantity()} />
                                <ProductCountInput onChange={(e) => console.log(e.target.value)} value={quantity} />
                                <BsFillCaretDownFill onClick={() => decreaseQuantity()} />
                            </ProductQuantityContainer>
                            <Button onClick={() => loggedIn(id, quantity)}>Add to Cart</Button>
                        </ProductButtonCount>
                        {showError && 
                            <Snackbar msg={'Please Log In To Add To Cart.'} show={() => setShowError(false)} />
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
                <BsArrowRight />
                    {'  '}
                <CategoryLink to={`/shop/${product.Category.name}`}>
                    {product.Category.name}
                </CategoryLink>
                    {'  '}
                <BsArrowRight />
                    {'  '}
                {name}
            </ProductTitle>
            {productDisplayLayout()}
        </ProductDisplayContainer>
    )
}

export default ProductDisplay;