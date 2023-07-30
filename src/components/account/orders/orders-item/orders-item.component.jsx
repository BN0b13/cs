import React from 'react';
import dayjs from 'dayjs';

import { convertProductPrice } from '../../../../tools/cart';

import {
    DataText,
    OrdersItemRow,
    OrdersItemData
} from './orders-item.styles';

const OrderItem = ({ order }) => (
        <OrdersItemRow onClick={() => window.location = `/account/orders/${order.refId}`}>
            <OrdersItemData><DataText>{ dayjs(order.createdAt).format('MM/DD/YY') }</DataText></OrdersItemData>
            <OrdersItemData><DataText>{ order.status.toUpperCase() }</DataText></OrdersItemData>
            <OrdersItemData><DataText>{ convertProductPrice(order.total) }</DataText></OrdersItemData>
        </OrdersItemRow>
);

export default OrderItem;