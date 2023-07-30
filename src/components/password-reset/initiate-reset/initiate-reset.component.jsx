import { useState } from 'react';

import Button from '../../reusable/button/button.component';
import Snackbar from '../../reusable/snackbar/snackbar.component';

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
    const [ show, setShow ] = useState(false);
    const [ type, setType ] = useState('success');
    const [ msg, setMsg ] = useState('If your email is in our system you will receive a link to reset your password shortly');
    // TODO success message/ failure message: If the email is in our system, you will receive a link to reset your password shortly

    const submitEmail = async () => {
        if(!email.includes('@') || !email.includes('.') || email === '') {
            setMsg('Please input a valid email');
            setType('error');
            setShow(true);
            return
        }
        setEmail('');
        setMsg('If your email is in our system you will receive a link to reset your password shortly');
        setType('success');
        setShow(true);

        await client.passwordResetEmail({ email });
    }

    return (
        <InitiateResetContainer>
            <InitiateResetTitle>Reset Password</InitiateResetTitle>
            <InitiateResetForm onKeyDown={(e) => e.key === 'Enter' ? submitEmail() : ''}>
                <InitiateResetInput type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
                {show &&
                    <Snackbar 
                        msg={msg}
                        type={type}
                        show={() => setShow(false)} 
                    />
                }
            </InitiateResetForm>
            <ButtonContainer>
                <Button onClick={() => submitEmail()}>Submit</Button>
            </ButtonContainer>
        </InitiateResetContainer>
    )
}

export default InitiateReset;