import { useContext, useEffect, useState } from 'react';

import CategoryCard from './categories-preview/category-card/category-card.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import {
    VscArrowRight
} from "react-icons/vsc";

import { ConfigurationContext } from '../../contexts/configuration.context';

import Client from '../../tools/client';

import {
    CategoryCardContainer,
    CategoriesPreviewContainer,
    CategoriesTitle,
    CategoriesLink,
    Preview
} from './categories.styles';

import {
    Text
} from '../../styles/page.styles';

const client = new Client();

const Categories = ({ type }) => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const type = urlParams.get('type');
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState([]);

    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const res = await client.getCategoriesByType(type);
        
        setCategories(res.rows);
        setLoading(false);
    }

    return (
        <>
            <CategoriesTitle>
                <CategoriesLink theme={colors} to={`/shop`}>SHOP</CategoriesLink>{'  '}<VscArrowRight />{'  '}{ type.toUpperCase() }
            </CategoriesTitle>
            <CategoriesPreviewContainer>
                {loading ?
                    <Spinner />
                :
                    categories.length === 0 ?
                        <Text>No Available Category</Text>
                    :
                        <Preview>
                            { categories.map((category, index) => {
                                return(
                                    <CategoryCardContainer key={index} onClick={() => window.location = `/shop/${type}/${category.name}`}>
                                        <CategoryCard category={category} />
                                    </CategoryCardContainer>
                                )
                            }) }
                        </Preview>
                }
            </CategoriesPreviewContainer>
        </>
    )
}

export default Categories;