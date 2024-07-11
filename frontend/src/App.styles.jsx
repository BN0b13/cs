import styled from 'styled-components';

import {
    headerHeight
} from './styles/theme';

export const MainContainer = styled.div`
    
`;

export const AppLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.9);
`;

export const BackgroundImageContainer = styled.div`
    background-image: ${props => `url(${props.backgroundImage})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
`;

export const ContentContainer = styled.div`
    padding-top: ${headerHeight};
`;