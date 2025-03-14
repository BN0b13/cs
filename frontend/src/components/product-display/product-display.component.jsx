import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { Slide } from 'react-slideshow-image';

import {
    VscArrowRight,
    VscChevronDown,
    VscChevronUp,
    VscHeartFilled,
    VscHeart
} from "react-icons/vsc";

import Button from '../reusable/button/button.component';
import ProductSlideshow from '../sections/product-slideshow/product-slideshow.component';
import Spinner from '../reusable/spinner/spinner.component';

import { CartContext } from '../../contexts/cart.context';
import { ConfigurationContext } from '../../contexts/configuration.context';
import { ToastContext } from '../../contexts/toast.context';
import { UserContext } from '../../contexts/user.context';

import { api } from '../../config/router';
import Client from '../../tools/client';
import { convertProductPrice } from '../../tools/cart';
import { setMobileView } from '../../tools/mobileView';
import { imageRouter } from '../../config/images';

import {
    CategoryLink,
    FavoriteContainer,
    SlideshowContainer,
    ProductButtonContainer,
    ProductButtonCount,
    ProductContainer,
    ProductCountInput,
    ProductDescriptionContainer,
    ProductDescriptionText,
    ProductDisplayContainer,
    ProductImage,
    ProductImageDisplay,
    ProductInformation,
    ProductQuantityContainer,
    ProductTitle,
    ProductSubtext,
    ProductText,
} from './product-display.styles';

// import {
//     Option,
//     Select
// } from '../../styles/component.styles';
  
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '300px'
};

const selectCustomStyles = {
    control: base => ({
        ...base,
        width: '150px'
    }),
    menu: base => ({
    ...base,
    width: '150px'
    }),
    menuList: base => ({
        ...base,
        color: 'black',
        width: '150px'
    })
}

const client = new Client();

const ProductDisplay = ({ product }) => {
    const pictureSize = setMobileView() ? '-mobile.webp' : '-desktop.webp';
    const [ loading, setLoading ] = useState(true);
    const [ cart, setCart ] = useState(null);
    const [ images, setImages ] = useState([]);
    const [ quantity, setQuantity ] = useState(1);
    const [ inventory, setInventory ] = useState(product.Inventories[0]);
    const [ inventoryId, setInventoryId ] = useState(product.Inventories[0].id);
    const [ inventories, setInventories ] = useState(product.Inventories);

    const { addItemToCart, cartItems } = useContext(CartContext);
    const { colors } = useContext(ConfigurationContext);
    const { errorToast, successToast } = useContext(ToastContext);
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
        if(currentUser) {
            getCart();
        }
        setLoading(false);
    }, [ cartItems, currentUser ]);

    const getCart = async () => {
        setLoading(true);
        const res = await client.getCart();

        setCart(res);
        setLoading(false);
    }

    const handleInventory = (e) => {
        const id = parseInt(e.value);
        const data = inventories.filter(item => item.id === id);
        
        setInventoryId(id);
        setInventory(data[0]);
    }

    const loggedIn = async (id) => {
        if(quantity === '') {
            setQuantity(1);
        }

        if(!currentUser) {
            errorToast('Please login to add to cart.');
            return;
        }

        if(quantity === 0) {
            errorToast('This product is no longer available.');
            return;
        }
        
        const productAlreadyInCart = cart.products.filter(product => product.inventoryId === inventoryId);

        if(productAlreadyInCart.length > 0) {

            if(productAlreadyInCart[0].quantity === inventory.quantity) {
                errorToast('Maximum Inventory already in cart');
                return
            }
        }
        
        addItemToCart({
            categoryId: product.Category.id,
            productId: id,
            inventoryId: inventoryId,
            quantity
        });
        successToast('Product added to cart.');
    }

    const inputQuantity = (input) => {
        const inputQuantity = Number(input);

        if(isNaN(inputQuantity)) {
            return
        }

        if(inputQuantity < 0) {
            setQuantity(0);
            return
        }

        if(inputQuantity > inventory.quantity) {
            setQuantity(inventory.quantity);
            return
        }

        setQuantity(inputQuantity);
    }

    const increaseQuantity = () => {
        if(quantity >= inventory.quantity) {
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

    return (
        <>
            {loading ?
                <Spinner />
            :
                <>
                    <ProductTitle>
                        <CategoryLink theme={colors} to={`/shop?type=${product.Category.type}`}>
                            SHOP
                        </CategoryLink>
                            {'  '}
                        <VscArrowRight />
                            {'  '}
                        <CategoryLink theme={colors} to={`/shop/${product.Category.type}`}>
                            { product.Category.type.toUpperCase() }
                        </CategoryLink>
                            {'  '}
                        <VscArrowRight />
                            {'  '}
                        <CategoryLink theme={colors} to={`/shop/${product.Category.type}/${product.Category.name}`}>
                            { product.Category.name.toUpperCase() }
                        </CategoryLink>
                            {'  '}
                        <VscArrowRight />
                            {'  '}
                            { name.toUpperCase() }
                    </ProductTitle>
                    <ProductDisplayContainer>
                        <ProductContainer>
                            <ProductImageDisplay>
                                {images.length === 0 ?
                                    <div style={{ ...divStyle, "backgroundImage": `url(${imageRouter.logos.logo.path})` }}>
                                        {product.Inventories[0].quantity === 0 &&
                                            <ProductImage src={imageRouter.app.soldOut.path} alt='Product Sold Out' />
                                        }
                                    </div>
                                    :
                                        images.length === 1 ?
                                            <div style={{ ...divStyle, "backgroundImage": `url(${api}${images[0].path}${pictureSize})` }}>
                                                {product.Inventories[0].quantity === 0 &&
                                                    <ProductImage src={imageRouter.app.soldOut.path} alt='Product Sold Out' />
                                                }
                                            </div>
                                        :
                                            <SlideshowContainer>
                                                <Slide autoplay={false}>
                                                    {images.map((image, index)=> (
                                                            <div key={index}>
                                                                <a href={image.link}>
                                                                    <div style={{ ...divStyle, "backgroundImage": `url(${api}${image.path}${pictureSize})` }}>
                                                                        {product.Inventories[0].quantity === 0 &&
                                                                            <ProductImage src={imageRouter.app.soldOut.path} alt='Product Sold Out' />
                                                                        }
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        ))}
                                                </Slide>
                                            </SlideshowContainer>
                                }
                            </ProductImageDisplay>
                            <ProductInformation>
                                {/* <FavoriteContainer>
                                    <VscHeart />
                                </FavoriteContainer> */}
                                <ProductText>{name}</ProductText>
                                <ProductSubtext>Lineage: {details.mother} x {details.father}</ProductSubtext>
                                <ProductSubtext>Time: {details.time}</ProductSubtext>
                                {/* <Select value={inventoryId} onChange={(e) => handleInventory(e.target.value)}>
                                    {inventories.map((item, index) => (
                                        <Option key={index} value={item.id}>{ item.size }</Option>
                                    ))}
                                </Select> */}
                                <Select
                                    defaultValue={{ value: product.Inventories[0].id, label: product.Inventories[0].size }}
                                    onChange={handleInventory}
                                    options={inventories.map(item => {
                                        return { value: item.id, label: item.size }; 
                                    })}
                                    styles={selectCustomStyles}
                                />
                                <ProductSubtext>Type: {inventory.type}</ProductSubtext>
                                <ProductSubtext>{inventory.size} - {inventory.sizeDescription}</ProductSubtext>

                                <ProductSubtext>Price: {convertProductPrice(inventory.price)}</ProductSubtext>
                                <ProductButtonContainer>
                                    <ProductButtonCount setMobileView={setMobileView()}>
                                        <ProductQuantityContainer>
                                            <VscChevronDown onClick={() => decreaseQuantity()} />
                                            <ProductCountInput type='string' value={quantity} onChange={(e) => inputQuantity(e.target.value)} />
                                            <VscChevronUp onClick={() => increaseQuantity()} />
                                        </ProductQuantityContainer>
                                        <Button onClick={() => loggedIn(id)}>Add to Cart</Button>
                                    </ProductButtonCount>
                                </ProductButtonContainer>
                            </ProductInformation>
                        </ProductContainer>
                        <ProductDescriptionContainer>
                            <ProductDescriptionText>{description}</ProductDescriptionText>
                        </ProductDescriptionContainer>
                    </ProductDisplayContainer>
                </>
            }
        </>
    )
}

export default ProductDisplay;