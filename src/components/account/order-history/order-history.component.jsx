import { useEffect, useState } from 'react';

import OrderItem from '../order-item/order-item.component';

import Client from '../../../tools/client';

import {
    OrderHistoryContainer,
    OrderHistoryTitle
} from './order-history.styles';

const client = new Client();

const OrderHistory = () => {
    const [ orders, setOrders ] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            const res = await client.getOrders();
            setOrders(res.rows);
        }
        getOrders();
    }, []);

    return (
        <OrderHistoryContainer>
            <OrderHistoryTitle>Order History</OrderHistoryTitle>
            {orders &&
                orders.map((order, index) => (
                    <OrderItem key={index} orderIndex={index + 1} order={order} />
                ))
            }
        </OrderHistoryContainer>
    );
}

export default OrderHistory;