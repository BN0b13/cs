import styled from 'styled-components';

export const OrderInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    padding: 5px;
`;

export const OrderInformationDetailsContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.setMobileView ? 'column' : 'row'};
    justify-content: space-between;
    width: 100%;
    margin: 5px;
`;

export const OrderInformationAddressesContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.setMobileView ? 'column' : 'row'};
    margin: 5px;
`;

export const OrderInformationAddressContainer = styled.div`
    margin: 5px;
`;

export const OrderInformationHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

export const OrderInformationTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-top: 40px;
`;

export const OrderInformationTotalItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid darkgrey;
    width: 250px;
    padding: 10px;
`;

export const OrderInformationTitle = styled.h2`
    text-align: center;
`;

export const OrderInformationSubtitle = styled.h4`
    text-align: start;
    margin-bottom: 5px;
`;

export const OrderInformationText = styled.p`
    margin: 1px;
`;

export const OrderInformationTable = styled.table`
    margin: 40px 0;
`;

export const OrderInformationTableHead = styled.thead`

`;

export const OrderInformationTableBody = styled.tbody`

`;

export const OrderInformationTableRow = styled.tr`
    
`;

export const OrderInformationTableHeading = styled.th`
    
`;