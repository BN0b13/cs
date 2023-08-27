import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

import { bodyHeight } from '../../styles/theme';

export const AboutPageContainer = styled.div`
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
    padding-bottom: 40px;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
`;

export const ContentTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${ props => props.topContainer ? '0' : '40px'};
    width: ${setMobileView() ? '100%' : '60%'};
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 30px;
`;

export const AboutPageTitle = styled.h2`
    
`;

export const AboutPageTextBold = styled.span`
    font-weight: bold;
    font-size: ${setMobileView() ? '22px' : '28px'};
    margin-right: 5px;
`;

export const AboutPageText = styled.h4`
    
`;

export const AboutPageImage = styled.img`
    height: ${setMobileView() ? '220px' : '550px'};
    width: ${setMobileView() ? '200' : '500px'};
    border-radius: 50%;
    margin-top: 15px;
`;