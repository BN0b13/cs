import styled from 'styled-components';

import {
    backgroundOpacityLight,
    backgroundOpacityDark,
    textColorLight
} from '../../../styles/theme';

export const WelcomeContainer = styled.div`
    color: ${textColorLight};
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
    background-color: ${backgroundOpacityLight};
    padding: 5vh 0 5vh 0;
    width: 100%;
`;

export const WelcomeImageContainer = styled.div`
    min-height: 600px;
`;

export const WelcomeTextContainer = styled.div`
    margin-top: 5vh;
    padding: 10px;
    background-color: ${backgroundOpacityDark};
    width: 80%;
    text-align: center;
`;

export const WelcomeTitle = styled.h1`
`;

export const WelcomeSubtitle = styled.h2`
`;

export const WelcomeText = styled.h4`
`;