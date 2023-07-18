import { useState } from 'react';

import Button from '../../reusable/button/button.component';
import Snackbar from '../../reusable/snackbar/snackbar.component';

import Client from '../../../tools/client';
import { passwordValidation } from '../../../tools/user.js';

import {
    UpdatePasswordContainer,
    UpdatePasswordTitle,
    UpdatePasswordSubtitle,
    UpdatePasswordInput
} from './update-password.styles';

const client = new Client();

const UpdatePassword = () => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgType, setMsgType ] = useState('error');
    const [ msgContent, setMsgContent ] = useState('Please complete all fields to update password');

    const checkFields = () => {
        if(currentPassword.length === 0 ||
            newPassword.length === 0 ||
            confirmNewPassword.length === 0) {
            setMsgContent('Please complete all fields to update password');
            return false;
        }
        if(!passwordValidation(newPassword)) {
            setMsgContent('Password needs to be 8 characters in length or more with at least one number and one special character');
            return false;
        }
        if(newPassword !== confirmNewPassword) {
            setMsgContent('New password fields do not match');
            return false;
        }
        return true;
    }

    const handlePasswordUpdate = async () => {
        if(!checkFields()) {
            setShowMsg(true);
            setMsgType('error');
            return
        }
        await client.updateAccountPassword({ currentPassword, newPassword });
        
        setMsgContent('Updated Password');
        setShowMsg(true);
        setMsgType('success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    return (
        <UpdatePasswordContainer>
            <UpdatePasswordTitle>Update Password</UpdatePasswordTitle>
            <UpdatePasswordSubtitle>Please enter your current password to continue</UpdatePasswordSubtitle>
            <UpdatePasswordInput type={'password'} value={ currentPassword } onChange={(e) => setCurrentPassword(e.target.value)} placeholder={'Current Password'} />
            <UpdatePasswordInput type={'password'} value={ newPassword } onChange={(e) => setNewPassword(e.target.value)} placeholder={'New Password'} />
            <UpdatePasswordInput type={'password'} value={ confirmNewPassword } onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder={'Confirm New Password'} />
            {showMsg &&
                <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
            }
            <Button onClick={() => handlePasswordUpdate()}>Update Password</Button>
        </UpdatePasswordContainer>
    )
}

export default UpdatePassword;