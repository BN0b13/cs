import React, { useState } from 'react';

import AccountDisplay from '../../components/account/account-display/account-display.component';
import AccountSidebar from '../../components/account/account-sidebar/account-sidebar.component';

import {
    AccountPageContainer,
    AccountPageDisplay
} from './account.styles';

const AccountPage = () => {
    const [ accountView, setAccountView ] = useState(1);

    return (
        <AccountPageContainer>
            <AccountPageDisplay>
                <AccountSidebar setAccountView={setAccountView} />
                <AccountDisplay accountView={accountView} />
            </AccountPageDisplay>
        </AccountPageContainer>
    );
};

export default AccountPage;