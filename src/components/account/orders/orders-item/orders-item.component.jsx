import React from 'react';

import { convertProductPrice } from '../../../../tools/cart';

import {
    OrdersItemRow,
    OrdersItemData
} from './orders-item.styles';

const OrderItem = ({ order }) => {
    console.log('Order: ', order);

    return (
        <OrdersItemRow onClick={() => window.location = `/account/orders/${order.refId}`}>
            <OrdersItemData>{ order.createdAt }</OrdersItemData>
            <OrdersItemData>{ order.status.toUpperCase() }</OrdersItemData>
            <OrdersItemData>{ convertProductPrice(order.total) }</OrdersItemData>
        </OrdersItemRow>
    )
}

export default OrderItem;