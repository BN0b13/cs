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

export const CartInsuranceInput = styled.input`
`;

export const CartInsuranceLabel = styled.label`
    margin: 5px;
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
    background-color: ${props => props.theme.darkAccent || '#fff'};
    margin-top: 150px;
    color: ${props => props.theme.textSecondary || '#000'};
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

export const CheckoutRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: ${props => props.borderTop ? '1px solid darkgrey' : ''};
`;

export const CheckoutText = styled.h2`
    margin: 20px;
    font-size: ${setMobileView() ? '22px' : ''};
`;

export const CheckoutFieldset = styled.fieldset`
    margin: 10px;
    padding: 10px;
`;

export const CheckoutButton = styled.button`
min-width: ${setMobileView() ? '90px' : '105px'};
width: auto;
height: 40px;
letter-spacing: 0.5px;
padding: 0 25px 0 25px;
font-size: ${setMobileView() ? '10px' : '12px'};
background-color: black;
color: white;
text-transform: uppercase;
font-family: 'Open Sans Condensed';
font-weight: bolder;
border: 1px solid white;
border-radius: 1px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;

&:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
}
`;