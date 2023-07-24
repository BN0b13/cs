import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const SignUpPageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${setMobileView() ? '' : backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;