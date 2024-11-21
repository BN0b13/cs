import { useContext, useState } from 'react';

import AdminModal from '../../reusable/admin-modal/admin-modal.component.jsx';
import Button from '../../reusable/button/button.component.jsx';

import { ToastContext } from '../../../contexts/toast.context.jsx';

import Client from '../../../tools/client.js';

import {
    ColumnContainer,
    ContentContainer,
    Input,
    MainContainer,
    RowContainer
} from '../../../styles/component.styles';

const client = new Client();

const ProcessOrder = ({ user, order, getOrder }) => {
    const [ paymentLink, setPaymentLink ] = useState('');
    const [ tracking, setTracking ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ action, setAction ] = useState('');
    const [ showOrderModal, setShowOrderModal ] = useState(false);

    const { errorToast } = useContext(ToastContext);

    const confirmSendPaymentLink = () => {
        if(paymentLink.length === 0) {
            errorToast('Please add a Payment Link to update order status to billed.');
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
        setAction(() => invoicePaid);
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
            errorToast('Please add a tracking number to update order status to shipped.');
            return
        }
        setTitle('Ship Order');
        setMessage(`Are you sure you want to ship the order with tracking number: ${tracking}? The customer will automatically get an email with the status update and tracking number.`);
        setAction(() =>shipOrder);
        setShowOrderModal(true);
    }


    const sendPaymentLink = async () => {
        const data = {
            id: order.id,
            email: user.email,
            refId: order.refId,
            status: 'billed',
            paymentLink
        }

        await client.sendPaymentLink(data);
        setShowOrderModal(false);
        getOrder();
    }

    const invoicePaid = async () => {
        const data = {
            id: order.id,
            email: user.email,
            refId: order.refId,
            status: 'paid',
            paymentLink
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const processOrder = async () => {
        const data = {
            id: order.id,
            status: 'processing'
        }

        await client.updateOrder(data);
        setShowOrderModal(false);
        getOrder();
    }

    const shipOrder = async () => {
        const data = {
            id: order.id,
            email: user.email,
            refId: order.refId,
            status: 'shipped',
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
            <ContentContainer>
                {order.status.toLowerCase() === 'new' &&
                    <>
                        <RowContainer>
                            <ContentContainer margin={'20px 0'}>
                                <Input value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder='Payment Link' />
                            </ContentContainer>
                        </RowContainer>
                        <RowContainer>
                            <Button onClick={() => invoicePaid()} >Mark Paid</Button>
                            <Button onClick={() => confirmSendPaymentLink()} >Send Payment Link</Button>
                        </RowContainer>
                    </>
                }
                {order.status.toLowerCase() === 'billed' &&
                    <RowContainer>
                        <Button onClick={() => confirmMarkPaid()} >Bill Paid</Button>
                    </RowContainer>
                }
                {order.status.toLowerCase() === 'paid' &&
                    <RowContainer>
                        <Button onClick={() => confirmProcessOrder()} >Process Order</Button>
                    </RowContainer>
                }
                {order.status.toLowerCase() === 'processing' &&
                    <ColumnContainer flexDirection={'row'}>
                        <ContentContainer margin={'20px 0'}>
                            <Input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder='Tracking' />
                        </ContentContainer>
                        <Button onClick={() => confirmShipOrder()} >Ship Order</Button>
                    </ColumnContainer>
                }
            </ContentContainer>
        </MainContainer>
    )
}

export default ProcessOrder;