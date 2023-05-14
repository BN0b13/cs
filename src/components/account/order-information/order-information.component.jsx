import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Client from '../../../tools/client';

import {
    OrderInformationContainer,
    OrderInformationTitle
} from './order-information.styles';

const client = new Client();

const OrderInformation = () => {
    const { refId } = useParams();
    const [ order, setOrder ] = useState(null);

    useEffect(() => {
        const getOrderByRef = async () => {
            const res = await client.getOrderByRef(refId);
            console.log('Order res: ', res.rows[0]);
            setOrder(res.rows[0]);
        }
        getOrderByRef();
    }, []);

    return (
        <OrderInformationContainer>
            <OrderInformationTitle>Order Information</OrderInformationTitle>
            
        </OrderInformationContainer>
    );
}

export default OrderInformation;