import React from 'react';

import Welcome from '../../components/welcome/welcome.component';

import './home.styles.scss';

const HomePage = ({ currentHomeDisplay }) => {
    return (
        <Welcome />
    );
};

export default HomePage;