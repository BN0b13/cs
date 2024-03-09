import { useState } from 'react';

import Button from '../../reusable/button/button.component';
import Toasted from '../../reusable/toasted/toasted.component.jsx';

import Client from '../../../tools/client';
import UserTools from '../../../tools/client';

import {
    UpdateInputsContainer,
    UpdatePasswordContainer,
    UpdatePasswordTitle,
    UpdatePasswordSubtitle,
    UpdatePasswordInput
} from './update-password.styles';

const client = new Client();
const userTools = new UserTools();

const UpdatePassword = () => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const successToast = (message) => {
        setToastMessage(message);
        setToastError(false);
        setShowToast(true);
    }

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }
    

    const checkFields = () => {
        if(currentPassword.length === 0 ||
            newPassword.length === 0 ||
            confirmNewPassword.length === 0) {
            errorToast('Please complete all fields to update password');
            return false;
        }
        if(!userTools.passwordValidation(newPassword)) {
            errorToast('Password needs to be 8 characters in length or more with at least one number and one special character');
            return false;
        }
        if(newPassword !== confirmNewPassword) {
            errorToast('New password fields do not match');
            return false;
        }
        return true;
    }

    const handlePasswordUpdate = async () => {
        if(!checkFields()) {
            return
        }
        await client.updateAccountPassword({ currentPassword, newPassword });
        
        successToast('Updated Password');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    return (
        <UpdatePasswordContainer>
            <UpdatePasswordTitle>Update Password</UpdatePasswordTitle>
            <UpdatePasswordSubtitle>Please enter your current password to continue</UpdatePasswordSubtitle>
            <UpdateInputsContainer  onKeyDown={(e) => e.key === 'Enter' ? handlePasswordUpdate() : ''}>
                <UpdatePasswordInput type='password' name='password' value={ currentPassword } onChange={(e) => setCurrentPassword(e.target.value)} placeholder={'Current Password'} />
                <UpdatePasswordInput type='password' name='newPassword' value={ newPassword } onChange={(e) => setNewPassword(e.target.value)} placeholder={'New Password'} />
                <UpdatePasswordInput type='password' name='confirmPassword' value={ confirmNewPassword } onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder={'Confirm New Password'} />
            </UpdateInputsContainer>
            <Button onClick={() => handlePasswordUpdate()}>Update Password</Button>
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </UpdatePasswordContainer>
    )
}

export default UpdatePassword;