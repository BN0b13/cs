import styled from 'styled-components';

import {
    backgroundOpacityDark,
    bodyHeight,
    textColorLight
} from '../../styles/theme';

export const DisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${backgroundOpacityDark};
    color: ${textColorLight};
    min-height: ${bodyHeight};
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.setMobileView ? 'column' : 'row'};
    justify-content: center;
    width: 100%;
`;

export const CheckoutFormsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 60%;
`;

export const AddressContainer = styled.div`
    
`;

export const ShippingContainer = styled.div`
    
`;

export const PaymentContainer = styled.div`
    
`;

export const BackButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
     margin-top: 20px;
`;

export const CheckoutPageTitle = styled.h1`
    
`;