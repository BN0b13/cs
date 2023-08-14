import { useContext, useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';

import {
    VscArrowRight,
    VscChevronDown,
    VscChevronUp,
    VscHeartFilled,
    VscHeart
} from "react-icons/vsc";

import Button from '../reusable/button/button.component';
import Slideshow from '../reusable/slideshow/slideshow.component';
import Spinner from '../reusable/spinner/spinner.component';
import Snackbar from '../reusable/snackbar/snackbar.component';

import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';

import { api } from '../../config';
import { getProductInventory, convertProductPrice } from '../../tools/cart';
import { setMobileView } from '../../tools/mobileView';

import logo from '../../assets/img/logo.png';

import {
    CategoryLink,
    FavoriteContainer,
    SlideshowContainer,
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
  
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: setMobileView() ? '220px' : '320px'
};

const ProductDisplay = ({ product }) => {
    const [messageType, setMessageType] = useState(null);
    const [messageContents, setMessageContents] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const [ images, setImages ] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [inventory, setInventory] = useState(null);

    const { addItemToCart } = useContext(CartContext);
    const { currentUser } = useContext(UserContext);

    const {
        id,
        name, 
        description,
        details,
        profile,
    } = product;

    useEffect(() => {

        product.ProductImages.sort((a, b) => a.position - b.position);

        setImages(product.ProductImages);

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
                    {images.length === 0 ?
                        <img src={logo} alt={`${name}`} height='300' width='300' />
                        :
                        <SlideshowContainer>
                            <Slide autoplay={false} arrows={false}>
                                {images.map((image, index)=> (
                                        <div key={index}>
                                            <a href={image.link}>
                                                <div style={{ ...divStyle, "backgroundImage": `url(${api}${image.path})` }}>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                            </Slide>
                        </SlideshowContainer>
                    }
                </ProductImage>
                <ProductInformation>
                    {/* <FavoriteContainer>
                        <VscHeart />
                    </FavoriteContainer> */}
                    <ProductText>{name}</ProductText>
                    <ProductDescriptionText>{description}</ProductDescriptionText>
                    <ProductSubtext>Lineage: {details.mother} x {details.father}</ProductSubtext>
                    <ProductSubtext>Time: {details.time}</ProductSubtext>
                    <ProductSubtext>Type: {product.Inventories[0].type}</ProductSubtext>
                    <ProductSubtext>{product.Inventories[0].size} - {product.Inventories[0].sizeDescription}</ProductSubtext>
                    <ProductSubtext>Price: {convertProductPrice(product.Inventories[0].price)}</ProductSubtext>
                    <ProductButtonContainer>
                        <ProductButtonCount setMobileView={setMobileView()}>
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