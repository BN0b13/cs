import { useEffect, useContext, useState } from 'react';

import { VscClose, VscInfo } from 'react-icons/vsc'

import SquarePaymentForm from '../payment-form/payment-form.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { CheckoutContext } from '../../../contexts/checkout.context';
import { UserContext } from '../../../contexts/user.context';

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
    InsuranceInfoCloseContainer,
    SquareContainer
} from './checkout-total.styles';

const client = new Client();

const CheckoutTotal = () => {
    const [ deliveryInsuranceSelection, setDeliveryInsuranceSelection ] = useState(false);
    const [ showInsuranceInfo, setShowInsuranceInfo ] = useState(false);
    const {
        billingAddress,
        shippingAddress,
        deliveryInsurance,
        shippingId,
        shippingTotal,
        shippingAndHandling,
        subtotal,
        total,
        setTotal
    } = useContext(CheckoutContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        let deliveryInsuranceTotal = deliveryInsuranceSelection ? deliveryInsurance : 0;
        
        setTotal(subtotal + deliveryInsuranceTotal + shippingTotal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ subtotal, shippingTotal, deliveryInsuranceSelection ]);

    const deliveryInsuranceHandler = () => {
        setDeliveryInsuranceSelection(!deliveryInsuranceSelection);
    }

    const checkout = async ({ token, buyer }) => {

        const data = {
            token,
            buyer,
            email: currentUser.email,
            products: currentUser.cart.products,
            total,
            billingAddress,
            shippingAddress,
            shippingId,
            shippingTotal,
            deliveryInsurance: deliveryInsuranceSelection,
            deliveryInsuranceTotal: deliveryInsuranceSelection ? deliveryInsurance : 0
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
                                            { convertProductPrice(deliveryInsurance) }
                                    </CartShippingText>
                                </CartInsuranceTotalContainer>
                    }
                    <CartShippingContainer>
                        <CartShippingText>
                                Shipping:
                        </CartShippingText>
                        <CartShippingText>
                                { convertProductPrice(shippingAndHandling.standard.price) }
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
                <SquareContainer>
                    <SquarePaymentForm
                        buyerData={{
                            addressOne: billingAddress.addressOne,
                            addressTwo: billingAddress.addressTwo,
                            total,
                            city: billingAddress.city,
                            givenName: billingAddress.firstName,
                            familyName: billingAddress.lastName
                        }}
                        checkout={checkout}
                    />
                </SquareContainer>
            </>
            }
        </CheckoutTotalContainer>
    )
}

export default CheckoutTotal;