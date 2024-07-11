import { convertProductPrice } from '../../../../tools/cart';
import { setMobileView } from '../../../../tools/mobileView';

import {
    OrderItemRow,
    OrderItemData
} from './order-item.styles';

const OrderItem = ({ product }) => {

    return (
        <OrderItemRow>
            <OrderItemData>{ product.product[0].name }</OrderItemData>
            {setMobileView() ?
                null
            :
                <OrderItemData>{ product.product[0].details.description }</OrderItemData>
            }
            <OrderItemData>{ product.quantity }</OrderItemData>
            <OrderItemData>{ convertProductPrice(product.quantity * product.product[0].price) }</OrderItemData>
        </OrderItemRow>
    )
}

export default OrderItem;