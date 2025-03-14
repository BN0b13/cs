import { useContext } from 'react';

import CartIcon from '../cart-icon/cart-icon.component';
import Navigation from './navigation/navigation.component';
import Search from './search/search.component';

import { setMobileView, setTabletView } from '../../../tools/mobileView';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import { imageRouter } from '../../../config/images';
import { pagesConfig } from '../../../config/cms';

import {
  HeaderNav,
  MobileHeaderNav,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv
} from './header.styles';

const Header = () => {
  const { colors } = useContext(ConfigurationContext);

  if((setMobileView() || setTabletView()) && pagesConfig.shop.active) {
    return (
      <MobileHeaderNav theme={colors}>
        <Search />
        <CartIcon />
      </MobileHeaderNav>
    )
  }

  return (
    <HeaderNav theme={colors}>
      <LogoContainer>
        {(!setMobileView() && !setTabletView()) && 
          <LogoLink onClick={() => window.location = '/'} >
            <Logo src={imageRouter.logos.logoText.path} />
          </LogoLink>
        }
      </LogoContainer>
      <NavOptionsDiv>
        <Navigation />
      </NavOptionsDiv>
    </HeaderNav>
  );
};

export default Header;