import styled from 'styled-components';

export const CartTotalContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.mobileView ? 'column' : 'row'};
    justify-content: width: ${props => props.mobileView ? 'center' : 'space-between'};
    width: 100%;
    margin-top: 0;
`;

export const CartInsuranceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: ${props => props.mobileView ? '10px' : 'auto'};
    width: 100%;
`;

export const CartInsuranceInput = styled.input`
`;

export const CartInsuranceLabel = styled.label`
`;

export const CartDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.mobileView ? 'center' : 'end'};
    width: 330px;
    border: 1px solid darkgrey;
    padding: 0;
    width: 100%;
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

export const CartInsuranceTotalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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