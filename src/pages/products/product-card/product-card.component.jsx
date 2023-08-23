import logo from '../../../assets/img/logo.png';

import {
    ProductCardContainer,
    Footer,
    Name
} from './product-card.styles';

import { api } from '../../../config';

const ProductCard = ({ product }) => {
    console.log('Product Card Product: ', product);

    return (
        <ProductCardContainer>
            {product.ProductImages ?
                <img src={api + product.ProductImages[0].path} alt={`${product.name}`} />
            :
                <img src={logo} alt={`${product.name}`} />
            }
            <Footer>
                <Name>{ product.name }</Name>
            </Footer>
        </ProductCardContainer>
    )
}

export default ProductCard;