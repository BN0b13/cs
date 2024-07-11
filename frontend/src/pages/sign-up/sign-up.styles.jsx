import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const SignUpPageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => props.theme.backgroundOpacityDark};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
`;