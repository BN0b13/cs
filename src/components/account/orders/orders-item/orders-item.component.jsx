import { useContext } from 'react';
import dayjs from 'dayjs';

import { ConfigurationContext } from '../../../../contexts/configuration.context';

import { convertProductPrice } from '../../../../tools/cart';

import {
    DataText,
    OrdersItemRow,
    OrdersItemData
} from './orders-item.styles';

const OrderItem = ({ order }) => {
    const { colors } = useContext(ConfigurationContext);
    return (
        <OrdersItemRow theme={colors} onClick={() => window.location = `/account/orders/${order.refId}`}>
            <OrdersItemData theme={colors}><DataText>{ dayjs(order.createdAt).format('MM/DD/YY') }</DataText></OrdersItemData>
            <OrdersItemData theme={colors}><DataText>{ order.status.toUpperCase() }</DataText></OrdersItemData>
            <OrdersItemData theme={colors}><DataText>{ convertProductPrice(order.total) }</DataText></OrdersItemData>
        </OrdersItemRow>
)};

export default OrderItem;