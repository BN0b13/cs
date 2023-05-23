import { useEffect, useContext, useState } from 'react';

import { VscClose, VscInfo } from 'react-icons/vsc'

import SquarePaymentForm from '../payment-form/payment-form.component';
import Spinner from '../../spinner/spinner.component';

import { CheckoutContext } from '../../../contexts/checkout.context';

import { convertProductPrice } from '../../../tools/cart';
import { setMobileView } from '../../../tools/mobileView';

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
    CheckoutTotalText,
    InsuranceInfoText,
    InsuranceInfoContainer,
    InsuranceInfoCloseContainer
} from './checkout-total.styles';

const client = new Client();

const CheckoutTotal = ({ cart, subtotal, shippingAndHandling, user }) => {
    const [ deliveryInsuranceAmount, setDeliveryInsuranceAmount ] = useState(null);
    const [ deliveryInsuranceSelection, setDeliveryInsuranceSelection ] = useState(false);
    const [ showInsuranceInfo, setShowInsuranceInfo ] = useState(false);
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

        if(res.status === 201) {
            window.location =`/thankyou/${res.refId}`;
        }
    }

    return (
        <CheckoutTotalContainer setMobileView={setMobileView()}>
            {!total ?
                <Spinner />
            :
            <>
                <CartInsuranceContainer setMobileView={setMobileView()}>
                    <CartInsuranceLabel>
                        <CartInsuranceInput type={'checkbox'} value={deliveryInsuranceSelection} onClick={() => deliveryInsuranceHandler()} />
                        Delivery Insurance 
                    </CartInsuranceLabel>
                    <VscInfo onClick={() => setShowInsuranceInfo(!showInsuranceInfo)} />
                    {showInsuranceInfo &&
                        <InsuranceInfoContainer>
                            <InsuranceInfoCloseContainer>
                                <VscClose onClick={() => setShowInsuranceInfo(false)} />
                            </InsuranceInfoCloseContainer>
                            <InsuranceInfoText>If your tracking has not been marked as received within 10 business days, we will send your order again at no charge. If the products in your order are no longer available, we will send seeds of equal or greater value.</InsuranceInfoText>
                        </InsuranceInfoContainer>
                    }
                </CartInsuranceContainer>
                <CartDetailsContainer setMobileView={setMobileView()}>
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
                        addressOne: billingAddress.addressOne,
                        addressTwo: billingAddress.addressTwo,
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