import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import dayjs from 'dayjs';

import {
    FaEdit,
    FaPrint
} from 'react-icons/fa';

import OrderItem from './order-item/order-item.component';

import Tools from '../../../tools/tools.js';

import {
    AccountDetailsContainer,
    InvoiceContainer,
    InvoiceAddressesContainer,
    InvoiceAddressContainer,
    InvoiceHeaderContainer,
    InvoiceTable,
    InvoiceTableBody,
    InvoiceTableHead,
    InvoiceTableRow,
    InvoiceTableHeading,
    InvoiceText,
    InvoiceTotalContainer,
    InvoiceTotalItemContainer,
    InvoiceSubtitle,
    PrintContainer,
    TrackingContainer,
    TrackingSubtitle,
    TrackingText
} from './order-display.styles';

import {
    ColumnContainer,
    ContentContainer,
    MainContainer,
    Text
} from '../../../styles/component.styles.jsx';

const tools = new Tools();

const OrderDisplay = ({ user, order, products, showUpdate }) => {
    const componentRef = useRef();
    const [ subtotal, setSubtotal ] = useState('');

    useEffect(() => {
        let subtotalCount = 0;
        products.map(product => {
            const inventory = product.product.Inventories.filter(item => item.id === product.inventoryId)[0];
            subtotalCount = subtotalCount + (product.quantity * inventory.price);
        });
        setSubtotal(subtotalCount);
    }, []);

    

    return (
        <MainContainer>
            <>
                <PrintContainer>
                    <FaEdit onClick={() => showUpdate(true)} style={{ fontSize: '28px'}} />
                    <ReactToPrint
                        trigger={() => <FaPrint style={{ fontSize: '28px'}} />}
                        content={() => componentRef.current}
                    />
                </PrintContainer>
                <AccountDetailsContainer onClick={() => window.location.href = `/accounts/${user.id}`}>
                    <InvoiceSubtitle>{user.firstName} {user.lastName}</InvoiceSubtitle>
                    <InvoiceSubtitle>{user.email}</InvoiceSubtitle>
                    <InvoiceSubtitle>{user.phone}</InvoiceSubtitle>
                </AccountDetailsContainer>
                <InvoiceContainer ref={componentRef}>
                    <InvoiceHeaderContainer>
                                
                        <ColumnContainer>
                            <InvoiceAddressContainer>
                                <InvoiceSubtitle>{ dayjs(order.createdAt).format('MM/DD/YY') }</InvoiceSubtitle>
                                <InvoiceSubtitle>Status: { order.status.toUpperCase()}</InvoiceSubtitle>
                                <InvoiceSubtitle>Reference ID: { order.refId }</InvoiceSubtitle>
                                <InvoiceSubtitle>Payment Type: { order.paymentType ? order.paymentType : 'Card' }</InvoiceSubtitle>
                                <TrackingContainer>
                                    <TrackingSubtitle>Tracking: </TrackingSubtitle>
                                    { order.tracking ? 
                                        <TrackingText>{ order.tracking }</TrackingText>
                                    : 
                                        <TrackingText>Available once order has shipped</TrackingText>
                                    }
                                </TrackingContainer>
                            </InvoiceAddressContainer>
                            <InvoiceAddressContainer>
                            </InvoiceAddressContainer>
                        </ColumnContainer>
                        <InvoiceAddressesContainer>
                            <InvoiceAddressContainer>
                                <InvoiceSubtitle>Billing</InvoiceSubtitle>
                                <InvoiceText>{ `${order.billingAddress.firstName} ${order.billingAddress.lastName}` }</InvoiceText>
                                <InvoiceText>{ order.billingAddress.addressOne }</InvoiceText>
                                <InvoiceText>{ order.billingAddress.addressTwo }</InvoiceText>
                                <InvoiceText>{ order.billingAddress.city }</InvoiceText>
                                <InvoiceText>{ order.billingAddress.state }</InvoiceText>
                                <InvoiceText>{ order.billingAddress.zipCode }</InvoiceText>
                            </InvoiceAddressContainer>
                            <InvoiceAddressContainer>
                            <InvoiceSubtitle>Shipping</InvoiceSubtitle>
                                <InvoiceText>{ `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` }</InvoiceText>
                                <InvoiceText>{ order.shippingAddress.addressOne }</InvoiceText>
                                <InvoiceText>{ order.shippingAddress.addressTwo }</InvoiceText>
                                <InvoiceText>{ order.shippingAddress.city }</InvoiceText>
                                <InvoiceText>{ order.shippingAddress.state }</InvoiceText>
                                <InvoiceText>{ order.shippingAddress.zipCode }</InvoiceText>
                            </InvoiceAddressContainer>
                        </InvoiceAddressesContainer>
                    </InvoiceHeaderContainer>
                    <InvoiceTable>
                        <InvoiceTableHead>
                            <InvoiceTableRow>
                                <InvoiceTableHeading>Product</InvoiceTableHeading>
                                <InvoiceTableHeading>Quantity</InvoiceTableHeading>
                                <InvoiceTableHeading>Price</InvoiceTableHeading>
                            </InvoiceTableRow>
                        </InvoiceTableHead>
                        <InvoiceTableBody>
                                {products.map((product, index) => (
                                    <OrderItem key={index} product={product} />
                                ))}
                        </InvoiceTableBody>
                    </InvoiceTable>
                    <InvoiceTotalContainer>
                    <InvoiceTotalItemContainer>
                        <InvoiceText>Subtotal </InvoiceText>
                            <InvoiceText>{ tools.formatPrice(subtotal) }</InvoiceText>
                        </InvoiceTotalItemContainer>
                        {order.deliveryInsurance &&
                            <InvoiceTotalItemContainer>
                                <InvoiceText>Delivery Insurance </InvoiceText>
                                <InvoiceText>{ tools.formatPrice(order.deliveryInsuranceTotal) }</InvoiceText>
                            </InvoiceTotalItemContainer>
                        }
                        <InvoiceTotalItemContainer>
                            <InvoiceText>Shipping </InvoiceText>
                            <InvoiceText>{ tools.formatPrice(order.shippingTotal) }</InvoiceText>
                        </InvoiceTotalItemContainer>
                        {order.saleId &&
                            <InvoiceTotalItemContainer>
                                <InvoiceText>Sale </InvoiceText>
                                <InvoiceText>{ order.Sale.type }</InvoiceText>
                            </InvoiceTotalItemContainer>
                        }
                        {order.credit &&
                            <InvoiceTotalItemContainer>
                                <InvoiceText>Credit </InvoiceText>
                                <InvoiceText>{ `- $${order.credit.credit/100}` }</InvoiceText>
                            </InvoiceTotalItemContainer>
                        }
                        <InvoiceTotalItemContainer>
                            <InvoiceText>Total </InvoiceText>
                            <InvoiceText>{ tools.formatPrice(order.total) }</InvoiceText>
                        </InvoiceTotalItemContainer>
                    </InvoiceTotalContainer>
                </InvoiceContainer>
                {order.notes &&
                    <ContentContainer>
                        <Text>NOTES: { order.notes }</Text>
                    </ContentContainer>
                }
            </>
        </MainContainer>
    );
}

export default OrderDisplay;