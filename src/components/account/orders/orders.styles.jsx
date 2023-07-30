import styled from 'styled-components';

import {
    textColorLight
} from '../../../styles/theme';

export const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const OrdersTitle = styled.h2`
    text-align: center;
    margin: 30px 0;
`;

export const OrdersText = styled.h4`
    text-align: center;
    margin-top: 60px;
`;

export const OrderTable = styled.table`
    border: 1px solid ${textColorLight};
    border-collapse: collapse;
    text-align: center;
`;

export const OrderTableHead = styled.thead`
    padding: 12px 8px;
    border: 1px solid ${textColorLight};
`;

export const OrderTableBody = styled.tbody`

`;

export const OrderTableRow = styled.tr`
    padding: 12px 8px;
    border: 1px solid ${textColorLight};
`;

export const OrderTableHeading = styled.th`
    padding: 12px 8px;
    border: 1px solid ${textColorLight};
`;