import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../button/button.component';
import Snackbar from '../../snackbar/snackbar.component';

import Client from '../../../tools/client';

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

const CompleteReset = () => {
    const { token } = useParams();
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ msg, setMsg ] = useState('Password must be at least 8 characters in length, have one special character and one uppercase letter');
    const [ show, setShow ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const confirmPasswordInputs = () => {
        if(password !== confirmPassword) {
            setMsg('Password inputs must match');
            return false;
        }
        // TODO more password validation: length, special characters and case sensitivity
        if(
            password === '' || 
            password.length < 8
        ) {
            setMsg('Password must be at least 8 characters in length, have one special character and one uppercase letter');
            return false;
        }

        return true;
    }

    const submitPassword = async () => {
        const confirmInputs = confirmPasswordInputs();
        if(!confirmInputs) {
            setShow(true);
            return
        }
        setPassword('');
        setConfirmPassword('');
        setSuccess(true);

        await client.completePasswordReset({ passwordToken: token, password });
    }

    return (
        <CompleteResetContainer>
            {!success ?
                <>
                    <CompleteResetTitle>Enter New Password</CompleteResetTitle>
                    <CompleteResetForm>
                        <CompleteResetInput type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Password'} />
                        <CompleteResetInput type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={'Confirm Password'} />
                    </CompleteResetForm>
                    {show &&
                        <Snackbar 
                            msg={msg}
                            type={'error'}
                            show={() => setShow(false)}
                        />
                    }
                    <ButtonContainer>
                            <Button onClick={() => submitPassword()}>Submit</Button>
                    </ButtonContainer>
                </>
            :
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

            }
            
        </CompleteResetContainer>
    )
}

export default CompleteReset;