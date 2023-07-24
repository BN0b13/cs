import styled from 'styled-components';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const ThankYouContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
    max-width: 1000px;
`;

export const ThankYouTitle = styled.h1`

`;

export const ThankYouSubtitle = styled.h4`

`;

export const ThankYouText = styled.p`
    margin: 50px;
`;