import { imageRouter } from '../../config/images';

import { api } from '../../config/router';

import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
    ProductImage,
    SoldOutImage
} from './product-card.styles';

const ProductCard = ({ product }) => {
    const imageUrl = product.ProductImages.length > 0 ? `${api}${product.ProductImages[0].path}` : imageRouter.logos.logo.path;

    const { name } = product;

    return (
        <ProductCartContainer>
            <ProductImage src={imageUrl} alt={name} />
            {product.Inventories[0].quantity === 0 &&
                <SoldOutImage src={imageRouter.app.soldOut.path} alt={'Product sold out'} />
            }
            <Footer>
                <Name>{ name }</Name>
                {/* <Price as='span'>{ price }</Price> */}
            </Footer>
        </ProductCartContainer>
    )
}

export default ProductCard;