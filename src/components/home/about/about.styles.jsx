import styled from "styled-components";

import {
    backgroundOpacityLight,
    textColorDark
} from '../../../styles/theme';

export const AboutContainer = styled.div`
    color: ${textColorDark};
    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
`;

export const AboutOpacity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${backgroundOpacityLight};
    padding: 5vh 0;
    width: 100%;
    height: 100%;
    text-align: center;
`;

export const AboutTextContainer = styled.div`
    width: 80%;
`;

export const AboutTitle = styled.h2`

`;

export const AboutText = styled.h4`

`;

export const AboutImage = styled.img`

`;