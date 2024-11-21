import logo from '../../../../assets/img/logo.png';

import {
    CategoryCardContainer,
    Footer,
    Name
} from './category-card.styles';

import { api } from '../../../../config';

const CategoryCard = ({ category }) => {

    return (
        <CategoryCardContainer>
            {category.thumbnailPath ?
                <img src={api + category.thumbnailPath} alt={`${category.name}`} />
            :
                <img src={logo} alt={`${category.name}`} />
            }
            <Footer>
                <Name>{ category.name }</Name>
            </Footer>
        </CategoryCardContainer>
    )
}

export default CategoryCard;