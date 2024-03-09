import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CompanyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

export const GiveawayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CompanyRowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Title = styled.h2`
    text-align: center;
`;

export const Subtitle = styled.h3`
    text-align: center;
`;

export const Text = styled.h4`
    text-align: center;
    width: 100%;
`;

export const Link = styled.h4`
    cursor: pointer;
`;

export const Subtext = styled.h6`

`;

export const Logo = styled.img`
    height: 300px;
    width: 300px;
`;