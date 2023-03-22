import React, { useState } from 'react';

import { GrMenu, GrClose } from 'react-icons/gr';

import { menuItems } from '../../assets/menu-items';

import {
    MobileDropDownMenu,
    MobileDropDownMenuCloseContainer,
    MobileDropDownMenuContainer,
    MobileDropDownMenuItem,
    MobileDropDownMenuLink,
    MobileDropDownMenuOpenContainer
} from './mobile-nav.styles';

const MobileNav = ({ logInOptions }) => {
    const [ show, setShow ] = useState(false);

    if(show) {
        return (
            <MobileDropDownMenuContainer show={show}>
                <MobileDropDownMenuCloseContainer>
                    <GrClose onClick={() => setShow(false)}>Close</GrClose>
                </MobileDropDownMenuCloseContainer>
                <MobileDropDownMenu>
                {menuItems.map((item, index) => {
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