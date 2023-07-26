import React from 'react';

import Button from '../../components/reusable/button/button.component';

import logo from '../../assets/img/logo.png';

import {
    AboutPageContainer,
    AboutPageImage,
    AboutPageText,
    AboutPageTitle,
    ButtonContainer,
    ContentContainer
} from './about.styles';

const AboutPage = () => {
    return (
        <AboutPageContainer>
            <ContentContainer>
                <AboutPageImage src={logo} />
                <AboutPageTitle>About Us</AboutPageTitle>
                <AboutPageText>Our mission is to create the most stable and potent genetics around. Our journey will result in more F1's than we can ever get to which means our customers end up with strains no one else has. We pride ourselves in our collection of the rarest and most sought after strains. Please join us on our journey and browse our shop. You never know what you will come across.</AboutPageText>
            </ContentContainer>
            <ButtonContainer>
                <Button onClick={() => window.location.href = '/shop'}>SHOP NOW</Button>
            </ButtonContainer>
        </AboutPageContainer>
    );
};

export default AboutPage;