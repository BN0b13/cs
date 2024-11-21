import React, { useEffect, useState } from 'react';

import Freebies from '../../components/home/freebies/freebies.component';
import ComponentSlideshow from '../../components/reusable/component-slideshow/component-slideshow.component';
import InfoLinks from '../../components/home/info-links/info-links.components';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Welcome from '../../components/home/welcome/welcome.component';

import Client from '../../tools/client';

import {
    WelcomePageBackSplash,
    HomePageContainer
} from './home.styles';

const client = new Client();

const HomePage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ products, setProducts ] = useState('');
    const [ categories, setCategories ] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const productsRes = await client.getProducts();
            const categoriesRes = await client.getAllCategories();

            setProducts(productsRes.rows);
            setCategories(categoriesRes.rows);
            setLoading(false);
        }
        getProducts();
    }, []);

    return (
        <HomePageContainer>
            <WelcomePageBackSplash />
            <Welcome />
            <InfoLinks />
            {loading ?
                <Spinner />
            :
                <ComponentSlideshow products={products} categories={categories} />
            }
            <Freebies />
        </HomePageContainer>
    );
};

export default HomePage;