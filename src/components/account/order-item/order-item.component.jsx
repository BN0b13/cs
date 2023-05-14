import React from 'react';

import {
    OrderItemContainer,
    OrderItemText
} from './order-item.styles';

const OrderItem = ({ order, orderIndex }) => {
    console.log('Order: ', order);

    return (
        <OrderItemContainer onClick={() => window.location = `/account/orders/${order.refId}`}>
            <OrderItemText>Order: { orderIndex }</OrderItemText>
            <OrderItemText>Reference: { order.refId }</OrderItemText>
            <OrderItemText>Date: { order.createdAt } </OrderItemText>
        </OrderItemContainer>
    )
}

export default OrderItem;