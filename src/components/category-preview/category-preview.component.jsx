import ProductCard from '../product-card/product-card.component';

import {
    CategoryPreviewLink,
    CategoryPreviewContainer,
    CategoryPreviewTitle,
    Preview,
    PreviewMobile
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <CategoryPreviewLink to={title}>
                    <CategoryPreviewTitle >{ title.toUpperCase() }</CategoryPreviewTitle>
            </CategoryPreviewLink>
            {
                window.screen.width < 500 ? (
                    <PreviewMobile>
                        {
                        products.filter((_, idx) => idx < 4)
                        .map((product) => 
                        <CategoryPreviewLink to={`/shop/${title}/${product.name}`} key={product.id}><ProductCard key={product.id} product={ product } /></CategoryPreviewLink>)
                        }
                    </PreviewMobile>
                )
                : (
                    <Preview>
                        {
                        products.filter((_, idx) => idx < 4)
                        .map((product) => 
                        <CategoryPreviewLink to={`/shop/${title}/${product.name}`} key={product.id}><ProductCard key={product.id} product={ product } /></CategoryPreviewLink>)
                        }
                    </Preview>
                )
            }
        </CategoryPreviewContainer>
    )

}

export default CategoryPreview;