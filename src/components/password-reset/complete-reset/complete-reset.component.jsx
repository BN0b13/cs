import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../reusable/button/button.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';
import { ToastContext } from '../../../contexts/toast.context.jsx';

import Client from '../../../tools/client';
import Tools from '../../../tools/tools.js';

import logo from '../../../assets/img/logo.png';

import {
    ButtonContainer,
    CompleteResetContainer,
    CompleteResetForm,
    CompleteResetImage,
    CompleteResetImageContainer,
    CompleteResetInput,
    CompleteResetText,
    CompleteResetTitle
} from './complete-reset.styles';

const client = new Client();
const tools = new Tools();

const CompleteReset = () => {
    const { token } = useParams();
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ showTokenExpired, setShowTokenExpired ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    const { colors } = useContext(ConfigurationContext);
    const { errorToast } = useContext(ToastContext);

    useEffect(() => {
        const getPasswordResetTokenStatus = async () => {
            const res = await client.isPasswordRestTokenValid(token);
            
            if(res.status !== 200) {
                setShowSuccess(false);
                setShowTokenExpired(true);
            }
        }
        getPasswordResetTokenStatus();
    }, []);

    const confirmPasswordInputs = () => {
        if(password.length === 0 || 
            confirmPassword.length === 0) {
                errorToast('Please complete all fields to reset password');
                return false;
            }
        if(!tools.passwordValidation(password)) {
            errorToast('Password needs to be 8 characters in length or more with at least one number and one special character');
            return false;
        }
        if(password !== confirmPassword) {
            errorToast('Password inputs must match');
            return false;
        }

        return true;
    }

    const submitPassword = async () => {
        const confirmInputs = confirmPasswordInputs();
        if(!confirmInputs) {
            return
        }

        await client.completePasswordReset({ passwordToken: token, password });

        setPassword('');
        setConfirmPassword('');
        setShowSuccess(true);
    }

    const display = () => {
        if(showTokenExpired) {
            return (
                <>
                    <CompleteResetTitle>Token Has Expired. Please try again.</CompleteResetTitle>
                    <ButtonContainer>
                        <Button onClick={() => window.location.href = '/password-reset'}>Back</Button>
                    </ButtonContainer>
                </>
            )
        }

        if(showSuccess) {
            return (
                <>
                    <CompleteResetTitle>Password Updated</CompleteResetTitle>
                    <CompleteResetImageContainer>
                        <CompleteResetImage src={logo} />
                    </CompleteResetImageContainer>
                    <CompleteResetText>Please Log In To Continue</CompleteResetText>
                    <ButtonContainer>
                        <Button onClick={() => window.location = '/login'}>Log In</Button>
                    </ButtonContainer>
                </>
            )
        }

        return (
            <>
                <CompleteResetTitle>Enter New Password</CompleteResetTitle>
                <CompleteResetText>Password needs to be between 8 and 30 characters long with at least one number and one special character.</CompleteResetText>
                <CompleteResetForm onKeyDown={(e) => e.key === 'Enter' ? submitPassword() : ''}>
                    <CompleteResetInput type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Password'} />
                    <CompleteResetInput type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={'Confirm Password'} />
                </CompleteResetForm>
                <ButtonContainer>
                        <Button onClick={() => submitPassword()}>Submit</Button>
                </ButtonContainer>
            </>
        )
    }

    return (
        <CompleteResetContainer theme={colors}>
            { display () }
        </CompleteResetContainer>
    )
}

export default CompleteReset;