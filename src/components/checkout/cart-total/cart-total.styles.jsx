import styled from 'styled-components';

export const CartTotalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.mobileView ? 'center' : 'end'};
    width: 100%;
    margin-top: 0;
`;

export const CartDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.mobileView ? 'center' : 'end'};
    width: 330px;
    border-left: 1px solid darkgrey;
    border-bottom: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
    padding: 0;
`;

export const CartSubtotalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const CartSubtotalText = styled.h2`
    margin: 20px;
`;

export const CartShippingContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
`;

export const CartShippingText = styled.h2`
    margin: 20px;
`;

export const CartFinalTotalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const CartTotalText = styled.h2`
    margin: 20px;
`;