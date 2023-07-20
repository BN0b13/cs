import styled from 'styled-components';

import {
    headerHeight
} from './styles/theme';

export const BackgroundImageContainer = styled.div`
    background-image: ${props => `url(${props.backgroundImage})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
`;

export const ContentContainer = styled.div`
    padding-top: ${headerHeight};
`;