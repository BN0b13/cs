import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const ErrorPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
`;

export const ErrorPageTitle = styled.h1`
    margin-top: 40px;
`;

export const ErrorPageText = styled.h4`
    padding: 3px;
`;