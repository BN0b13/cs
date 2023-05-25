import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AccountDetails from '../../components/account/account-details/account-details.component';
import AccountSidebar from '../../components/account/account-sidebar/account-sidebar.component';
import Invoice from '../../components/invoice/invoice.component';
import Orders from '../../components/account/orders/orders.component';
import OrderInformation from '../../components/account/order-information/order-information.component';
import Settings from '../../components/account/settings/settings.component';
import Spinner from '../../components/spinner/spinner.component';
import VerifyEmail from '../../components/account/verify-email/verify-email.component';

import { UserContext } from '../../contexts/user.context';

import {
    AccountPageContainer,
    RoutesContainer,
    SidebarContainer
} from './account.styles';

const AccountPage = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <AccountPageContainer>
            {!currentUser ?
                <Spinner />
            :
                <>
                    <SidebarContainer>
                        <AccountSidebar />
                    </SidebarContainer>
                    <RoutesContainer>
                        <Routes>
                            <Route index element={<AccountDetails />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/orders/:refId" element={<Invoice />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/verify-email/:emailToken" element={<VerifyEmail />} />
                        </Routes>
                    </RoutesContainer>
                </>
            }
        </AccountPageContainer>
        
    );
};

export default AccountPage;