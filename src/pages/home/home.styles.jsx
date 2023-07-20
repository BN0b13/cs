import styled from 'styled-components';

import {
    backgroundOpacityLight,
} from '../../styles/theme';

export const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${backgroundOpacityLight};
`;

export const WelcomePageBackSplash = styled.div`
    width: 100%;
`;