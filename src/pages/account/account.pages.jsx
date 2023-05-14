import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import AccountInformation from '../../components/account/account-information/account-information.component';
import AccountSidebar from '../../components/account/account-sidebar/account-sidebar.component';
import OrderHistory from '../../components/account/order-history/order-history.component';
import OrderInformation from '../../components/account/order-information/order-information.component';
import Settings from '../../components/account/settings/settings.component';

import {
    AccountPageContainer,
    RoutesContainer,
    SidebarContainer
} from './account.styles';

const AccountPage = () => {

    return (
        <AccountPageContainer>
            <SidebarContainer>
                <AccountSidebar />
            </SidebarContainer>
            <RoutesContainer>
                <Routes>
                    <Route index element={<AccountInformation />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/orders/:refId" element={<OrderInformation />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </RoutesContainer>
        </AccountPageContainer>
        
    );
};

export default AccountPage;