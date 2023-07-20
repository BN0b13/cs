import styled from 'styled-components';

import {
    backgroundOpacityLight,
    bodyHeight,
    textColorDark
} from '../../styles/theme';

export const LoginPageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${backgroundOpacityLight};
    color: ${textColorDark};
    min-height: ${bodyHeight};
`;