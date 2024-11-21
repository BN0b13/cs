import CategoryCard from "./category-card/category-card.component";

import {
    CategoryCardContainer,
    CategoriesPreviewTitle,
    Preview
} from './categories-preview.styles';

import {
    Text
} from '../../../styles/component.styles';

const CategoriesPreview = ({ category }) => {
    const maxCategoryDisplay = 3;

    return (
        <>
            <CategoriesPreviewTitle onClick={() => window.location = `/shop/${category[0].type}`}>{ category[0].type.toUpperCase() }</CategoriesPreviewTitle>
            <Preview>
                    {category.map((category, index) => {
                        if(index >= maxCategoryDisplay) {
                            return (
                                <CategoryCardContainer key={index} onClick={() => window.location = `/shop/${category.type}`}>
                                    <Text color={'#fff'} cursor={'pointer'} textAlign={'center'}>MORE { category.type.toUpperCase() }...</Text>
                                </CategoryCardContainer>
                            )
                        }
                        return (
                            <CategoryCardContainer key={index} onClick={() => window.location = `/shop/${category.type}/${category.name}`}>
                                <CategoryCard category={category} />
                            </CategoryCardContainer>
                        )}
                    )}
            </Preview>
        </>
    )
}

export default CategoriesPreview;