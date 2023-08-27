import styled from 'styled-components';

import { bodyHeight } from '../../styles/theme';

export const ContactPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
`;
export const ContactPageTitle = styled.h1`
    margin: 5px;
    padding: 3px;
`;