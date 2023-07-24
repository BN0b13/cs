import React from 'react';

import freebies from '../../assets/img/about.jpg';

import {
    AboutPageContainer,
    AboutPageImage,
    AboutPageText,
    AboutPageTitle,
    ContentContainer
} from './about.styles';

const AboutPage = () => {
    return (
        <AboutPageContainer>
            <ContentContainer>
                <AboutPageImage src={freebies} />
                <AboutPageTitle>Freebies</AboutPageTitle>
                <AboutPageText>Free seeds with every pack of collectible seeds ordered! Here at Cosmic Strains we wanted to make creating your cannabis seed collection as fun as possible. And who doesn't get excited about freebies?! We are offering a free quarter pack of regular seeds with every full pack of seeds purchased. That's 3 additional seeds with every pack! And the best part - All freebies are UNRELEASED STRAINS!</AboutPageText>
            </ContentContainer>
        </AboutPageContainer>
    );
};

export default AboutPage;