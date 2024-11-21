import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    
`;

export const OnOffIcon = styled.div`
    margin: auto;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: ${props => props.backgroundColor ? '' : '1px black solid'};
    background-color: ${props => props.backgroundColor ?? '#fff'};
`;

export const SalesTable = styled.table`
    border: 1px solid;
    border-collapse: collapse;
`;

export const SalesTableHeader = styled.thead`
    
`;

export const SalesTableHead = styled.th`
    padding: 8px;
    border: 1px solid;
`;

export const SalesTableBody = styled.tbody`
    
`;

export const SalesTableRow = styled.tr`
    border: 1px solid;
`;

export const SalesTableData = styled.td`
    padding: 8px;
    border: 1px solid;
`;