import { useContext } from 'react';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import { accountSidebarMenu } from '../../../assets/menu-items';

import {
    AccountSidebarContainer,
    AccountSidebarOption,
    OptionContainer
} from './account-sidebar.styles';

const AccountSidebar = () => {
    const { colors } = useContext(ConfigurationContext);

    return (
        <AccountSidebarContainer>
            {accountSidebarMenu.map((item, index) => ( 
                    <OptionContainer key={index} theme={colors} onClick={() => window.location = item.path}>
                        <AccountSidebarOption>
                            { item.icon } { item.title }
                        </AccountSidebarOption>
                    </OptionContainer>
                ))}
        </AccountSidebarContainer>

    );
}

export default AccountSidebar;