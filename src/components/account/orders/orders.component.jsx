import { useEffect, useState } from 'react';

import OrdersItem from './orders-item/orders-item.component';

import Client from '../../../tools/client';

import {
    OrdersContainer,
    OrderTable,
    OrderTableHead,
    OrderTableRow,
    OrderTableHeading,
    OrdersTitle
} from './orders.styles';

const client = new Client();

const Orders = () => {
    const [ orders, setOrders ] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            const res = await client.getOrders();
            setOrders(res.rows);
        }
        getOrders();
    }, []);

    return (
        <OrdersContainer>
            <OrdersTitle>Orders</OrdersTitle>
            <OrderTable>
                <OrderTableHead>
                    <OrderTableRow>
                        <OrderTableHeading>Date</OrderTableHeading>
                        <OrderTableHeading>Status</OrderTableHeading>
                        <OrderTableHeading>Total</OrderTableHeading>
                    </OrderTableRow>
                </OrderTableHead>
                <tbody>
                    {orders &&
                        orders.map((order, index) => (
                            <OrdersItem key={index} order={order} />
                        ))
                    }
                </tbody>
            </OrderTable>
        </OrdersContainer>
    );
}

export default Orders;