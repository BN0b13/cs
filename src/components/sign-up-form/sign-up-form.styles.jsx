import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const SignUpFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    padding: 20px 0;
`;

export const SignUpFormButtonContainer = styled.div`
    margin: 20px 0;
    display: flex;
`;

export const SignUpFormForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SignUpFormInput = styled.input`
    width: 300px;
    margin: 5px 0;
    padding: 3px;
`;

export const SignUpFormLabel = styled.label`
    font-size: 12px;
`;

export const SignUpFormTitle = styled.h2`
    text-align: center;
`;

export const TermsContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 280px;
    margin: 20px 0;
`;

export const TermsText = styled.span`
    cursor: pointer;
`;

export const TermsCheckbox = styled.input`
    cursor: pointer;
    margin: 0 10px;
`;

export const Disclaimer = styled.p`
    font-size: 10px;
    max-width: 280px;
`;