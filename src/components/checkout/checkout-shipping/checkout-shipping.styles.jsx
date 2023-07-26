import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const CheckoutShippingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${setMobileView() ? 'center' : ''}
    width: 100%;
    margin-top: 0;
    padding: 10px;
`;

export const CheckoutShippingOptionsContainer = styled.div`
    display: flex;
    flex-direction: row
    height: 200px;
    max-width: ${setMobileView ? '90%' : '45vw'};
    margin: 10px;
`;

export const CheckoutShippingTitle = styled.h1`
    text-align: ${setMobileView() ? 'center' : ''};
`;

export const CheckoutShippingText = styled.p`
    padding: 10px;
`;

export const CheckoutShippingInput = styled.input`
    margin: 5px;
`;