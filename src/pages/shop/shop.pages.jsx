import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import Product from '../product/product.pages';

import { ConfigurationContext } from '../../contexts/configuration.context';

import {
    MainContainer
} from './shop.styles';

const ShopPage = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <MainContainer theme={colors}>
            <Routes>
                <Route index element={<CategoriesPreview />} />
                <Route path=":category" element={<Category />} />
                <Route path="/:category/:item" element={<Product />} />
            </Routes>
        </MainContainer>
    )
}

export default ShopPage;