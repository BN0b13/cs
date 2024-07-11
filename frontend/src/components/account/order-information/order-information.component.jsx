import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import OrderItem from './order-item/order-item.component';
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';
import { convertProductPrice } from '../../../tools/cart';
import { setMobileView } from '../../../tools/mobileView';

import { UserContext } from '../../../contexts/user.context';

import {
    OrderInformationContainer,
    OrderInformationAddressesContainer,
    OrderInformationAddressContainer,
    OrderInformationDetailsContainer,
    OrderInformationHeaderContainer,
    OrderInformationTable,
    OrderInformationTableBody,
    OrderInformationTableHead,
    OrderInformationTableRow,
    OrderInformationTableHeading,
    OrderInformationText,
    OrderInformationTitle,
    OrderInformationTotalContainer,
    OrderInformationTotalItemContainer,
    OrderInformationSubtitle
} from './order-information.styles';

const client = new Client();

const OrderInformation = () => {
    const { refId } = useParams();
    const [ subtotal, setSubtotal ] = useState(null);
    const [ order, setOrder ] = useState(null);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getOrderByRef = async () => {
            const res = await client.getOrderByRef(refId);
            let subtotalCount = 0;
            res.products.map(item => subtotalCount = subtotalCount + (item.quantity * item.product[0].price));
            setSubtotal(subtotalCount);
            setOrder(res);
        }
        getOrderByRef();
    }, [ refId ]);

    return (
        <OrderInformationContainer>
            {!currentUser || !order ?
                <Spinner />
            :
                <>
                    <OrderInformationTitle>INVOICE PAID</OrderInformationTitle>
                    <OrderInformationHeaderContainer>
                        
                        
                        <OrderInformationDetailsContainer setMobileView={setMobileView()}>
                            <OrderInformationAddressContainer>
                                <OrderInformationSubtitle>{ dayjs(order.createdAt).format('MM/DD/YY') }</OrderInformationSubtitle>
                                <OrderInformationSubtitle>Status: { order.status.toUpperCase()}</OrderInformationSubtitle>
                                <OrderInformationSubtitle>Reference ID: { refId }</OrderInformationSubtitle>
                            </OrderInformationAddressContainer>
                            <OrderInformationAddressContainer>
                                <OrderInformationSubtitle>{ currentUser.firstName } { currentUser.lastName }</OrderInformationSubtitle>
                                <OrderInformationSubtitle>{ currentUser.email }</OrderInformationSubtitle>
                                <OrderInformationSubtitle>{ currentUser.phone }</OrderInformationSubtitle>
                            </OrderInformationAddressContainer>
                        </OrderInformationDetailsContainer>
                        <OrderInformationAddressesContainer setMobileView={setMobileView()}>
                            <OrderInformationAddressContainer>
                                <OrderInformationSubtitle>Billing</OrderInformationSubtitle>
                                <OrderInformationText>{ `${order.billingAddress.firstName} ${order.billingAddress.lastName}` }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.addressOne }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.addressTwo }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.city }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.state }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.zipCode }</OrderInformationText>
                            </OrderInformationAddressContainer>
                            <OrderInformationAddressContainer>
                            <OrderInformationSubtitle>Shipping</OrderInformationSubtitle>
                                <OrderInformationText>{ `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` }</OrderInformationText>
                                <OrderInformationText>{ order.shippingAddress.addressOne }</OrderInformationText>
                                <OrderInformationText>{ order.shippingAddress.addressTwo }</OrderInformationText>
                                <OrderInformationText>{ order.shippingAddress.city }</OrderInformationText>
                                <OrderInformationText>{ order.shippingAddress.state }</OrderInformationText>
                                <OrderInformationText>{ order.shippingAddress.zipCode }</OrderInformationText>
                            </OrderInformationAddressContainer>
                        </OrderInformationAddressesContainer>
                    </OrderInformationHeaderContainer>
                    <OrderInformationTable>
                        <OrderInformationTableHead>
                            <OrderInformationTableRow>
                                <OrderInformationTableHeading>Product</OrderInformationTableHeading>
                                {setMobileView() ?
                                    null
                                :
                                    <OrderInformationTableHeading>Description</OrderInformationTableHeading>
                                }
                                <OrderInformationTableHeading>Quantity</OrderInformationTableHeading>
                                <OrderInformationTableHeading>Price</OrderInformationTableHeading>
                            </OrderInformationTableRow>
                        </OrderInformationTableHead>
                        <OrderInformationTableBody>
                                {order.products.map((product, index) => (
                                    <OrderItem key={index} product={product} />
                                ))}
                        </OrderInformationTableBody>
                    </OrderInformationTable>
                    <OrderInformationTotalContainer>
                    <OrderInformationTotalItemContainer>
                        <OrderInformationText>Subtotal </OrderInformationText>
                            <OrderInformationText>{ convertProductPrice(subtotal) }</OrderInformationText>
                        </OrderInformationTotalItemContainer>
                        {order.deliveryInsurance &&
                            <OrderInformationTotalItemContainer>
                                <OrderInformationText>Delivery Insurance </OrderInformationText>
                                <OrderInformationText>{ convertProductPrice(order.deliveryInsuranceTotal) }</OrderInformationText>
                            </OrderInformationTotalItemContainer>
                        }
                        <OrderInformationTotalItemContainer>
                            <OrderInformationText>Shipping </OrderInformationText>
                            <OrderInformationText>{ convertProductPrice(order.shippingTotal) }</OrderInformationText>
                        </OrderInformationTotalItemContainer>
                        <OrderInformationTotalItemContainer>
                            <OrderInformationText>Total </OrderInformationText>
                            <OrderInformationText>{ convertProductPrice(order.total) }</OrderInformationText>
                        </OrderInformationTotalItemContainer>
                    </OrderInformationTotalContainer>
                </>
            }
            
        </OrderInformationContainer>
    );
}

export default OrderInformation;