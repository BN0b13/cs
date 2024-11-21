import { convertProductPrice } from '../../../../tools/cart';
import { setMobileView } from '../../../../tools/mobileView';

import {
    InvoiceItemRow,
    InvoiceItemData
} from './invoice-item.styles';

const InvoiceItem = ({ product }) => {
    const inventory = product.product[0].Inventories.filter(item => item.id === product.inventoryId)[0];

    return (
        <InvoiceItemRow>
            <InvoiceItemData>{ product.product[0].name }</InvoiceItemData>
            {setMobileView() ?
                null
            :
                <InvoiceItemData>{ product.product[0].description }</InvoiceItemData>
            }
            <InvoiceItemData>{ product.quantity }</InvoiceItemData>
            <InvoiceItemData>{ convertProductPrice(product.quantity * inventory.price) }</InvoiceItemData>
        </InvoiceItemRow>
    )
}

export default InvoiceItem;