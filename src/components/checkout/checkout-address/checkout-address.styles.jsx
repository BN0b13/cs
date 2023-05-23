import styled from 'styled-components';

export const CheckoutAddressContainer = styled.div`
    display: flex;
    flex-direction: ${params => params.setMobileView ? 'column' : 'row'};
    justify-content: center;
    width: 100%;
    padding: 10px;
`;

export const CheckoutAddressesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: ${params => params.setMobileView ? '100%' : '50%'};
    margin: 10px;
`;

export const CartAddressTitle = styled.h1`

`;

export const CartAddressLabel = styled.label`
    margin-top: 20px;
`;

export const CartAddressCheckbox = styled.input`

`;