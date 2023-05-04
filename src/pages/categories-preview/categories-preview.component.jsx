import { Fragment, useEffect, useState } from 'react';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

import Client from '../../tools/client';

const client = new Client();

const CategoriesPreview = () => {
    const [ categories, setCategories ] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategories();
            setCategories(res.rows);
        }
        getCategories();
    }, []);

    return (
        <Fragment>
            {!categories ?
                <Spinner />
            :
                categories.map((category, index) => {
                    return <CategoryPreview key={index} title={category.name} products={category.Products} />
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;