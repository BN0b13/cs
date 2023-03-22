import React from 'react';

import logo from '../../assets/img/logo.png';

import {
  WelcomeContainer,
  WelcomeLogo,
  WelcomeLogoMobile,
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
        <WelcomeText>Preparing to launch late 2023</WelcomeText>
    </WelcomeContainer>
  );
};

export default Welcome;