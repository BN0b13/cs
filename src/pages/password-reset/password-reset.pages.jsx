import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import InitiateReset from '../../components/password-reset/initiate-reset/initiate-reset.component';
import CompleteReset from '../../components/password-reset/complete-reset/complete-reset.component';

import {
    PasswordResetPageContainer
} from './password-reset.styles';

const PasswordResetPage = () => {

    return (
        <PasswordResetPageContainer>
            <Routes>
                <Route index element={<InitiateReset />} />
                <Route path=":token" element={<CompleteReset />} />
            </Routes>
        </PasswordResetPageContainer>
        
    );
};

export default PasswordResetPage;