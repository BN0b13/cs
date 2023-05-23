import { convertProductPrice } from '../../../../tools/cart';
import { setMobileView } from '../../../../tools/mobileView';

import {
    OrderItemRow,
    OrderItemData
} from './order-item.styles';

const OrderItem = ({ product }) => {

    return (
        <OrderItemRow>
            <OrderItemData>{ product.name }</OrderItemData>
            {setMobileView() ?
                null
            :
                <OrderItemData>{ product.description }</OrderItemData>
            }
            <OrderItemData>{ product.quantity }</OrderItemData>
            <OrderItemData>{ convertProductPrice(product.quantity * product.price) }</OrderItemData>
        </OrderItemRow>
    )
}

export default OrderItem;