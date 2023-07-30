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
    let imageUrl = '';
    if(product.ProductImages.length > 0) {
        imageUrl = `${api}${product.ProductImages[0].path}`;
    }
    const { name } = product;

    return (
        <ProductCartContainer>
            {imageUrl.length > 0 ?
                <ProductImage src={imageUrl} alt={`${name}`} />
            :
                <ProductImage src={logo} alt={`${name}`} />
            }
            <Footer>
                <Name as='span'>{ name }</Name>
                {/* <Price as='span'>{ price }</Price> */}
            </Footer>
        </ProductCartContainer>
    )
}

export default ProductCard;