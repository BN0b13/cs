import styled from 'styled-components';

import { headerHeight } from '../../../../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 1em;
    border-bottom: 1px solid #f4f4f4;
`;

export const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: #373a47;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const TitleText = styled.a`
    cursor: pointer;
    text-decoration: none;
    padding: 1em;
    color: ${props => props.theme.text};
`;

export const DropdownText = styled.p`
    cursor: pointer;
    text-decoration: none;
    padding: 0 2em;
    color: ${props => props.theme.text};
`;