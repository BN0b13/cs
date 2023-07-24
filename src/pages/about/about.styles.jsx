import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const AboutPageContainer = styled.div`
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
`;

export const AboutPageTitle = styled.h2`
    
`;

export const AboutPageText = styled.h4`
    width: ${setMobileView() ? '100%' : '60%'};
`;

export const AboutPageImage = styled.img`
    height: ${setMobileView() ? '220px' : '550px'};
    width: ${setMobileView() ? '200' : '500px'};
    border-radius: 50%;
    margin-top: 15px;
`;