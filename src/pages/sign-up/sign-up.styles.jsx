import styled from 'styled-components';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const SignUpPageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    padding: 10px;
    min-height: ${bodyHeight};
`;