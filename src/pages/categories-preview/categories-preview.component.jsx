import { useEffect, useState } from 'react';

import Spinner from '../../components/reusable/spinner/spinner.component';
import CategoryCard from './category-card/category-card.component';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import {
    CategoryCardContainer,
    CategoriesPreviewContainer,
    Preview
} from './categories-preview.styles';

const client = new Client();

const CategoriesPreview = () => {
    const [ categories, setCategories ] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategories();

            const availableCategories = res.rows.filter(category => category.status);

            setCategories(availableCategories);
        }
        getCategories();
    }, []);

    return (
        <CategoriesPreviewContainer>
            {!categories ?
                <Spinner />
            :
                <Preview setMobileView={setMobileView()}>
                    { categories.map((category, index) => {
                        return(
                            <CategoryCardContainer key={index} onClick={() => window.location = `/shop/${category.name}`}>
                                <CategoryCard category={category} />
                            </CategoryCardContainer>
                        )
                    }) }
                </Preview>
                
            }
        </CategoriesPreviewContainer>
    )
}

export default CategoriesPreview;