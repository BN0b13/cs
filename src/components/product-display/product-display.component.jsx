import { BsArrowRight } from 'react-icons/bs';

import logo from '../../assets/img/logo.png';

import {
    CategoryLink,
    ProductContainer,
    ProductDisplayContainer,
    ProductMobileContainer,
    ProductImage,
    ProductInformation,
    ProductTitle,
    ProductText
} from './product-display.styles';

const ProductDisplay = ({ category, strain }) => {
    const { name, time, type, mother, father } = strain;

    const productDisplayContents = () => {
        return (
            <>
                <ProductImage>
                    <img src={logo} alt={`${name}`} />
                </ProductImage>
                <ProductInformation>
                    <ProductText>Name: {name}</ProductText>
                    <ProductText>Lineage: {mother} x {father}</ProductText>
                    <ProductText>Time: {time}</ProductText>
                    <ProductText>Type: {type}</ProductText>
                </ProductInformation>
            </>
        )
    }

    const productDisplayLayout = () => {
        if(window.screen.width < 500) {
            return (
                <ProductMobileContainer>
                    {productDisplayContents()}
                </ProductMobileContainer>
            );
        }
        return (
            <ProductContainer>
                {productDisplayContents()}
            </ProductContainer>
        )
    }

    return (
        <ProductDisplayContainer>
            <ProductTitle><CategoryLink to={`/shop/${category}`}>{category}</CategoryLink>{'  '}<BsArrowRight />{'  '}{name}</ProductTitle>
                {productDisplayLayout()}
        </ProductDisplayContainer>
    )
}

export default ProductDisplay;