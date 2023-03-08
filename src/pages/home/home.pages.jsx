import React from 'react';

import Welcome from '../../components/welcome/welcome.component';
import './home.styles.scss';

const HomePage = ({ currentHomeDisplay }) => {

    console.log('Home Page currentHomeDisplay var: ', currentHomeDisplay);
    
    return (
        <Welcome />
    );
};

export default HomePage;