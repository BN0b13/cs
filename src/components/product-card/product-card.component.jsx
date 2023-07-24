import logo from '../../assets/img/logo.png';

import {
    ProductCartContainer,
    Footer,
    Name,
    // Price
} from './product-card.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../reusable/button/button.component';

const ProductCard = ({ product }) => {
    const { name } = product;

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
            >
                CHECK IT OUT
            </Button>
        </ProductCartContainer>
    )
}

export default ProductCard;