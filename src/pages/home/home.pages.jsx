import React from 'react';

import About from '../../components/home/about/about.component';
import ProductSuggestions from '../../components/reusable/product-suggestions/product-suggestions.component';
import Welcome from '../../components/home/welcome/welcome.component';

import backSplash from '../../assets/img/back-splash.png';

import {
    WelcomePageBackSplash,
    HomePageContainer
} from './home.styles';

const HomePage = () => {
    return (
        <HomePageContainer>
            <WelcomePageBackSplash>
            </WelcomePageBackSplash>
            <Welcome />
            <ProductSuggestions />
            <About />
        </HomePageContainer>
    );
};

export default HomePage;