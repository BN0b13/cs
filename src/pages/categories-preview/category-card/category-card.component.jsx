import logo from '../../../assets/img/logo.png';

import {
    CategoryCardContainer,
    Footer,
    Name
    // Price
} from './category-card.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../../../components/button/button.component';

const CategoryCard = ({ category }) => {

    return (
        <CategoryCardContainer>
            <img src={logo} alt={`${category.name}`} />
            {/* <img src={imageUrl} alt={`${name}`} /> */}
            <Footer>
                <Name>{ category.name }</Name>
            </Footer>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted}
            >
                FULL LINE
            </Button>
        </CategoryCardContainer>
    )
}

export default CategoryCard;