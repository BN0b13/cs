import { slide as Menu } from 'react-burger-menu';

import { 
    GrLogin, 
    GrLogout 
  } from 'react-icons/gr';

import navLogoMobile from '../../assets/img/logo-hamburger-menu.png';

import { 
    menuItemsPublic,
    menuItemsLoggedIn
} from '../../assets/menu-items';
import { tokenName } from '../../config';

import './hamburger-menu.css';

import {
    HeaderLink,
    MobileDropDownMenu,
    MobileDropDownMenuItem,
    MobileDropDownMenuLink,
    Logo,
    LogoContainer,
    LogoLink,
} from './hamburger-menu.styles';

const HamburgerMenu = props => {
    const loggedInStatus = localStorage.getItem(tokenName);

    return (
        <Menu>
            <MobileDropDownMenu>
                <LogoContainer>
                    <LogoLink onClick={() => window.location = '/'} >
                        <Logo src={navLogoMobile} />
                    </LogoLink>
                </LogoContainer>
            {menuItemsPublic.map((item, index) => {
                return (
                    <MobileDropDownMenuItem key={index}>
                            { item.icon }
                        <MobileDropDownMenuLink href={item.path}>
                            { item.title }
                        </MobileDropDownMenuLink>
                    </MobileDropDownMenuItem>
                );
            })}
            {loggedInStatus ? 
                <>
                {menuItemsLoggedIn.map((item, index) => {
                    return (
                        <MobileDropDownMenuItem key={index}>
                                { item.icon }
                            <MobileDropDownMenuLink href={item.path}>
                                { item.title }
                            </MobileDropDownMenuLink>
                        </MobileDropDownMenuItem>
                    );
                })}
                <MobileDropDownMenuItem>
                    <style>
                        {`
                            svg path {
                            stroke: white
                            }
                        `}
                    </style>
                    <GrLogout color="white" />
                    <HeaderLink 
                        onClick={() => {
                        localStorage.removeItem(tokenName);
                        sessionStorage.removeItem(tokenName);
                        window.location = '/';
                        }}
                    >
                        Log Out
                    </HeaderLink>
                </MobileDropDownMenuItem>
                </>
            :
            <MobileDropDownMenuItem>
                <style>
                    {`
                        svg path {
                        stroke: white
                        }
                    `}
                </style>
                <GrLogin color="white" />
                <HeaderLink href={`/login`}>
                    Log In
                </HeaderLink>
            </MobileDropDownMenuItem>
            }
            
            </MobileDropDownMenu>
        </Menu>
    
    );
  }

  export default HamburgerMenu;