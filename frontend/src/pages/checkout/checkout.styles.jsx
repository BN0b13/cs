import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

import { bodyHeight } from '../../styles/theme';

export const DisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: 'center';
    justify-content: ${setMobileView() ? 'center' : ''};
    width: '100%';
    background-color: ${props => `rgba(${props.theme.backgroundOpacityDark})`};
    color: ${props => props.theme.text};
    min-height: ${bodyHeight};
    padding: 10px;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${setMobileView() ? 'column' : 'row'};
    align-items: ${setMobileView() ? 'center' : ''};
    justify-content: center;
    width: 100%;
`;

export const CheckoutFormsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: ${setMobileView() ? '100%' : '60%'};
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
`;

export const CheckoutPageTitle = styled.h1`
    
`;