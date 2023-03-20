import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { ArrowRight } from 'react-bootstrap-icons';

import ProductCard from '../../components/product-card/product-card.component';

// import { CategoriesContext } from '../../contexts/categories.context';

import { SHOP_DATA } from '../../assets/inventory/inventory';

import {CategoryContainer,
        CategoryContainerMobile,
        CategoryTitle,
        CategoryLink
} from './category.styles';

const Category = () => {
    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = SHOP_DATA;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const currentCategory = categoriesMap.filter(current => current.title === category);
        setProducts(currentCategory[0].items);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle><CategoryLink to={`/shop`}>Lines</CategoryLink>{'  '}<ArrowRight />{'  '}{category.toUpperCase()}</CategoryTitle>
            {/* <CategoryTitle>{ category.toUpperCase() }</CategoryTitle> */}
            {
                window.screen.width < 500 ? (
                    <CategoryContainerMobile>
                        {products &&
                            products.map((product) => <CategoryLink to={`/shop/${category}/${product.name}`} key={product.id}><ProductCard key={product.id} product={product} /></CategoryLink>)
                        }
                    </CategoryContainerMobile>
                ) : (
                    <CategoryContainer>
                        {products &&
                            products.map((product) => <CategoryLink to={`/shop/${category}/${product.name}`} key={product.id}><ProductCard key={product.id} product={product} /></CategoryLink>)
                        }
                    </CategoryContainer>
                )
            }
            
        </Fragment>
    )
}

export default Category;