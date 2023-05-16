import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from "../../spinner/spinner.component";

import Client from '../../../tools/client';

const client = new Client();

const VerifyEmail = () => {
    const { emailToken } = useParams();

    useEffect(() => {
        const verifyEmailRequest = async () => {
            await client.completeEmailVerification({ emailToken });
            window.location = '/account';
        }
        verifyEmailRequest();
    }, []);

    return (
        <Spinner />
    )
}

export default VerifyEmail;