import Tools from '../../../../tools/tools.js';

import {
    InvoiceItemRow,
    InvoiceItemData
} from './order-item.styles';

import {
    TableData,
    TableRow
} from '../../../../styles/component.styles.jsx';

const tools = new Tools();

const OrderItem = ({ product }) => {
    const inventory = product.product.Inventories.filter(item => item.id === product.inventoryId)[0];

    return (
        <TableRow>
            <TableData>{ product.product.name }</TableData>
            <TableData>{ product.quantity }</TableData>
            <TableData>{ tools.formatPrice(product.quantity * inventory.price) }</TableData>
        </TableRow>
    )
}

export default OrderItem;