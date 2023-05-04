import React from 'react';

import logo from '../../assets/img/logo.png';

import {
  WelcomeContainer,
  WelcomeLogo,
  WelcomeLogoMobile,
  WelcomeParagraph,
  WelcomeText
} from './welcome.styles';

const Welcome = () => {

  return (
    <WelcomeContainer>
      {window.screen.width < 500 ? 
        <WelcomeLogoMobile src={logo} alt='Welcome to Cosmic Strains' />
        : 
        <WelcomeLogo src={logo} alt='Welcome to Cosmic Strains' />
      }
        <WelcomeText>Preparing to launch July 2023 with our Ghost line</WelcomeText>
        <WelcomeParagraph>New user enrollment starts in June. Create an account and get ready for take off!</WelcomeParagraph>
    </WelcomeContainer>
  );
};

export default Welcome;