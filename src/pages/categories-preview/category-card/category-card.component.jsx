import logo from '../../../assets/img/logo.png';

import {
    CategoryCardContainer,
    Footer,
    Name
} from './category-card.styles';

const CategoryCard = ({ category }) => {

    return (
        <CategoryCardContainer>
            <img src={logo} alt={`${category.name}`} />
            {/* <img src={imageUrl} alt={`${name}`} /> */}
            <Footer>
                <Name>{ category.name }</Name>
            </Footer>
        </CategoryCardContainer>
    )
}

export default CategoryCard;