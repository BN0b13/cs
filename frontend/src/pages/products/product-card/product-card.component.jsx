import { api } from '../../../config/router';
import { imageRouter } from '../../../config/images';

import {
    ProductCardContainer,
    Footer,
    Name
} from './product-card.styles';

const ProductCard = ({ product }) => {

    return (
        <ProductCardContainer>
            {typeof product.ProductImages === 'object' && product.ProductImages.path ?

                    <img src={api + product.ProductImages.path} alt={`${product.name}`} />
                :
                    typeof product.ProductImages === 'array' && product.ProductImages.length > 0 ?
                        <img src={api + product.ProductImages[0].path} alt={`${product.name}`} />
                    :
                        <img src={imageRouter.logos.logo.path} alt={`${product.name}`} />
            }
            <Footer>
                <Name>{ product.name }</Name>
            </Footer>
        </ProductCardContainer>
    )
}

export default ProductCard;