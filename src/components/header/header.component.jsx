import { useContext, useEffect } from 'react';

import MobileNav from './navigation/mobile-nav/mobile-nav.component';
import Navigation from './navigation/navigation.component';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import { UserContext } from '../../contexts/user.context';

import { tokenName } from '../../config';

import navLogo from '../../assets/img/text.png';
import navLogoMobile from '../../assets/img/textMobile.png';

import {
  HeaderNav,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv,
  NavOptionsMobileDiv,
} from './header.styles';

const client = new Client();

const Header = () => {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const getAccount = async () => {
      console.log('Getting Account...');
      const res = await client.getAccount();
      setCurrentUser(res);
    }
    const token = localStorage.getItem(tokenName);
    if(token) {
      getAccount();
    } else {
      console.log('Token is expired!');
    }
  }, []);

  if(setMobileView()) {
    return (
      <HeaderNav>
        <LogoContainer>
          <LogoLink onClick={() => window.location = '/'} >
            <Logo src={navLogoMobile} />
          </LogoLink>
        </LogoContainer>
          <NavOptionsMobileDiv>
              <MobileNav />
          </NavOptionsMobileDiv>
      </HeaderNav>
    )
  }

  return (
    <HeaderNav>
      <LogoContainer>
        <LogoLink onClick={() => window.location = '/'} >
          <Logo src={navLogo} />
        </LogoLink>
      </LogoContainer>
      <NavOptionsDiv>
        <Navigation />
      </NavOptionsDiv>
    </HeaderNav>
  );
};

export default Header;