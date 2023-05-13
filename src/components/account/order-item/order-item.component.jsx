import React from 'react';

import {
    OrderItemContainer,
    OrderItemText
} from './order-item.styles';

const OrderItem = ({ orderNumber, order }) => {
    console.log('Order: ', order);

    return (
        <OrderItemContainer>
            <OrderItemText>Order: {orderNumber}</OrderItemText>
            <OrderItemText>Order Reference: {order.refId}</OrderItemText>
            <OrderItemText>Date {order.createdAt}</OrderItemText>
        </OrderItemContainer>
    )
}

export default OrderItem;