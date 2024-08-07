import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import dayjs from 'dayjs';

import {
    FaPrint
} from 'react-icons/fa';

import AdminModal from '../admin-modal/admin-modal.component';
import Button from '../button/button.component';
import InvoiceItem from './invoice-item/invoice-item.component';
import Spinner from '../spinner/spinner.component.jsx';

import Client from '../../../tools/client.js';
import Tools from '../../../tools/tools.js';

import {
    AccountDetailsContainer,
    ButtonContainer,
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
} from './invoice.styles';

import {
    ColumnContainer,
    MainContainer,
} from '../../../styles/component.styles.jsx';

const client = new Client();
const tools = new Tools();

const Invoice = ({ order, products, getOrder }) => {
    const componentRef = useRef();
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState('');
    const [ subtotal, setSubtotal ] = useState('');
    const [ paymentLink, setPaymentLink ] = useState('');
    const [ tracking, setTracking ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ action, setAction ] = useState('');
    const [ showOrderModal, setShowOrderModal ] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const userRes = await client.getAccountById(order.userId);

            setUser(userRes);
            setLoading(false);
        }

        let subtotalCount = 0;
        products.map(item => subtotalCount = subtotalCount + (item.quantity * item.product.Inventories[0].price));
        setSubtotal(subtotalCount);

        getUser();

        // eslint-disable-next-line
    }, []);

    const confirmSendPaymentLink = () => {
        if(paymentLink.length === 0) {
            console.log('Please add a Payment Link to update order status to BILLED.');
            return
        }
        setTitle('Send Payment Link');
        setMessage(`Are you sure you want to send the payment link: ${paymentLink}?`);
        setAction(() => sendPaymentLink);
        setShowOrderModal(true);
    }

    const confirmMarkPaid = () => {
        setTitle('Mark Paid');
        setMessage('Are you sure you want to mark the order as PAID? Please ensure the customer has paid the correct invoice');
        setAction(() => markBillPaid);
        setShowOrderModal(true);
    }

    const confirmProcessOrder = () => {
        setTitle('Process Order');
        setMessage('Are you sure you want to process the order? It is a good idea to make sure the inventory is pulled first.');
        setAction(() => processOrder);
        setShowOrderModal(true);
    }

    const confirmShipOrder = () => {
        if(tracking.length === 0) {
            console.log('Please add a tracking number to update order status to Shipped.');
            return
        }
        setTitle('Ship Order');
        setMessage(`Are you sure you want to ship the order with tracking number: ${tracking}? The customer will automatically get an email with the status update and tracking number.`);
        setAction(() =>shipOrder);
        setShowOrderModal(true);
    }


    const sendPaymentLink = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'BILLED',
            paymentLink
        }

        await client.sendPaymentLink(data);
        setShowOrderModal(false);
        getOrder();
    }

    const invoicePaid = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'PAID',
            paymentLink
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const markBillPaid = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'PAID'
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const processOrder = async () => {
        const data = {
            orderId: order.id,
            status: 'PROCESSING'
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const shipOrder = async () => {
        const data = {
            email: user.email,
            refId: order.refId,
            orderId: order.id,
            status: 'SHIPPED',
            tracking: tracking
        }

        await client.shipOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showOrderModal}
                setShow={setShowOrderModal}
                title={title} 
                image={''}
                message={message} 
                action={action} 
                actionText={'Process'}
            />
            {loading ?
                <Spinner />
            :
                <>
                    <PrintContainer>
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
                                        <InvoiceItem key={index} product={product} />
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
                    {order.status.toLowerCase() === 'new' &&
                    <>
                        <ButtonContainer>
                            <label>Payment Link: </label>
                            <input value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder='Payment Link' />
                            <Button onClick={() => confirmSendPaymentLink()} >Send Payment</Button>
                        </ButtonContainer>
                        <Button onClick={() => invoicePaid()} >Invoice Paid</Button>
                    </>
                    }
                    {order.status.toLowerCase() === 'billed' &&
                        <ButtonContainer>
                            <Button onClick={() => confirmMarkPaid()} >Bill Paid</Button>
                        </ButtonContainer>
                    }
                    {order.status.toLowerCase() === 'paid' &&
                        <ButtonContainer>
                            <Button onClick={() => confirmProcessOrder()} >Process Order</Button>
                        </ButtonContainer>
                    }
                    {order.status.toLowerCase() === 'processing' &&
                        <ColumnContainer flexDirection={'row'}>
                            <label>Tracking: </label>
                            <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder='Tracking' />
                            <Button onClick={() => confirmShipOrder()} >Ship Order</Button>
                        </ColumnContainer>
                    }
                </>
            }
        </MainContainer>
    );
}

export default Invoice;