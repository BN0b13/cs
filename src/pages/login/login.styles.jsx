import styled from 'styled-components';

import {
    backgroundOpacityLight,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const LoginPageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${backgroundOpacityLight};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;