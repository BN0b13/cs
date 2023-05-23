import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';

import ProductCard from '../../components/product-card/product-card.component';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import {CategoryContainer,
    CategoryContainerMobile,
    CategoryTitle,
    CategoryLink
} from './category.styles';

const client = new Client();

const Category = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategories();
            const currentCategory = res.rows.filter(current => current.name === category);
            setProducts(currentCategory[0].Products);
        }
        getCategories();
    }, [category]);

    return (
        <Fragment>
            <CategoryTitle><CategoryLink to={`/shop`}>Shop</CategoryLink>{'  '}<BsArrowRight />{'  '}{category.toUpperCase()}</CategoryTitle>
            {
                setMobileView() ? (
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