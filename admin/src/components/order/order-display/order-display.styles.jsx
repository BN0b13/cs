import styled from 'styled-components';
import { setMobileView } from '../../../tools/mobileView';

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const InvoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: auto;
    width: 800px;
`;

export const AccountDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const PrintContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: ${setMobileView() ? '300px' : '80%'};
    margin: auto;
    padding-top: ${setMobileView() ? '10px' : '30px'};
    cursor: pointer;
`;

export const InvoiceDetailsContainer = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    width: 100%;
    margin: 5px;
`;

export const InvoiceAddressesContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px;
`;

export const InvoiceAddressContainer = styled.div`
    margin: ${setMobileView() ? '10px' : '5px'};
`;

export const InvoiceHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const InvoiceTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-top: ${setMobileView() ? '10px' : '30px'};
    border: 1px solid black;
    width: ${setMobileView() ? '300px' : ''};
`;

export const InvoiceTotalItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: ${setMobileView() ? '300px' : '250px'};
    padding: 10px 0;
    border-bottom: ${props => props.borderBottom ?? '1px solid black'};
`;

export const TrackingContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 25px;
`;

export const TrackingSubtitle = styled.h4`
    margin: 0;
    font-size: ${setMobileView() ? '12px' : ''};
`;

export const TrackingText = styled.p`
    margin: 0;
    padding-left: 10px;
    font-size: ${setMobileView() ? '12px' : ''};
`;

export const InvoiceTitle = styled.h2`
    text-align: center;
    font-size: ${setMobileView() ? '16px' : ''};
`;

export const InvoiceSubtitle = styled.h4`
    text-align: start;
    margin-bottom: 5px;
    font-size: ${setMobileView() ? '12px' : ''};
`;

export const InvoiceText = styled.p`
    margin: 5px;
    padding: 0 5px;
    font-size: ${setMobileView() ? '12px' : ''};
`;