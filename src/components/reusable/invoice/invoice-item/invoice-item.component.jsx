import { convertProductPrice } from '../../../../tools/cart';
import { setMobileView } from '../../../../tools/mobileView';

import {
    InvoiceItemRow,
    InvoiceItemData
} from './invoice-item.styles';

const InvoiceItem = ({ product }) => {

    return (
        <InvoiceItemRow>
            <InvoiceItemData>{ product.product[0].name }</InvoiceItemData>
            {setMobileView() ?
                null
            :
                <InvoiceItemData>{ product.product[0].description }</InvoiceItemData>
            }
            <InvoiceItemData>{ product.quantity }</InvoiceItemData>
            <InvoiceItemData>{ convertProductPrice(product.quantity * product.product[0].Inventories[0].price) }</InvoiceItemData>
        </InvoiceItemRow>
    )
}

export default InvoiceItem;