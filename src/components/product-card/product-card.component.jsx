// import { useContext } from 'react';

// import { CartContext } from '../../contexts/cart.context';

import logo from '../../assets/img/logo.png';

import {
    ProductCartContainer,
    Footer,
    Name,
    // Price
} from './product-card.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name } = product;
    // const { name, price, imageUrl } = product;
    // const { addItemToCart } = useContext(CartContext);

    // const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCartContainer>
            <img src={logo} alt={`${name}`} />
            {/* <img src={imageUrl} alt={`${name}`} /> */}
            <Footer>
                <Name as='span'>{ name }</Name>
                {/* <Price as='span'>{ price }</Price> */}
            </Footer>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                // onClick={() => console.log('Add Item To Cart Clicked')}
            >
                STATS
            </Button>
        </ProductCartContainer>
    )
}

export default ProductCard;