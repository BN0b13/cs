import Tools from '../../../../tools/tools.js';

import {
    InvoiceItemRow,
    InvoiceItemData
} from './order-item.styles';

const tools = new Tools();

const OrderItem = ({ product }) => {
    const inventory = product.product.Inventories.filter(item => item.id === product.inventoryId)[0];

    return (
        <InvoiceItemRow>
            <InvoiceItemData>{ product.product.name }</InvoiceItemData>
            <InvoiceItemData>{ product.quantity }</InvoiceItemData>
            <InvoiceItemData>{ tools.formatPrice(product.quantity * inventory.price) }</InvoiceItemData>
        </InvoiceItemRow>
    )
}

export default OrderItem;