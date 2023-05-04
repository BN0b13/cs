import React from 'react';

import MobileNav from '../mobile-nav/mobile-nav.component';
import CartIcon from '../cart-icon/cart-icon.component';

import {
  HeaderLink,
  HeaderNav,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv,
  NavOptions,
  NavOptionsMobileDiv,
} from './header.styles';

import { tokenName } from '../../config';
import { 
  menuItemsPublic,
  menuItemsLoggedIn
} from '../../assets/menu-items';
import text from '../../assets/img/text.png';
import textMobile from '../../assets/img/textMobile.png';

const loggedInStatus = localStorage.getItem(tokenName);

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
  if(loggedInStatus) {
    return (
      <HeaderLink onClick={() => {
        localStorage.removeItem(tokenName);
        sessionStorage.removeItem(tokenName);
        window.location = '/';
      }}>
        Log Out
      </HeaderLink>
    );
  }

  return (
    <HeaderLink href={`/login`}>
      Log In
    </HeaderLink>
  );
}

const optionsDisplay = () => {
  // TODO add search bar
  return (
    <NavOptions>
      {menuItemsPublic.map((item, index) => {
          return (
            <HeaderLink key={index} href={item.path}>
            {item.title}
        </HeaderLink>
          );
      })}
      {loggedInStatus && menuItemsLoggedIn.map((item, index) => {
          return (
            <HeaderLink key={index} href={item.path}>
                {item.title}
            </HeaderLink>
          );
      })}
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
          <MobileNav
            loggedInStatus={loggedInStatus}
            logInOptions={logInOptions}
          />
        }
        <CartIcon />
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
        <CartIcon loggedInStatus={loggedInStatus} />
      </NavOptionsDiv>
    </HeaderNav>
  );
};

export default Header;