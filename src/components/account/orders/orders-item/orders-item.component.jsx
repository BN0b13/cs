import React from 'react';
import dayjs from 'dayjs';

import { convertProductPrice } from '../../../../tools/cart';

import {
    OrdersItemRow,
    OrdersItemData
} from './orders-item.styles';

const OrderItem = ({ order }) => {
    const readableDate = dayjs(order.createdAt).format('MM/DD/YY');

    return (
        <OrdersItemRow onClick={() => window.location = `/account/orders/${order.refId}`}>
            <OrdersItemData>{ order.status.toUpperCase() }</OrdersItemData>
            <OrdersItemData>{ convertProductPrice(order.total) }</OrdersItemData>
            <OrdersItemData>{ readableDate }</OrdersItemData>
        </OrdersItemRow>
    )
}

export default OrderItem;