import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { setMobileView } from '../../tools/mobileView';

export const MainContainer = styled.div`
    
`;

export const GiveawaysLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.theme.text};
    margin: auto;
`;

export const GiveawaysActiveContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    column-gap: 20px;
    row-gap: 50px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    color: ${props => props.theme.textSecondary};
`;

export const GiveawaysCompletedContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    column-gap: 20px;
    row-gap: 50px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
`;

export const GiveawaysActiveContainerMobile = styled.div`
    display: grid;
    grid-template-row: repeat(1fr);
    row-gap: 20px;
    padding: 10px;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityLight})`};
    color: ${props => props.theme.textSecondary};
`;

export const GiveawaysCompletedContainerMobile = styled.div`
    display: grid;
    grid-template-row: repeat(1fr);
    row-gap: 20px;
    padding: 10px;
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
`;

export const GiveawaysMainTitle = styled.h2`
    color: #fff;
    text-align: center;
`;

export const GiveawaysTitle = styled.h4`
    text-align: start;
    margin-top: 10px;
`;