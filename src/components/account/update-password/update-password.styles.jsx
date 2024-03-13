import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const UpdatePasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const UpdateInputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
`;

export const UpdatePasswordTitle = styled.h2`

`;

export const UpdatePasswordSubtitle = styled.h4`
    max-width: 80%;
    text-align: center;
`;

export const UpdatePasswordInput = styled.input`
    width: 280px;
    margin-bottom: 20px;
`;

export const PageBackLink = styled.h4`
    cursor: pointer;
    margin: 0 40px;
    display: ${setMobileView() ? 'none' : ''};
`;