import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const LoginPageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    color: ${props => props.theme.textSecondary};
    min-height: ${bodyHeight};
`;