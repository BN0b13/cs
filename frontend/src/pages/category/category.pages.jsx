import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    VscArrowRight
} from "react-icons/vsc";

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

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
    const { categoryName } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ category, setCategory ] = useState({});
    const [products, setProducts] = useState(null);

    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategoryByName(categoryName);
            
            if(res.status === 404) {
                return window.location.href = '/shop';
            }

            setCategory(res);

            setProducts(res.Products);
            setLoading(false);
        }
        getCategories();
    }, [categoryName]);

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <CategoryTitle><CategoryLink theme={colors} to={`/shop`}>SHOP</CategoryLink>{'  '}<VscArrowRight />{'  '}<CategoryLink theme={colors} to={`/shop/${category.type}`}>{category.type.toUpperCase()}</CategoryLink>{'  '}<VscArrowRight />{'  '}{categoryName.toUpperCase()}</CategoryTitle>
                    {
                        setMobileView() ? (
                            <CategoryContainerMobile>
                                {products &&
                                    products.map((product) => <CategoryLink theme={colors} to={`/shop/${category.type}/${category.name}/${product.name}`} key={product.id}><ProductCard key={product.id} product={product} /></CategoryLink>)
                                }
                            </CategoryContainerMobile>
                        ) : (
                            <CategoryContainer>
                                {products &&
                                    products.map((product) => <CategoryLink theme={colors} to={`/shop/${category.type}/${category.name}/${product.name}`} key={product.id}><ProductCard key={product.id} product={product} /></CategoryLink>)
                                }
                            </CategoryContainer>
                        )
                    }
                        </>
            }
        </MainContainer>
    )
}

export default Category;