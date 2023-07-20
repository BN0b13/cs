import styled from 'styled-components';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const MainContainer = styled.div`
    padding: 10px;
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;