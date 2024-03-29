import { useContext, useState } from 'react';

import Button from '../../reusable/button/button.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';
import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';

import {
    ButtonContainer,
    InitiateResetContainer,
    InitiateResetForm,
    InitiateResetInput,
    InitiateResetTitle
} from './initiate-reset.styles';

const client = new Client();

const InitiateReset = () => {
    const [ email, setEmail ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);
    
    const { colors } = useContext(ConfigurationContext);
    const { errorToast, successToast } = useContext(ToastContext);

    const submitEmail = async () => {
        if(!email.includes('@') || !email.includes('.') || email === '') {
            errorToast('Please input a valid email');
            return
        }
        setEmail('');
        successToast('If your email is in our system you will receive a link to reset your password shortly');

        await client.passwordResetEmail({ email });
    }

    return (
        <InitiateResetContainer theme={colors}>
            <InitiateResetTitle>Reset Password</InitiateResetTitle>
            <InitiateResetForm onKeyDown={(e) => e.key === 'Enter' ? submitEmail() : ''}>
                <InitiateResetInput type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
            </InitiateResetForm>
            <ButtonContainer>
                <Button onClick={() => submitEmail()}>Submit</Button>
            </ButtonContainer>
        </InitiateResetContainer>
    )
}

export default InitiateReset;