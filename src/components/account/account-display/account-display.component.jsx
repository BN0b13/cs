import React from 'react';

import AccountInformation from '../account-information/account-information.component';
import OrderHistory from '../order-history/order-history.component';
import Settings from '../settings/settings.component';

import { accountSidebarMenu } from '../../../assets/menu-items';

import {
    AccountDisplayContainer
} from './account-display.styles';

const AccountDisplay = ({ accountView }) => {

    const accountDisplayContent = () => {
        if(accountView === accountSidebarMenu[0].option) {
            return <AccountInformation />
        }

        if(accountView === accountSidebarMenu[1].option) {
            return <OrderHistory />
        }

        if(accountView === accountSidebarMenu[2].option) {
            return <Settings />
        }
    }



    return (
        <AccountDisplayContainer>
            { accountDisplayContent() }
        </AccountDisplayContainer>
    );
}

export default AccountDisplay;