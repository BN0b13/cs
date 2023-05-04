import styled from 'styled-components';

export const CartPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CartPageTitle = styled.h1`
    
`;

export const CartInformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const CartInformation = styled.div`
    display: flex;
    width: 70%;
    padding: 0;
`;

export const CartTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: end;
    width: 30%;
    border: 1px solid darkgrey;
    padding: 0;
`;

export const CartSubtotal = styled.h2`
`;

export const CartShipping = styled.h2`
    border-bottom: 1px solid darkgrey;
`;

export const CartTotal = styled.h2`
`;

export const CartPageEmpty = styled.h4`
    
`;