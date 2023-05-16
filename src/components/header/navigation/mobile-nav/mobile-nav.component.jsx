import React, { useState } from 'react';

import { GrMenu, GrClose } from 'react-icons/gr';

import CartIcon from '../../../cart-icon/cart-icon.component';

import { 
    menuItemsPublic,
    menuItemsLoggedIn
} from '../../../../assets/menu-items';
import { tokenName } from '../../../../config';

import {
    HeaderLink,
    MobileDropDownMenu,
    MobileDropDownMenuCloseContainer,
    MobileDropDownMenuContainer,
    MobileDropDownMenuItem,
    MobileDropDownMenuLink,
    MobileDropDownMenuOpenContainer,
    NavOptions
} from './mobile-nav.styles';

const MobileNav = () => {
    const loggedInStatus = localStorage.getItem(tokenName);

    const [ show, setShow ] = useState(false);
    if(window.location.pathname === '/login') {
        return (
            <NavOptions>
                <HeaderLink href={`/`}>
                    Cancel
                </HeaderLink>
            </NavOptions>
        )
    }

    if(show) {
        return (
            <MobileDropDownMenuContainer show={show}>
                <MobileDropDownMenuCloseContainer>
                    <GrClose onClick={() => setShow(false)}>Close</GrClose>
                </MobileDropDownMenuCloseContainer>
                <MobileDropDownMenu>
                {menuItemsPublic.map((item, index) => {
                    return (
                        <MobileDropDownMenuItem key={index}>
                            <MobileDropDownMenuLink href={item.path}>
                                {item.title}
                            </MobileDropDownMenuLink>
                        </MobileDropDownMenuItem>
                    );
                })}
                {loggedInStatus ? 
                    <>
                    {menuItemsLoggedIn.map((item, index) => {
                        return (
                            <MobileDropDownMenuItem key={index}>
                                <MobileDropDownMenuLink href={item.path}>
                                    {item.title}
                                </MobileDropDownMenuLink>
                            </MobileDropDownMenuItem>
                        );
                    })}
                    <MobileDropDownMenuItem>
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
                    <HeaderLink href={`/login`}>
                        Log In
                    </HeaderLink>
                </MobileDropDownMenuItem>
                }
                
                </MobileDropDownMenu>
            </MobileDropDownMenuContainer>
          );
    }

    return (
      <MobileDropDownMenuOpenContainer>
        <CartIcon loggedInStatus={loggedInStatus} />
        <GrMenu onClick={() => setShow(true)}>Menu</GrMenu>
      </MobileDropDownMenuOpenContainer>
    );
  }

  export default MobileNav;