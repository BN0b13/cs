import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
        const getAccountInformation = async () => {
            const account = await client.getAccount();
            setData(account);
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
                    <AccountInformationData>Address: {data.address}</AccountInformationData>
                    <AccountInformationData>City: {data.city}</AccountInformationData>
                    <AccountInformationData>State: {data.state}</AccountInformationData>
                    <AccountInformationData>Zip Code: {data.zipCode}</AccountInformationData>
                    <AccountInformationData>Email List: {data.emailList}</AccountInformationData>
                </>
            }
        </AccountInformationContainer>
    );
}

export default AccountInformation;