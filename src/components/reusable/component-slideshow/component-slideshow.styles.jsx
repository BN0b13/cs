import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

import {
    componentSlideshowDimensions
} from '../../../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    color: #fff;
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
    padding: 0 30px;
    height: ${setMobileView() ? '320px' : '550px'};
`;

export const Content = styled.div`
    height: ${componentSlideshowDimensions};
    width: ${componentSlideshowDimensions};
    margin: 0 20px;
`;

export const ContentLink = styled.a`
    color: #fff;
    text-decoration: none;
`;