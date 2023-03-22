import React from 'react';

import MobileNav from '../mobile-nav/mobile-nav.component';

import {
  HeaderLink,
  HeaderNav,
  LogOut,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv,
  NavOptions,
  NavOptionsMobileDiv,
} from './header.styles';

import { tokenName } from '../../assets/config';
import text from '../../assets/img/text.png';
import textMobile from '../../assets/img/textMobile.png';

const cancelOption = () => {
  return (
    <NavOptions>
      <HeaderLink href={`/`}>
        Cancel
      </HeaderLink>
    </NavOptions>
  )
}

const logInOptions = () => {
  if(localStorage.getItem(tokenName)) {
    return (
      <LogOut onClick={() => {
        localStorage.removeItem(tokenName);
        sessionStorage.removeItem(tokenName);
        window.location = '/';
      }}>
        Log Out
      </LogOut>
    );
  }

  return (
    <HeaderLink href={`/login`}>
      Log In
    </HeaderLink>
  );
}

const optionsDisplay = () => {
  return (
    <NavOptions>
      <HeaderLink href={`/shop`}>
        Lines
      </HeaderLink>
      { logInOptions() }
    </NavOptions>
  );
}

const Header = () => {
  if(window.screen.width < 500) {
    return (
      <HeaderNav>
        <LogoContainer>
          {<LogoLink onClick={() => window.location = '/'} >
            {<Logo src={textMobile} />}
          </LogoLink>}
        </LogoContainer>
        <NavOptionsMobileDiv>
        {window.location.pathname === '/login' ?
          cancelOption()
        :
          <MobileNav logInOptions={logInOptions} />
        }
        </NavOptionsMobileDiv>
      </HeaderNav>
    );
  }

  return (
    <HeaderNav>
      <LogoContainer>
        {<LogoLink onClick={() => window.location = '/'} >
          {<Logo src={text} />}
        </LogoLink>}
      </LogoContainer>
      <NavOptionsDiv>
        {window.location.pathname === '/login' ?
          cancelOption()
        :
          optionsDisplay()
        }
      </NavOptionsDiv>
    </HeaderNav>
  );
};

export default Header;