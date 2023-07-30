import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import {
    BsPrinter
} from 'react-icons/bs';

import {
    VscArrowLeft
} from "react-icons/vsc";

import InvoiceItem from './invoice-item/invoice-item.component';
import Spinner from '../spinner/spinner.component';

import Client from '../../../tools/client';
import { convertProductPrice } from '../../../tools/cart';
import { setMobileView } from '../../../tools/mobileView';

import { UserContext } from '../../../contexts/user.context';

import {
    PageBackLink,
    InvoiceContainer,
    InvoiceAddressesContainer,
    InvoiceAddressContainer,
    InvoiceDetailsContainer,
    InvoiceHeaderContainer,
    InvoiceTable,
    InvoiceTableBody,
    InvoiceTableHead,
    InvoiceTableRow,
    InvoiceTableHeading,
    InvoiceText,
    InvoiceTitle,
    InvoiceTotalContainer,
    InvoiceTotalItemContainer,
    InvoiceSubtitle,
    PrintButtonContainer,
    PrintContent,
    TrackingContainer,
    TrackingSubtitle,
    TrackingText
} from './invoice.styles';

const client = new Client();

const Invoice = () => {
    const componentRef = useRef();
    const { refId } = useParams();
    const [ subtotal, setSubtotal ] = useState(null);
    const [ order, setOrder ] = useState(null);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getOrderByRef = async () => {
            const res = await client.getOrderByRef(refId);
            let subtotalCount = 0;
            res.rows[0].products.map(item => subtotalCount = subtotalCount + (item.quantity * item.product[0].price));
            setSubtotal(subtotalCount);
            setOrder(res.rows[0]);
        }
        getOrderByRef();
    }, [ refId ]);

    return (
        <InvoiceContainer>
            {!currentUser || !order ?
                <Spinner />
            :
                <>
                    <PrintButtonContainer>
                        <PageBackLink onClick={() => window.location.href = '/account/orders'} title='Back To Orders'><VscArrowLeft /> Back To Orders</PageBackLink>
                        <ReactToPrint
                            trigger={() => <BsPrinter style={{ fontSize: '28px', paddingRight: '30px'}} title='Print Invoice' />}
                            content={() => componentRef.current}
                        />
                    </PrintButtonContainer>
                    <PrintContent ref={componentRef}>
                        <InvoiceTitle>INVOICE PAID</InvoiceTitle>
                        <InvoiceHeaderContainer>
                            
                            
                            <InvoiceDetailsContainer setMobileView={setMobileView()}>
                                <InvoiceAddressContainer>
                                    <InvoiceSubtitle>{ dayjs(order.createdAt).format('MM/DD/YY') }</InvoiceSubtitle>
                                    <InvoiceSubtitle>Status: { order.status.toUpperCase()}</InvoiceSubtitle>
                                    <InvoiceSubtitle>Reference ID: { refId }</InvoiceSubtitle>
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
                                    <InvoiceSubtitle>{ currentUser.firstName } { currentUser.lastName }</InvoiceSubtitle>
                                    <InvoiceSubtitle>{ currentUser.email }</InvoiceSubtitle>
                                    <InvoiceSubtitle>{ currentUser.phone }</InvoiceSubtitle>
                                </InvoiceAddressContainer>
                            </InvoiceDetailsContainer>
                            <InvoiceAddressesContainer setMobileView={setMobileView()}>
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
                                    {setMobileView() ?
                                        null
                                    :
                                        <InvoiceTableHeading>Description</InvoiceTableHeading>
                                    }
                                    <InvoiceTableHeading>Quantity</InvoiceTableHeading>
                                    <InvoiceTableHeading>Price</InvoiceTableHeading>
                                </InvoiceTableRow>
                            </InvoiceTableHead>
                            <InvoiceTableBody>
                                    {order.products.map((product, index) => (
                                        <InvoiceItem key={index} product={product} />
                                    ))}
                            </InvoiceTableBody>
                        </InvoiceTable>
                        <InvoiceTotalContainer>
                        <InvoiceTotalItemContainer>
                            <InvoiceText>Subtotal </InvoiceText>
                                <InvoiceText>{ convertProductPrice(subtotal) }</InvoiceText>
                            </InvoiceTotalItemContainer>
                            {order.deliveryInsurance &&
                                <InvoiceTotalItemContainer>
                                    <InvoiceText>Delivery Insurance </InvoiceText>
                                    <InvoiceText>{ convertProductPrice(order.deliveryInsuranceTotal) }</InvoiceText>
                                </InvoiceTotalItemContainer>
                            }
                            <InvoiceTotalItemContainer>
                                <InvoiceText>Shipping </InvoiceText>
                                <InvoiceText>{ convertProductPrice(order.shippingTotal) }</InvoiceText>
                            </InvoiceTotalItemContainer>
                            <InvoiceTotalItemContainer>
                                <InvoiceText>Total </InvoiceText>
                                <InvoiceText>{ convertProductPrice(order.total) }</InvoiceText>
                            </InvoiceTotalItemContainer>
                        </InvoiceTotalContainer>
                    </PrintContent>
                </>
            }
            
        </InvoiceContainer>
    );
}

export default Invoice;