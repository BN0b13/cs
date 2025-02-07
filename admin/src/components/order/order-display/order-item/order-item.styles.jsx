import styled from 'styled-components';
import { setMobileView } from '../../../../tools/mobileView';

export const InvoiceItemRow = styled.tr`
    
`;

export const InvoiceItemData = styled.td`
    text-align: center;
    padding: ${setMobileView() ? '3px' : '8px'};
`;