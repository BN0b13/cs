import styled from 'styled-components';

import {
    backgroundOpacityDark,
    textColorLight
} from '../../styles/theme';

export const ThankYouContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${textColorLight};
    background-color: ${backgroundOpacityDark};
    max-width: 1000px;
    margin: auto;
    padding: 20px;
`;

export const ThankYouTitle = styled.h1`
    margin-bottom: 0;
`;

export const ThankYouSubtitle = styled.h4`

`;

export const ThankYouText = styled.p`
    max-width: 80%;
`;