import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

import {
    backgroundOpacityPages,
    footerHeight,
    textColorLight
} from '../../../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:20px;
    position: static;
    background-color: ${backgroundOpacityPages};
    color: ${textColorLight};
    min-height: ${footerHeight};
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const DisclaimerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
`;

export const FooterText = styled.h4`
    font-size: ${setMobileView() ? '12px' : ''}
`;

export const DisclaimerText = styled.p`
    padding: 0px;
    margin: 2px;
    font-size: 8px;
    width: 50%;
`;