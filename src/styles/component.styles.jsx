import styled from 'styled-components';

import { setMobileView } from '../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    margin-left: ${props => props.marginLeft ? props.marginLeft : ''};
    margin: ${props => props.margin ? props.margin : ''};
    padding: ${props => props.padding ? props.padding : ''};
    cursor: ${props => props.cursor ? props.cursor : ''};
    width: ${props => props.width ? props.width : ''};
    max-width: ${props => props.maxWidth ? props.maxWidth : ''};
    border: ${props => props.border ? props.border : ''};
    border-bottom: ${props => props.borderBottom ? props.borderBottom : ''};
`;

export const Title = styled.h2`

`;

export const Text = styled.h4`
    text-align: ${props => props.textAlign ? props.textAlign : ''}
`;

export const Link = styled.h4`
    cursor: pointer;
`;

export const Subtext = styled.h6`
    
`;

export const InputSubtext = styled.h6`
    max-width: ${setMobileView() ? '270px' : '280px'};
    padding: 0;
    margin: 1px 0;
`;

export const Input = styled.input`
    width: ${setMobileView() ? '260px' : '300px'};
    margin-bottom: 10px;
`;

export const Select = styled.select`

`;

export const Option = styled.option`

`;

export const Textarea = styled.textarea`
    height: 300px;
    width: 280px;
    margin-bottom: 10px;
`;

export const Image = styled.img`
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
`;

export const CategoryTable = styled.table`
    border: 1px solid;
    border-collapse: collapse;
`;

export const Table = styled.table`
    
`;

export const TableHeader = styled.thead`
    
`;

export const TableHead = styled.th`
    padding: 8px;
    border: 1px solid;
`;

export const TableBody = styled.tbody`
    
`;

export const TableRow = styled.tr`
    border: 1px solid;
`;

export const TableData = styled.td`
    padding: 8px;
    border: 1px solid;
`;

export const TableDataLink = styled.td`
    padding: 8px;
    border: 1px solid;
    cursor: pointer;
`;

export const Logo = styled.img`
    height: 200px;
    width: 200px;
`;