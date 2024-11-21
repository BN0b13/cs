import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Category from '../category/category.pages';
import Categories from '../categories/categories.pages';
import ShopCategories from '../categories/shop/shop-categories.pages';
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
                <Route index element={ <ShopCategories /> } />
                <Route path="/clones" element={<Categories type={'clones'} />} />
                <Route path="/clones/:categoryName" element={<Category />} />
                <Route path="/clones/:categoryName/:name" element={<Product />} />
                <Route path="/merchandise" element={<Categories type={'merchandise'} />} />
                <Route path="/merchandise/:categoryName" element={<Category />} />
                <Route path="/merchandise/:categoryName/:name" element={<Product />} />
                <Route path="/seeds" element={<Categories type={'seeds'} />} />
                <Route path="/seeds/:categoryName" element={<Category />} />
                <Route path="/seeds/:categoryName/:name" element={<Product />} />
            </Routes>
        </MainContainer>
    )
}

export default ShopPage;