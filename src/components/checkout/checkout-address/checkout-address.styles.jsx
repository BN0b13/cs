import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const CheckoutAddressContainer = styled.div`
    display: flex;
    flex-direction: ${setMobileView() ? 'column' : 'row'};
    justify-content: center;
    align-items: ${setMobileView() ? 'center' : ''};
    width: 100%;
    padding: ${setMobileView() ? '0px' : '10px'};
`;

export const CheckoutAddressesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${setMobileView() ? 'center' : ''};
    width: ${setMobileView() ? '100%' : '50%'};
    margin: 10px;
`;

export const CartAddressTitle = styled.h1`

`;

export const CartAddressLabel = styled.label`
    margin-top: 20px;
`;

export const CartAddressCheckbox = styled.input`

`;