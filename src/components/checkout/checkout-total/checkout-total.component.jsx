import { useEffect, useContext, useState } from 'react';

import SquarePaymentForm from '../payment-form/payment-form.component';
import Spinner from '../../spinner/spinner.component';

import { CheckoutContext } from '../../../contexts/checkout.context';

import {
    convertProductPrice
} from '../../../tools/cart';

import Client from '../../../tools/client';

import {
    CartFinalTotalContainer,
    CheckoutTotalContainer,
    CartDetailsContainer,
    CartInsuranceContainer,
    CartInsuranceInput,
    CartInsuranceLabel,
    CartInsuranceTotalContainer,
    CartSubtotalContainer,
    CartSubtotalText,
    CartShippingContainer,
    CartShippingText,
    CheckoutTotalText
} from './checkout-total.styles';

const client = new Client();

const CheckoutTotal = ({ cart, subtotal, shippingAndHandling, user }) => {
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

    const checkout = async ({ token, buyer }) => {

        const data = {
            token,
            buyer,
            email: user.email,
            products: cart,
            total,
            billingAddress,
            shippingAddress,
            shipping,
            deliveryInsurance,
        };

        const res = await client.checkout(data);

        console.log('Payment result: ', res.status);

        if(res.status === 201) {
            window.location =`/thankyou/${res.refId}`;
        }
    }

    return (
        <CheckoutTotalContainer mobileView={mobileView}>
            {!total ?
                <Spinner />
            :
            <>
                <CartInsuranceContainer mobileView={mobileView}>
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
                        <CheckoutTotalText>
                                Total:
                        </CheckoutTotalText>
                        <CheckoutTotalText>
                                { convertProductPrice(total) }
                        </CheckoutTotalText>
                    </CartFinalTotalContainer>
                </CartDetailsContainer>
                <SquarePaymentForm
                    buyerData={{
                        address: billingAddress.address,
                        total,
                        city: billingAddress.city,
                        givenName: user.firstName,
                        familyName: user.lastName
                    }}
                    checkout={checkout}
                />
            </>
            }
        </CheckoutTotalContainer>
    )
}

export default CheckoutTotal;