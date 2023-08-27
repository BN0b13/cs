import styled from 'styled-components';

import {
    headerHeight,
    slideshowDimensions
} from '../../../styles/theme';

export const WelcomeContainer = styled.div`
    color: ${props => props.theme.text};
    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
`;

export const WelcomeOpacity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    padding: 5vh 0 5vh 0;
    width: 100%;
`;

export const WelcomeImageContainer = styled.div`
    min-height: ${slideshowDimensions};
`;

export const WelcomeTextContainer = styled.div`
    margin-top: ${headerHeight};
    padding: 10px;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    width: 80%;
    text-align: center;
`;

export const WelcomeTitle = styled.h1`
`;

export const WelcomeSubtitle = styled.h2`
`;

export const WelcomeText = styled.h4`
`;