import { useEffect, useContext, useState } from 'react';

import SquarePaymentForm from '../payment-form/payment-form.component';

import { CheckoutContext } from '../../../contexts/checkout.context';

import {
    convertProductPrice
} from '../../../tools/cart';

import Client from '../../../tools/client';

import {
    CartFinalTotalContainer,
    CartTotalContainer,
    CartDetailsContainer,
    CartInsuranceContainer,
    CartInsuranceInput,
    CartInsuranceLabel,
    CartInsuranceTotalContainer,
    CartSubtotalContainer,
    CartSubtotalText,
    CartShippingContainer,
    CartShippingText,
    CartTotalText
} from './cart-total.styles';

const client = new Client();

const CartTotal = ({ cart, subtotal, shippingAndHandling }) => {
    const buyerData = {
        address: '123 abc street',
        amount: '70.00',
        city: 'wildomar',
        givenName: 'sammy',
        familyName: 'dog' 
    };
    const [ deliveryInsuranceAmount, setDeliveryInsuranceAmount ] = useState(null);
    const [ mobileView, setMobileView ] = useState(false);
    const [ deliveryInsuranceSelection, setDeliveryInsuranceSelection ] = useState(false);
    const {
        billingAddress,
        shippingAddress,
        shipping,
        deliveryInsurance,
        setDeliveryInsurance,
        total,
        setTotal
    } = useContext(CheckoutContext);

    useEffect(() => {
        if(window.screen.width < 500) {
            setMobileView(true);
        }
        const getDeliveryInsuranceAmount = async () => {
            const res = await client.getDeliveryInsuranceAmount();
            setDeliveryInsuranceAmount(res.deliveryInsuranceAmount);
        }
        getDeliveryInsuranceAmount();
        
    }, []);

    useEffect(() => {
        let addDelivery = deliveryInsuranceSelection ? deliveryInsuranceAmount : 0;
        setDeliveryInsurance(deliveryInsuranceSelection);
        setTotal(subtotal + addDelivery + shippingAndHandling);
    }, [ subtotal, shippingAndHandling, deliveryInsuranceSelection ]);

    const deliveryInsuranceHandler = () => {
        setDeliveryInsurance(!deliveryInsuranceSelection);
        setDeliveryInsuranceSelection(!deliveryInsuranceSelection);
    }

    const checkout = async (params) => {
        console.log('Checkout has params: ', params);
        const { token, buyer } = params;

        console.log('Token: ', token);
        console.log('Buyer: ', buyer);

        const data = {
            token,
            buyer,
            products: cart,
            total,
            billingAddress,
            shippingAddress,
            shipping,
            deliveryInsurance,
        };

        console.log('Data: ', data);

        // const res = await client.checkout(data);

        // if(res) {
        //     window.location ='/thankyou';
        // }
    }

    return (
        <CartTotalContainer mobileView={mobileView}>
            <CartInsuranceContainer mobileView={mobileView}>
                <SquarePaymentForm
                    buyerData={buyerData}
                    checkout={checkout}
                />
                <CartInsuranceLabel>
                    <CartInsuranceInput type={'checkbox'} value={deliveryInsuranceSelection} onClick={() => deliveryInsuranceHandler()} />
                     Delivery Insurance
                </CartInsuranceLabel>
            </CartInsuranceContainer>
            <CartDetailsContainer mobileView={mobileView}>
                <CartSubtotalContainer>
                    <CartSubtotalText>
                            Subtotal: 
                    </CartSubtotalText>
                    <CartSubtotalText>
                            { convertProductPrice(subtotal) }
                    </CartSubtotalText>
                </CartSubtotalContainer>
                {deliveryInsuranceSelection &&
                            <CartInsuranceTotalContainer>
                                <CartShippingText>
                                    Delivery Insurance:
                                </CartShippingText>
                                <CartShippingText>
                                        { convertProductPrice(deliveryInsuranceAmount) }
                                </CartShippingText>
                            </CartInsuranceTotalContainer>
                }
                <CartShippingContainer>
                    <CartShippingText>
                            Shipping:
                    </CartShippingText>
                    <CartShippingText>
                            { convertProductPrice(shippingAndHandling) }
                    </CartShippingText>
                </CartShippingContainer>
                <CartFinalTotalContainer>
                    <CartTotalText>
                            Total:
                    </CartTotalText>
                    <CartTotalText>
                            { convertProductPrice(total) }
                    </CartTotalText>
                </CartFinalTotalContainer>
            </CartDetailsContainer>
        </CartTotalContainer>
    )
}

export default CartTotal;