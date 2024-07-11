import { useContext, useEffect, useState } from 'react';

import OrdersItem from './orders-item/orders-item.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ConfigurationContext } from '../../../contexts/configuration.context';

import Client from '../../../tools/client';

import {
    OrdersContainer,
    OrderTable,
    OrderTableBody,
    OrderTableHead,
    OrderTableRow,
    OrderTableHeading,
    OrdersText,
    OrdersTitle
} from './orders.styles';

const client = new Client();

const Orders = () => {
    const [ orders, setOrders ] = useState(null);

    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        const getOrders = async () => {
            const res = await client.getOrders();
            setOrders(res.rows);
        }
        getOrders();
    }, []);

    return (
        <OrdersContainer>
            <OrdersTitle>Order History</OrdersTitle>
            {!orders ?
                <Spinner />
            :
                orders.length === 0 ?
                    <OrdersText>No Orders To Display</OrdersText>
                :
                    <OrderTable theme={colors}>
                        <OrderTableHead theme={colors}>
                            <OrderTableRow theme={colors}>
                                <OrderTableHeading theme={colors}>Date</OrderTableHeading>
                                <OrderTableHeading theme={colors}>Status</OrderTableHeading>
                                <OrderTableHeading theme={colors}>Total</OrderTableHeading>
                            </OrderTableRow>
                        </OrderTableHead>
                        <OrderTableBody>
                            {orders &&
                                orders.map((order, index) => (
                                    <OrdersItem key={index} order={order} />
                                ))
                            }
                        </OrderTableBody>
                    </OrderTable>
            }
        </OrdersContainer>
    );
}

export default Orders;