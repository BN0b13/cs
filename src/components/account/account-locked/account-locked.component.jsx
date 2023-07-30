import { useEffect, useState } from 'react';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
    AccountLockedContainer,
    AccountLockedText,
    AccountLockedTitle
} from './account-locked.styles';

const client = new Client();

const AccountLocked = () => {
    const [ loading, setLoading ] = useState(true);
    const [ showButton, setShowButton ] = useState(null);

    useEffect(() => {
        const getEmailTokenStatus = async () => {
            const res = await client.isEmailTokenValid();
            
            if(res.status === 200) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
            setLoading(false);
        }
        getEmailTokenStatus();
    }, []);

    const sendEmailVerificationEmail = async () => {
        await client.sendEmailVerificationEmail();
        setShowButton(false);
    }

    return (
        <AccountLockedContainer>
            <AccountLockedTitle>Account Locked</AccountLockedTitle>
            <AccountLockedText>Please verify your email by clicking on the email verification link in your email. If you do not see the email, please check your spam folder. You can request another verification email with the button below, once the link has expired.</AccountLockedText>
            
            {loading ?
                <Spinner />
            :
                showButton ?
                    <Button onClick={() => sendEmailVerificationEmail()}>Send Verification Email Again</Button>
                :
                    <AccountLockedText>Please check your email's spam folder for the account verification email.</AccountLockedText>
            }
        </AccountLockedContainer>
    )
}

export default AccountLocked;