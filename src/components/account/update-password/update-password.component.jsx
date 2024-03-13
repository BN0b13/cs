import { useContext, useState } from 'react';

import {
    VscArrowLeft
} from "react-icons/vsc";

import Button from '../../reusable/button/button.component';

import { ToastContext } from '../../../contexts/toast.context.jsx';

import Client from '../../../tools/client.js';
import Tools from '../../../tools/tools.js';

import {
    PageBackLink,
    UpdateInputsContainer,
    UpdatePasswordContainer,
    UpdatePasswordTitle,
    UpdatePasswordSubtitle,
    UpdatePasswordInput
} from './update-password.styles';

const client = new Client();
const tools = new Tools();

const UpdatePassword = () => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');
    
    const { errorToast, successToast } = useContext(ToastContext);

    const handlePasswordUpdate = async () => {
        const data = {
            currentPassword,
            newPassword
        };

        const validateData = tools.validate(data);
        if(validateData.error) {
            errorToast(validateData.error);
            return
        }
        const res = await client.updateAccountPassword(data);

        if(res.success) {
            successToast(res.success);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            return
        }
        
        if(res.error) {
            errorToast(res.error);
            return
        }
    }

    return (
        <>
            <PageBackLink onClick={() => window.location.href = '/account'} title='Back To Account'><VscArrowLeft /> Back To Account</PageBackLink>
            <UpdatePasswordContainer>
                <UpdatePasswordTitle>Update Password</UpdatePasswordTitle>
                <UpdatePasswordSubtitle>Please enter your current password to continue</UpdatePasswordSubtitle>
                <UpdateInputsContainer  onKeyDown={(e) => e.key === 'Enter' ? handlePasswordUpdate() : ''}>
                    <UpdatePasswordInput type='password' name='password' value={ currentPassword } onChange={(e) => setCurrentPassword(e.target.value)} placeholder={'Current Password'} />
                    <UpdatePasswordInput type='password' name='newPassword' value={ newPassword } onChange={(e) => setNewPassword(e.target.value)} placeholder={'New Password'} />
                    <UpdatePasswordInput type='password' name='confirmPassword' value={ confirmNewPassword } onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder={'Confirm New Password'} />
                </UpdateInputsContainer>
                <Button onClick={() => handlePasswordUpdate()}>Update Password</Button>
            </UpdatePasswordContainer>
        </>
    )
}

export default UpdatePassword;