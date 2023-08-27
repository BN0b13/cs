import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const PasswordResetPageContainer = styled.div`
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
`;