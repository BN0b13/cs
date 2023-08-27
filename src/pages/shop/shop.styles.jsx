import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const MainContainer = styled.div`
    padding: 10px;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
`;