import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

import {
    componentSlideshowHeight,
    componentSlideshowWidth
} from '../../../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: auto;
    width: ${setMobileView() ? '100%' : '80%'};
    color: #fff;
    height: ${setMobileView() ? '360px' : '550px'};
`;

export const MainTitle = styled.h2`
    text-align: center;
    color: #fff;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: ${setMobileView ? '' : '0 30px'};
    height: 100%;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: ${componentSlideshowHeight};
    width: ${componentSlideshowWidth};
    margin: ${setMobileView ? '' : '0 20px'};
`;

export const ContentLink = styled.a`
    color: #fff;
    text-decoration: none;
`;