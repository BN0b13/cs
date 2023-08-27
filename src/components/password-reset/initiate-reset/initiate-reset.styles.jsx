import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const InitiateResetContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
    color: ${props => props.theme.textSecondary};
`;

export const InitiateResetForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${setMobileView() ? '100%' : '300px'};
    padding: 20px 0;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    width: 100px;
    padding: 30px 0;
`;

export const InitiateResetTitle = styled.h2`

`;

export const InitiateResetInput = styled.input`
    margin: 20px 0;
    min-width: 250px;
`;