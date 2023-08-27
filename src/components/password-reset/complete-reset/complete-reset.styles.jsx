import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const CompleteResetContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px 0;
    color: ${props => props.theme.textSecondary};
`;

export const CompleteResetForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin: auto;
    padding: 20px 0;
`;

export const CompleteResetImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    width: 100px;
`;

export const CompleteResetTitle = styled.h2`
    
`;

export const CompleteResetText = styled.h4`
    
`;

export const CompleteResetImage = styled.img`
    height: 300px;
    width: 300px;
`;

export const CompleteResetInput = styled.input`
    margin: 10px 0;
    width: ${setMobileView() ? '280px' : '300px'};
`;