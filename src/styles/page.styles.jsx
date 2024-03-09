import styled from 'styled-components';

import { bodyHeight } from '../styles/theme';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme ? `rgba(${props.theme.backgroundOpacityLight})` : ''};
    color: ${props => props.them ? props.theme.textSecondary : ''};
    min-height: ${bodyHeight};
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ContentContainerLight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    color: ${props => props.theme.textSecondary};
    min-height: ${props => props.minHeight ? bodyHeight : ''};
`;

export const ContentContainerDark = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${props => props.minHeight ? bodyHeight : ''};
`;

export const WordBreakContainer = styled.div`
    max-width: 300px;
    word-break: break-all;
    text-wrap: wrap;
`;

export const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
`;

export const TabSelector = styled.button`
    background-color: ${props => props.active ? '#ccc' : 'inherit'};
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    width: 100%;

    :hover {
        background-color: ${props => props.active ? '#ccc' :'#ddd'};
    }
`;

export const MainTitle = styled.h2`
    text-align: center;
`;

export const BackLink = styled.h4`
  cursor: pointer;
`;

export const Text = styled.h4`

`;