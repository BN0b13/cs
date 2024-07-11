import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from "../../reusable/spinner/spinner.component";

import Client from '../../../tools/client';

const client = new Client();

const VerifyEmail = () => {
    const { emailToken } = useParams();

    useEffect(() => {
        const verifyEmailRequest = async () => {
            await client.completeEmailVerification({ emailToken });
            const res = await client.getAccount();

            if(res.error) {
                window.location = '/login';
            } else {
                window.location = '/account';
            }
        }
        verifyEmailRequest();
    }, [ emailToken ]);

    return (
        <Spinner />
    )
}

export default VerifyEmail;