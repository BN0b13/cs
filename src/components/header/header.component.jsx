import MobileNav from './navigation/mobile-nav/mobile-nav.component';
import Navigation from './navigation/navigation.component';

import {
  HeaderNav,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv,
  NavOptionsMobileDiv,
} from './header.styles';

import navLogo from '../../assets/img/text.png';
import navLogoMobile from '../../assets/img/textMobile.png';

const Header = () => {
  if(window.screen.width < 500) {
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