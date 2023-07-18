import styled from 'styled-components';

export const HeaderNav = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

export const MobileHeaderNav = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    border-bottom: 1px solid black;
`;

export const LogoContainer = styled.div`
    height: 100%;
    width: 80px;
    padding: auto;
    text-align: center;
`;

export const LogoLink = styled.a`

`;

export const Logo = styled.img`
    height: 100%;
`;

export const NavOptionsDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const NavOptionsMobileDiv = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;