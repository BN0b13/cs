import { Fragment } from 'react';

import CategoryPreview from '../../components/category-preview/category-preview.component';

import { SHOP_DATA } from '../../assets/inventory/inventory';

const CategoriesPreview = () => {
    const categoriesMap = SHOP_DATA;

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={products.title} products={products.items} />
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;