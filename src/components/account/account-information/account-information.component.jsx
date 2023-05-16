import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../../contexts/user.context';

import Client from '../../../tools/client';

import Spinner from '../../spinner/spinner.component';

import {
    AccountInformationContainer,
    AccountInformationData,
    AccountInformationTitle
} from './account-information.styles';

const client = new Client();

const AccountInformation = () => {
    const [data, setData] = useState(null);

    const { setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        const getAccountInformation = async () => {
            const account = await client.getAccount();
            setData(account);
            setCurrentUser(account);
        }

        getAccountInformation();
    }, []);

    return (
        <AccountInformationContainer>
            {!data ?
                <Spinner />
                :
                <>
                    <AccountInformationTitle>Account Information</AccountInformationTitle>
                    <AccountInformationData>First Name: {data.firstName}</AccountInformationData>
                    <AccountInformationData>Last Name: {data.lastName}</AccountInformationData>
                    <AccountInformationData>Phone: {data.phone}</AccountInformationData>
                    <AccountInformationData>Address: {data.billingAddress.addressOne}</AccountInformationData>
                    <AccountInformationData>City: {data.billingAddress.city}</AccountInformationData>
                    <AccountInformationData>State: {data.billingAddress.state}</AccountInformationData>
                    <AccountInformationData>Zip Code: {data.billingAddress.zipCode}</AccountInformationData>
                    <AccountInformationData>Email List: {data.emailList}</AccountInformationData>
                </>
            }
        </AccountInformationContainer>
    );
}

export default AccountInformation;