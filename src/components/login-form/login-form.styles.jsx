import styled from 'styled-components';

import {
    slideshowDimensions
} from '../../styles/theme';

export const LoginFormButtonContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: colum;
    justify-content: space-between;
`;

export const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 360px;
`;

export const LoginFormErrorContainer = styled.div`

`;

export const LoginFormForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

export const LoginFormInput = styled.input`
    margin: 5px;
    width: 250px;
`;

export const LoginFormLogo = styled.img`
    height: 300px;
    width: 300px;
`;

export const LoginFormText = styled.h6`
    cursor: pointer;
`;