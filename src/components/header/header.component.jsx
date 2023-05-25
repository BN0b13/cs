import { useContext, useEffect } from 'react';

import CartIcon from '../cart-icon/cart-icon.component';
import Navigation from './navigation/navigation.component';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import { UserContext } from '../../contexts/user.context';

import { tokenName } from '../../config';

import navLogo from '../../assets/img/text.png';

import {
  HeaderNav,
  MobileHeaderNav,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv
} from './header.styles';

const client = new Client();

const Header = () => {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const getAccount = async () => {
      const res = await client.getAccount();
      setCurrentUser(res);
    }
    const token = localStorage.getItem(tokenName);
    if(token) {
      getAccount();
    } else {
      localStorage.removeItem(tokenName);
    }
  }, []);

  if(setMobileView()) {
    return (
      <MobileHeaderNav>
           <CartIcon />
      </MobileHeaderNav>
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