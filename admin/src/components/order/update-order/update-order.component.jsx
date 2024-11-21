import { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';
import UpdateOrderProduct from './update-order-product/update-order-product.component';

import Client from '../../../tools/client';

import {
    ColumnContainer,
    ContentContainer,
    DeleteButton,
    Input,
    MainContainer,
    Option,
    RowContainer,
    Select,
    Subtitle,
    Textarea,
    Title
} from '../../../styles/component.styles';

const client = new Client();

const UpdateOrder = ({ order, updateOrder, cancelOrder, addInventoryToOrder, removeInventoryFromOrder, showUpdate }) => {
    const [ loading, setLoading ] = useState(true);
    const [ products, setProducts ] = useState([]);

    const [ status, setStatus ] = useState(order.status ?? '');
    const [ refId, setRefId ] = useState(order.refId ?? '');
    const [ paymentType, setPaymentType ] = useState(order.paymentType ?? '');
    const [ paymentLink, setPaymentLink ] = useState(order.paymentLink ?? '');
    const [ tracking, setTracking ] = useState(order.tracking ?? '');

    const [ billingFirstName, setBillingFirstName ] = useState(order.billingAddress.firstName ?? '');
    const [ billingLastName, setBillingLastName ] = useState(order.billingAddress.lastName ?? '');
    const [ billingAddressOne, setBillingAddressOne ] = useState(order.billingAddress.addressOne ?? '');
    const [ billingAddressTwo, setBillingAddressTwo ] = useState(order.billingAddress.addressTwo ?? '');
    const [ billingCity, setBillingCity ] = useState(order.billingAddress.city ?? '');
    const [ billingState, setBillingState ] = useState(order.billingAddress.state ?? '');
    const [ billingZipCode, setBillingZipCode ] = useState(order.billingAddress.zipCode ?? '');

    const [ shippingFirstName, setShippingFirstName ] = useState(order.shippingAddress.firstName ?? '');
    const [ shippingLastName, setShippingLastName ] = useState(order.shippingAddress.lastName ?? '');
    const [ shippingAddressOne, setShippingAddressOne ] = useState(order.shippingAddress.addressOne ?? '');
    const [ shippingAddressTwo, setShippingAddressTwo ] = useState(order.shippingAddress.addressTwo ?? '');
    const [ shippingCity, setShippingCity ] = useState(order.shippingAddress.city ?? '');
    const [ shippingState, setShippingState ] = useState(order.shippingAddress.state ?? '');
    const [ shippingZipCode, setShippingZipCode ] = useState(order.shippingAddress.zipCode ?? '');

    const [ orderProducts, setOrderProducts ] = useState(order.products ?? []);

    const [ deliveryInsurance, setDeliveryInsurance ] = useState(order.deliveryInsurance ?? false);
    const [ deliveryInsuranceTotal, setDeliveryInsuranceTotal ] = useState(order.deliveryInsuranceTotal ?? 0);
    const [ shippingTotal, setShippingTotal ] = useState(order.shippingTotal ?? 0);
    const [ total, setTotal ] = useState(order.total ?? 0);
    const [ notes, setNotes ] = useState(order.notes ?? '');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const res = await client.getProducts();

        setProducts(res.rows);
        setLoading(false);
    }

    const submitUpdate = async () => {
        setLoading(true);
        const data = {
            id: order.id,
            billingAddress: {
                firstName: billingFirstName,
                lastName: billingLastName,
                addressOne: billingAddressOne,
                addressTwo: billingAddressTwo,
                city: billingCity,
                state: billingState,
                zipCode: billingZipCode
            },
            shippingAddress: {
                firstName: shippingFirstName,
                lastName: shippingLastName,
                addressOne: shippingAddressOne,
                addressTwo: shippingAddressTwo,
                city: shippingCity,
                state: shippingState,
                zipCode: shippingZipCode
            },
            status,
            refId,
            paymentLink,
            paymentType,
            tracking,
            products: orderProducts,
            deliveryInsurance,
            deliveryInsuranceTotal,
            shippingTotal,
            total,
            notes
        }

        await updateOrder(data);
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <ContentContainer>
                    <Title>Update Order</Title>

                    <ColumnContainer>
                        <Input value={refId} onChange={(e) => setRefId(e.target.value)} placeholder={'Reference ID'} />
                        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <Option value={'new'}>New</Option>
                            <Option value={'billed'}>Billed</Option>
                            <Option value={'paid'}>Paid</Option>
                            <Option value={'processing'}>Processing</Option>
                            <Option value={'shipped'}>Shipped</Option>
                        </Select>
                        <Select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                            <Option value={'card'}>Card</Option>
                            <Option value={'bitcoin'}>Bitcoin</Option>
                            <Option value={'ethereum'}>Ethereum</Option>
                        </Select>
                        <Input value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} placeholder={'Payment Link'} />
                        <Input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder={'Tracking'} />
                    </ColumnContainer>

                    <ColumnContainer>
                        <Subtitle>Billing Address</Subtitle>
                        <Input value={billingFirstName} onChange={(e) => setBillingFirstName(e.target.value)} placeholder={'First Name'} />
                        <Input value={billingLastName} onChange={(e) => setBillingLastName(e.target.value)} placeholder={''} />
                        <Input value={billingAddressOne} onChange={(e) => setBillingAddressOne(e.target.value)} placeholder={''} />
                        <Input value={billingAddressTwo} onChange={(e) => setBillingAddressTwo(e.target.value)} placeholder={''} />
                        <Input value={billingCity} onChange={(e) => setBillingCity(e.target.value)} placeholder={''} />
                        <Input value={billingState} onChange={(e) => setBillingState(e.target.value)} placeholder={''} />
                        <Input value={billingZipCode} onChange={(e) => setBillingZipCode(e.target.value)} placeholder={''} />
                    </ColumnContainer>
                    <ColumnContainer>
                        <Subtitle>Shipping Address</Subtitle>
                        <Input value={shippingFirstName} onChange={(e) => setShippingFirstName(e.target.value)} placeholder={'First Name'} />
                        <Input value={shippingLastName} onChange={(e) => setShippingLastName(e.target.value)} placeholder={''} />
                        <Input value={shippingAddressOne} onChange={(e) => setShippingAddressOne(e.target.value)} placeholder={''} />
                        <Input value={shippingAddressTwo} onChange={(e) => setShippingAddressTwo(e.target.value)} placeholder={''} />
                        <Input value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} placeholder={''} />
                        <Input value={shippingState} onChange={(e) => setShippingState(e.target.value)} placeholder={''} />
                        <Input value={shippingZipCode} onChange={(e) => setShippingZipCode(e.target.value)} placeholder={''} />
                    </ColumnContainer>

                    {orderProducts.map((product, index) => (
                        <UpdateOrderProduct key={index} product={product} />
                    ))}

                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={'Notes'} />

                    <DeleteButton onClick={() => cancelOrder()}>Cancel Order</DeleteButton>
                    <RowContainer margin={'20px 0'}>
                        <Button onClick={() => showUpdate(false)}>Back</Button>
                        <Button onClick={() => submitUpdate()}>Update Order</Button>
                    </RowContainer>
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default UpdateOrder;