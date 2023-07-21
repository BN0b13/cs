import React from 'react';

import { accountSidebarMenu } from '../../../assets/menu-items';

import {
    AccountSidebarContainer,
    AccountSidebarOption,
} from './account-sidebar.styles';

const AccountSidebar = () => {

    return (
        <AccountSidebarContainer>
            {accountSidebarMenu.map((item, index) => {
                return <AccountSidebarOption
                            key={index} 
                            onClick={() => window.location = item.path}
                        >
                            { item.icon } { item.title }
                        </AccountSidebarOption>
            })}
        </AccountSidebarContainer>

    );
}

export default AccountSidebar;