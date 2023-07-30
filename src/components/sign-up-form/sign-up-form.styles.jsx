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

export const TextContainer = styled.div`
    padding: ${setMobileView() ? '0 5px' : ''};
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

export const SignUpFormTitle = styled.h2`
    text-align: center;
`;

export const SignUpFormText = styled.p`
    text-align: center;
`;