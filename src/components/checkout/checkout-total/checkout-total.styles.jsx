import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const CheckoutTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: ${setMobileView() ? '10px' : '40px'};
    color: ${props => props.theme.text}
`;

export const CartInsuranceContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

export const SquareContainer = styled.div`
    margin: 20px;
`;

export const CartInsuranceInput = styled.input`
`;

export const CartInsuranceLabel = styled.label`

`;

export const InsuranceInfoText = styled.small`
    margin: 20px;
`;

export const InsuranceInfoContainer = styled.div`
    width: 200px;
    height: auto;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    z-index: 5;
    position: absolute;
    background-color: ${props => props.theme.darkAccent};
    margin-top: 150px;
    color: ${props => props.theme.textSecondary};
`;

export const InsuranceInfoCloseContainer = styled.div`
    display: flex;
    justify-content: end;
    padding: 5px;
`;

export const CartDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${setMobileView() ? 'center' : 'end'};
    width: ${setMobileView() ? '100%' : '350px'};
    border: 1px solid darkgrey;
    padding: 0;
    margin-bottom: 20px;
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

export const CheckoutTotalText = styled.h2`
    margin: 20px;
`;