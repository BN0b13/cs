import styled from 'styled-components';

export const CheckoutAddressContainer = styled.div`
    display: flex;
    flex-direction: ${params => params.mobileView ? 'column' : 'row'};
    justify-content: center;
    width: 100%;
    margin-top: 0;
    padding: 10px;
`;

export const CheckoutAddressesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: ${params => params.mobileView ? '100%' : '50%'};
`;

export const CartAddressTitle = styled.h1`

`;

export const CartAddressLabel = styled.label`

`;

export const CartAddressCheckbox = styled.input`

`;