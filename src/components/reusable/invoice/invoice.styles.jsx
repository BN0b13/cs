import styled from 'styled-components';

export const InvoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    padding: 5px;
`;

export const InvoiceDetailsContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.setMobileView ? 'column' : 'row'};
    justify-content: space-between;
    width: 100%;
    margin: 5px;
`;

export const InvoiceAddressesContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.setMobileView ? 'column' : 'row'};
    margin: 5px;
`;

export const InvoiceAddressContainer = styled.div`
    margin: 5px;
`;

export const InvoiceHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

export const InvoiceTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-top: 40px;
`;

export const InvoiceTotalItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid darkgrey;
    width: 250px;
    padding: 10px;
`;

export const TrackingContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 25px;
`;

export const TrackingSubtitle = styled.h4`
    margin: 0;
`;

export const TrackingText = styled.p`
    margin: 0;
    padding-left: 10px;
`;

export const InvoiceTitle = styled.h2`
    text-align: center;
`;

export const InvoiceSubtitle = styled.h4`
    text-align: start;
    margin-bottom: 5px;
`;

export const InvoiceText = styled.p`
    margin: 1px;
`;

export const InvoiceTable = styled.table`
    margin: 40px 0;
`;

export const InvoiceTableHead = styled.thead`

`;

export const InvoiceTableBody = styled.tbody`

`;

export const InvoiceTableRow = styled.tr`
    
`;

export const InvoiceTableHeading = styled.th`
    
`;