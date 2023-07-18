import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AccountDetails from '../../components/account/account-details/account-details.component';
import AccountSidebar from '../../components/account/account-sidebar/account-sidebar.component';
import Invoice from '../../components/reusable/invoice/invoice.component';
import Orders from '../../components/account/orders/orders.component';
import Settings from '../../components/account/settings/settings.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdatePassword from '../../components/account/update-password/update-password.component';
import VerifyEmail from '../../components/account/verify-email/verify-email.component';

import { UserContext } from '../../contexts/user.context';

import {
    AccountPageContainer,
    RoutesContainer
} from './account.styles';

const AccountPage = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <AccountPageContainer>
            {!currentUser ?
                <Spinner />
            :
                <>
                    <AccountSidebar />
                    <RoutesContainer>
                        <Routes>
                            <Route index element={<AccountDetails />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/orders/:refId" element={<Invoice />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/update-password" element={<UpdatePassword />} />
                            <Route path="/verify-email/:emailToken" element={<VerifyEmail />} />
                        </Routes>
                    </RoutesContainer>
                </>
            }
        </AccountPageContainer>
        
    );
};

export default AccountPage;