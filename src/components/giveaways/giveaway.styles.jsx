import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: ${setMobileView() ? '280px' : '750px'};
`;

export const CompanyContainer = styled.div`
    display: flex;
    flex-direction: ${setMobileView() ? 'column' : 'row'};
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const CompanyDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${setMobileView() ? '90%' : '60%'};
    max-width: ${setMobileView() ? '280px' : '400px'};
`;

export const CompanyLogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${setMobileView() ? '90%' : '40%'};
`;

export const GiveawayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: ${setMobileView() ? '300px' : '750px'};
`;

export const CompanyRowContainer = styled.div`
    display: flex;
    flex-direction: 'row;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    width: ${props => props.width ? props.width : ''};
    margin: ${props => props.margin ? props.margin : ''};
`;

export const GiveawayButtonContainer = styled.div`
    margin: 20px;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: ${setMobileView() ? '20px' : ''};
`;

export const Subtitle = styled.h3`
    text-align: center;
    font-size: ${setMobileView() ? '18px' : ''};
`;

export const Text = styled.h4`
    text-align: center;
    width: 100%;
    font-size: ${setMobileView() ? '16px' : ''};
    margin: ${props => props.margin ? props.margin : ''};
`;

export const Disclaimer = styled.h5`
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: ${setMobileView() ? '12px' : ''};
    margin: 10px 0;
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

export const WebsiteLink = styled.a`
    text-decoration: none;
`;