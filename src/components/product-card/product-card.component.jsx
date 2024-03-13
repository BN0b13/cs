import logo from '../../assets/img/logo.png';

import { api } from '../../config';

import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
    ProductImage
} from './product-card.styles';

const ProductCard = ({ product }) => {
    const imageUrl = product.ProductImages.length > 0 ? `${api}${product.ProductImages[0].path}` : '';

    const { name } = product;

    return (
        <ProductCartContainer>
                <ProductImage src={imageUrl.length > 0 ? imageUrl : logo} alt={name} />
            <Footer>
                <Name>{ name }</Name>
                {/* <Price as='span'>{ price }</Price> */}
            </Footer>
        </ProductCartContainer>
    )
}

export default ProductCard;