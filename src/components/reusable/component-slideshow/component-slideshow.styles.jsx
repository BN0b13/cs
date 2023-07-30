import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

import {
    componentSlideshowDimensions
} from '../../../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: auto;
    width: 90%;
    color: #fff;
    height: ${setMobileView() ? '340px' : '550px'};
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
    height: 100%;
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