import styled from 'styled-components';

import {
    textColorLight
} from '../../styles/theme';

export const ThankYouContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${textColorLight};
`;

export const ThankYouTitle = styled.h1`
    margin-bottom: 0;
`;

export const ThankYouSubtitle = styled.h4`

`;

export const ThankYouText = styled.p`
    max-width: 80%;
`;