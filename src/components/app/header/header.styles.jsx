import styled from 'styled-components';

import { headerHeight } from '../../../styles/theme';

export const HeaderNav = styled.div`
    display: flex;
    justify-content: space-between;
    height: ${headerHeight};
    width: 100%;
    border-bottom: 1px solid black;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.text};
    position: fixed;
    z-index: 20;
`;

export const MobileHeaderNav = styled.div`
    height: ${headerHeight};
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    border-bottom: 1px solid black;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.text};
    position: fixed;
    z-index: 20;
`;

export const LogoContainer = styled.div`
    height: 100%;
    width: 80px;
    padding: auto;
    padding-left: 30px;
    text-align: center;
`;

export const LogoLink = styled.a`

`;

export const Logo = styled.img`
    height: 100%;
    ${props => props.theme.svg};
`;

export const NavOptionsDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
`;

export const NavOptionsMobileDiv = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;