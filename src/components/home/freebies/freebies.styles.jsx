import styled from "styled-components";

import { setMobileView } from "../../../tools/mobileView";

export const AboutContainer = styled.div`
    color: ${props => props.theme.text};
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
    background-color: rgba(${props => props.theme.backgroundOpacityLight});
    padding: 5vh 0;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 3px;
`;

export const AboutTextContainer = styled.div`
    width: 80%;
    background-color: rgba(${props => props.theme.backgroundOpacityDark});
    margin: 20px 0;
    padding 20px;
    border-radius: 3px;
`;

export const AboutTitle = styled.h2`

`;

export const AboutText = styled.h4`

`;

export const AboutImage = styled.img`
    height: ${setMobileView() ? '220px' : '330px'};
    width: ${setMobileView() ? '200px' : '300px'};
    border-radius: 50%;
    margin-top: 15px;
`;