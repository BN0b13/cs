import React from 'react';

import {
    OrderItemContainer,
    OrderItemText
} from './order-item.styles';

const OrderItem = () => {
    console.log('Order: ', order);

    return (
        <OrderItemContainer>
            <OrderItemText>Order Item</OrderItemText>
        </OrderItemContainer>
    )
}

export default OrderItem;