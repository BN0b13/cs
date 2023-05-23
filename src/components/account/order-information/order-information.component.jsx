import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderItem from './order-item/order-item.component';
import Spinner from '../../spinner/spinner.component';

import Client from '../../../tools/client';
import { convertProductPrice } from '../../../tools/cart';
import { setMobileView } from '../../../tools/mobileView';

import { shippingAndHandling } from '../../../config';

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
    const [ account, setAccount ] = useState(null);
    const [ order, setOrder ] = useState(null);
    const [ products, setProducts ] = useState(null);
    const [ deliveryInsurance, setDeliveryInsurance ] = useState(null);
    const [ subtotal, setSubtotal ] = useState(null);

    useEffect(() => {
        const getOrderByRef = async () => {
            const res = await client.getOrderByRef(refId);
            const getAccount = await client.getAccount();
            const getProducts = await client.getProducts();
            let productArr = [];
            let subtotalCount = 0;
            res.rows[0].products.map(item => {
                const product = getProducts.rows.filter(prod => prod.id === item.productId);
                subtotalCount = subtotalCount + (item.quantity * product[0].price);
                productArr.push({
                    name: product[0].name,
                    description: product[0].description,
                    quantity: item.quantity,
                    price: product[0].price
                });
            });
            const deliveryInsuranceRes = await client.getDeliveryInsuranceAmount();
            console.log('Delivery Insurance: ', deliveryInsuranceRes);
            setAccount(getAccount);
            setProducts(productArr);
            setOrder(res.rows[0]);
            setDeliveryInsurance(deliveryInsuranceRes.deliveryInsuranceAmount);
            setSubtotal(subtotalCount);
        }
        getOrderByRef();
    }, []);

    return (
        <OrderInformationContainer>
            {!order || !products ?
                <Spinner />
            :
                <>
                    <OrderInformationTitle>INVOICE PAID</OrderInformationTitle>
                    <OrderInformationHeaderContainer>
                        
                        
                        <OrderInformationDetailsContainer setMobileView={setMobileView()}>
                            <OrderInformationAddressContainer>
                                <OrderInformationSubtitle>Status: { order.status.toUpperCase()}</OrderInformationSubtitle>
                                <OrderInformationSubtitle>Reference ID: { refId }</OrderInformationSubtitle>
                            </OrderInformationAddressContainer>
                            <OrderInformationAddressContainer>
                                <OrderInformationSubtitle>{ account.firstName } { account.lastName }</OrderInformationSubtitle>
                                <OrderInformationSubtitle>{ account.email }</OrderInformationSubtitle>
                                <OrderInformationSubtitle>{ account.phone }</OrderInformationSubtitle>
                            </OrderInformationAddressContainer>
                        </OrderInformationDetailsContainer>
                        <OrderInformationAddressesContainer setMobileView={setMobileView()}>
                            <OrderInformationAddressContainer>
                                <OrderInformationSubtitle>Billing Address</OrderInformationSubtitle>
                                <OrderInformationText>{ order.billingAddress.addressOne }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.addressTwo }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.city }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.state }</OrderInformationText>
                                <OrderInformationText>{ order.billingAddress.zipCode }</OrderInformationText>
                            </OrderInformationAddressContainer>
                            <OrderInformationAddressContainer>
                            <OrderInformationSubtitle>Shipping Address</OrderInformationSubtitle>
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
                                {products.map((product, index) => (
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
                                <OrderInformationText>{ convertProductPrice(deliveryInsurance) }</OrderInformationText>
                            </OrderInformationTotalItemContainer>
                        }
                        <OrderInformationTotalItemContainer>
                            <OrderInformationText>Shipping </OrderInformationText>
                            <OrderInformationText>{ convertProductPrice(shippingAndHandling) }</OrderInformationText>
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