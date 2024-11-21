import styled from 'styled-components';

import { headerHeight } from '../../../../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DropdownContainer = styled.div`
    position: absolute;
    top: ${headerHeight};
    display: ${props => props.showDropdown ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: #000;
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
    padding: 1em;
    color: ${props => props.theme.text};
`;