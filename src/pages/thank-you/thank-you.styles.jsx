import styled from 'styled-components';

import {
    backgroundOpacityLight,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const ThankYouContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${backgroundOpacityLight};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;

export const ThankYouTitle = styled.h1`

`;

export const ThankYouSubtitle = styled.h4`

`;

export const ThankYouText = styled.p`
    margin: 50px;
`;