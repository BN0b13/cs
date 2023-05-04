import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import Product from '../product/product.pages';

const ShopPage = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
            <Route path="/:category/:item" element={<Product />} />
        </Routes>
    )
}

export default ShopPage;