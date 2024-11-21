import { useContext } from 'react';

import CartIcon from '../cart-icon/cart-icon.component';
import Navigation from './navigation/navigation.component';
import Search from './search/search.component';

import { setMobileView, setTabletView } from '../../../tools/mobileView';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import navLogo from '../../../assets/img/text.png';
import mobileLogo from '../../../assets/img/textMobile.png';

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

  if(setMobileView()) {
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
        <LogoLink onClick={() => window.location = '/'} >
          <Logo theme={colors} src={setTabletView() ? mobileLogo : navLogo} />
        </LogoLink>
      </LogoContainer>
      <NavOptionsDiv>
        <Navigation />
      </NavOptionsDiv>
    </HeaderNav>
  );
};

export default Header;