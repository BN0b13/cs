import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const AccountPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
`;

export const RoutesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
