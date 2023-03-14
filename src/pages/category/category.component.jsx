import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

// import { CategoriesContext } from '../../contexts/categories.context';

import { SHOP_DATA } from '../../assets/inventory/inventory';

import { CategoryContainer, CategoryContainerMobile, CategoryTitle } from './category.styles';

const Category = () => {
    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = SHOP_DATA;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[0].items)
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{ category.toUpperCase() }</CategoryTitle>
            {
                window.screen.width < 500 ? (
                    <CategoryContainerMobile>
                        {products &&
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        }
                    </CategoryContainerMobile>
                ) : (
                    <CategoryContainer>
                        {products &&
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        }
                    </CategoryContainer>
                )
            }
            
        </Fragment>
    )
}

export default Category;