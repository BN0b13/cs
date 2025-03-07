import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MainTitle = styled.h2`

`;

export const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 100%;
`;

export const TabSelector = styled.button`
    background-color: ${props => props.active ? '#ccc' : 'inherit'};
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    width: 100%;

    :hover {
        background-color: ${props => props.active ? '#ccc' :'#ddd'};
    }
`;

export const MediasTitle = styled.h2`
    text-align: center;
    margin: 20px;
`;

export const MediasTable = styled.table`
    margin-top: 40px;
    border: 1px solid;
    border-collapse: collapse;
`;

export const MediasTableHeader = styled.thead`
    
`;

export const MediasTableHead = styled.th`
    padding: 8px;
    border: 1px solid;
`;

export const MediasTableBody = styled.tbody`
    
`;

export const MediasTableRow = styled.tr`
    border: 1px solid;
    cursor: pointer;
`;

export const MediasTableData = styled.td`
padding: 8px;
border: 1px solid;
`;