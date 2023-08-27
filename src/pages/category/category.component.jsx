import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    VscArrowRight
} from "react-icons/vsc";

import ProductCard from '../../components/product-card/product-card.component';

import { ConfigurationContext } from '../../contexts/configuration.context';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import {CategoryContainer,
    CategoryContainerMobile,
    CategoryTitle,
    CategoryLink,
    MainContainer
} from './category.styles';

const client = new Client();

const Category = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);

    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategoryByName(category);
            if(res.count === 0) {
                return window.location.href = '/shop';
            }

            setProducts(res.rows[0].Products);
        }
        getCategories();
    }, [category]);

    return (
        <MainContainer>
            <CategoryTitle><CategoryLink theme={colors} to={`/shop`}>Shop</CategoryLink>{'  '}<VscArrowRight />{'  '}{category}</CategoryTitle>
            {
                setMobileView() ? (
                    <CategoryContainerMobile>
                        {products &&
                            products.map((product) => <CategoryLink theme={colors} to={`/shop/${category}/${product.name}`} key={product.id}><ProductCard key={product.id} product={product} /></CategoryLink>)
                        }
                    </CategoryContainerMobile>
                ) : (
                    <CategoryContainer>
                        {products &&
                            products.map((product) => <CategoryLink theme={colors} to={`/shop/${category}/${product.name}`} key={product.id}><ProductCard key={product.id} product={product} /></CategoryLink>)
                        }
                    </CategoryContainer>
                )
            }
            
        </MainContainer>
    )
}

export default Category;