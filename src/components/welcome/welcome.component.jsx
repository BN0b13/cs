import React from 'react';

import { setMobileView } from '../../tools/mobileView';

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
      {/* {setMobileView() ? 
        <WelcomeLogoMobile src={logo} alt='Welcome to Cosmic Strains' />
        : 
        <WelcomeLogo src={logo} alt='Welcome to Cosmic Strains' />
      } */}
        <WelcomeText>Preparing to launch August 2023</WelcomeText>
        <WelcomeParagraph>Welcome to Cosmic Strains! Your local source for collectible oddities and merchandise. Clothing store coming soon!</WelcomeParagraph>
    </WelcomeContainer>
  );
};

export default Welcome;