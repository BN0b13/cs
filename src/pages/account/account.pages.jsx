import { Routes, Route } from 'react-router-dom';

import AccountInformation from '../../components/account/account-information/account-information.component';
import AccountSidebar from '../../components/account/account-sidebar/account-sidebar.component';
import Orders from '../../components/account/orders/orders.component';
import OrderInformation from '../../components/account/order-information/order-information.component';
import Settings from '../../components/account/settings/settings.component';
import VerifyEmail from '../../components/account/verify-email/verify-email.component';

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
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:refId" element={<OrderInformation />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/verify-email/:emailToken" element={<VerifyEmail />} />
                </Routes>
            </RoutesContainer>
        </AccountPageContainer>
        
    );
};

export default AccountPage;