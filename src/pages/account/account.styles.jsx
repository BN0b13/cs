import styled from 'styled-components';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const AccountPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;

export const RoutesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
