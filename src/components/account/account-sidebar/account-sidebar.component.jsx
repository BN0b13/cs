import React from 'react';

import { accountSidebarMenu } from '../../../assets/menu-items';

import {
    AccountSidebarContainer,
    AccountSidebarOption,
    OptionContainer
} from './account-sidebar.styles';

const AccountSidebar = () => {

    return (
        <AccountSidebarContainer>
            {accountSidebarMenu.map((item, index) => ( 
                    <OptionContainer key={index} onClick={() => window.location = item.path}>
                        <AccountSidebarOption>
                            { item.icon } { item.title }
                        </AccountSidebarOption>
                    </OptionContainer>
                ))}
        </AccountSidebarContainer>

    );
}

export default AccountSidebar;