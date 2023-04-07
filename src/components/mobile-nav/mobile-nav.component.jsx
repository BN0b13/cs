import React, { useState } from 'react';

import { GrMenu, GrClose } from 'react-icons/gr';

import { 
    menuItemsPublic,
    menuItemsLoggedIn
} from '../../assets/menu-items';

import {
    MobileDropDownMenu,
    MobileDropDownMenuCloseContainer,
    MobileDropDownMenuContainer,
    MobileDropDownMenuItem,
    MobileDropDownMenuLink,
    MobileDropDownMenuOpenContainer
} from './mobile-nav.styles';

const MobileNav = ({ loggedInStatus, logInOptions }) => {
    const [ show, setShow ] = useState(false);

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
                {loggedInStatus && menuItemsLoggedIn.map((item, index) => {
                    return (
                        <MobileDropDownMenuItem key={index}>
                            <MobileDropDownMenuLink href={item.path}>
                                {item.title}
                            </MobileDropDownMenuLink>
                        </MobileDropDownMenuItem>
                    );
                })}
                <MobileDropDownMenuItem>{ logInOptions() }</MobileDropDownMenuItem>
                </MobileDropDownMenu>
            </MobileDropDownMenuContainer>
          );
    }
    return (
      <MobileDropDownMenuOpenContainer>
        <GrMenu onClick={() => setShow(true)}>Menu</GrMenu>
      </MobileDropDownMenuOpenContainer>
    );
  }

  export default MobileNav;