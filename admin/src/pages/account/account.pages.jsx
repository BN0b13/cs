import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountDisplay from '../../components/account/account-display/account-display.component';
import Button from '../../components/reusable/button/button.component';
import OrdersTable from '../../components/reusable/tables/orders-table/orders-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateAccount from '../../components/account/update-account/update-account.component';

import { ToastContext } from '../../contexts/toast.context';

import Client from '../../tools/client';
import { url } from '../../config';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    MainTitle
} from '../../styles/page.styles';

const client = new Client();

const AccountPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ account, setAccount ] = useState(null);
    const [ showUpdateAccount, setShowUpdateAccount ] = useState(false);
    
    const { successToast, errorToast } = useContext(ToastContext);

    useEffect(() => {
        getAccount();

        // eslint-disable-next-line
    }, []);

    const getAccount = async () => {
        setLoading(true);
        const res = await client.getAccountById(id);

        setAccount(res);
        setLoading(false);
    }

    const updateAccount = async (params) => {
        const data = {
            ...params,
            id: account.id
        };

        const res = await client.updateAccount(data);

        if(res.length > 0) {
            await getAccount();
            setShowUpdateAccount(false);
            successToast('Account Updated');
        } else {
            errorToast('There was an error updating account. Please try again.')
        }
    }

    return (
        <MainContainer>
            <BackLink onClick={() => window.location.href = `${url}/accounts`}>Back to Accounts</BackLink>
            {loading ?
                <Spinner />
            :
                account.length === 0 ?
                    <MainTitle>No account to Display</MainTitle>
                :
                    showUpdateAccount ?
                        <UpdateAccount account={account} submit={updateAccount} showUpdate={setShowUpdateAccount} />
                    :
                        <>
                            <AccountDisplay account={account} showUpdate={setShowUpdateAccount} />
                            <OrdersTable orders={account.Orders} />
                        </>
            }
        </MainContainer>
    )
}

export default AccountPage;