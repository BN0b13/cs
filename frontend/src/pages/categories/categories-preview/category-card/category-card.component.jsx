import { api } from '../../../../config/router';
import { imageRouter } from '../../../../config/images';

import {
    CategoryCardContainer,
    Footer,
    Name
} from './category-card.styles';


const CategoryCard = ({ category }) => {

    return (
        <CategoryCardContainer>
            {category.thumbnailPath ?
                <img src={api + category.thumbnailPath} alt={`${category.name}`} />
            :
                <img src={imageRouter.logos.logo.path} alt={`${category.name}`} />
            }
            <Footer>
                <Name>{ category.name }</Name>
            </Footer>
        </CategoryCardContainer>
    )
}

export default CategoryCard;