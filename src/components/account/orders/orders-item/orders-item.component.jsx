import React from 'react';
import dayjs from 'dayjs';

import { convertProductPrice } from '../../../../tools/cart';

import {
    OrdersItemRow,
    OrdersItemData
} from './orders-item.styles';

const OrderItem = ({ order }) => (
        <OrdersItemRow onClick={() => window.location = `/account/orders/${order.refId}`}>
            <OrdersItemData>{ dayjs(order.createdAt).format('MM/DD/YY') }</OrdersItemData>
            <OrdersItemData>{ order.status.toUpperCase() }</OrdersItemData>
            <OrdersItemData>{ convertProductPrice(order.total) }</OrdersItemData>
        </OrdersItemRow>
);

export default OrderItem;