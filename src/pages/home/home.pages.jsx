import React from 'react';

import Welcome from '../../components/welcome/welcome.component';

import {
    HomePageContainer
} from './home.styles';

const HomePage = () => {
    return (
        <HomePageContainer>
            <Welcome />
        </HomePageContainer>
    );
};

export default HomePage;