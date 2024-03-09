import { useContext, useEffect, useState } from 'react';

import { VscClose, VscInfo } from 'react-icons/vsc'

// import SquarePaymentForm from '../payment-form/payment-form.component';
import Button from '../../reusable/button/button.component';
import ClientModal from '../../reusable/client-modal/client-modal.component';
import Spinner from '../../reusable/spinner/spinner.component';
import Toasted from '../../reusable/toasted/toasted.component';

import { CheckoutContext } from '../../../contexts/checkout.context';
import { ConfigurationContext } from '../../../contexts/configuration.context';
import { UserContext } from '../../../contexts/user.context';

import { convertProductPrice } from '../../../tools/cart';
import { setMobileView } from '../../../tools/mobileView';

import Client from '../../../tools/client';

import {
    CartFinalTotalContainer,
    CheckoutTotalContainer,
    CartDetailsContainer,
    CheckoutFieldset,
    CartInsuranceContainer,
    CartInsuranceInput,
    CartInsuranceLabel,
    CartInsuranceTotalContainer,
    CartSubtotalContainer,
    CartSubtotalText,
    CartShippingContainer,
    CartShippingText,
    CheckoutTotalText,
    CheckoutTotalTextMobile,
    InsuranceInfoText,
    InsuranceInfoContainer,
    InsuranceInfoCloseContainer,
    SquareContainer
} from './checkout-total.styles';

const client = new Client();

const CheckoutTotal = () => {
    const [ deliveryInsuranceSelection, setDeliveryInsuranceSelection ] = useState(false);
    const [ showInsuranceInfo, setShowInsuranceInfo ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ showCheckoutButton, setShowCheckoutButton ] = useState(true);
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');
    const [ paymentType, setPaymentType ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const {
        billingAddress,
        shippingAddress,
        deliveryInsurance,
        shippingId,
        shippingTotal,
        shippingAndHandling,
        sale,
        preSaleSubtotal,
        discountAmountRemoved,
        subtotal,
        total,
        setTotal
    } = useContext(CheckoutContext);
    const { colors } = useContext(ConfigurationContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        let deliveryInsuranceTotal = deliveryInsuranceSelection ? deliveryInsurance : 0;
        
        setTotal(subtotal + deliveryInsuranceTotal + shippingTotal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ subtotal, shippingTotal, deliveryInsuranceSelection ]);

    const getToasted = (toast) => toast();

    const successToast = (message) => {
        setToastMessage(message);
        setToastError(false);
        setShowToast(true);
    }

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const deliveryInsuranceHandler = () => {
        setDeliveryInsuranceSelection(!deliveryInsuranceSelection);
    }

    const checkAddresses = () => {
        if(billingAddress.firstName === '' ||
            billingAddress.lastName === '' ||
            billingAddress.addressOne === '' ||
            billingAddress.city === '' ||
            billingAddress.state === '' ||
            billingAddress.zipCode === ''){
            errorToast('Please fill out all billing address fields to submit order.');
            return false;
        }
        if(shippingAddress.firstName === '' ||
            shippingAddress.lastName === '' ||
            shippingAddress.addressOne === '' ||
            shippingAddress.city === '' ||
            shippingAddress.state === '' ||
            shippingAddress.zipCode === ''){
            errorToast('Please fill out all shipping address fields to submit order.');
            return false;
        }
        if(!paymentType){
            errorToast('Please select a payment type to submit order.');
            return false;
        }
        setShowMsg(false);
        return true;
    }

    const confirmCheckout = () => {
        if(!checkAddresses()) {
            return;
        }
        setShowModal(true);
    }

    const checkout = async () => {
        setShowModal(false);
        setShowCheckoutButton(false);
        const data = {
            email: currentUser.email,
            products: currentUser.cart.products,
            total,
            billingAddress,
            shippingAddress,
            shippingId,
            shippingTotal,
            paymentType,
            deliveryInsurance: deliveryInsuranceSelection,
            deliveryInsuranceTotal: deliveryInsuranceSelection ? deliveryInsurance : 0
        };

        if(sale) {
            data.saleId = sale[0].id;
        }

        const res = await client.checkout(data);

        if(res.status === 201) {
            window.location =`/thankyou/${res.refId}`;
        }
    }

    // const checkout = async ({ token, buyer }) => {
    //     const data = {
    //         token,
    //         buyer,
    //         email: currentUser.email,
    //         products: currentUser.cart.products,
    //         total,
    //         billingAddress,
    //         shippingAddress,
    //         shippingId,
    //         shippingTotal,
    //         deliveryInsurance: deliveryInsuranceSelection,
    //         deliveryInsuranceTotal: deliveryInsuranceSelection ? deliveryInsurance : 0
    //     };

    //     const res = await client.checkout(data);

    //     if(res.status === 201) {
    //         window.location =`/thankyou/${res.refId}`;
    //     }
    // }

    return (
        <CheckoutTotalContainer theme={colors}>
            <ClientModal 
                show={showModal}
                setShow={setShowModal}
                title={'Confirm Order'} 
                image={''}
                message={`We will email a payment link for $${total/100} within the next business day. Please pay the invoice within 72 hours of receiving, or the order will be canceled. Once payment has been received, your order will be shipped. This information will also be accessible in your account's order history in case you do not see the email.`} 
                action={checkout} 
                actionText={'Confirm'}
            />
            {!total ?
                <Spinner />
            :
                <>
                    <CheckoutFieldset>
                        <legend>Select Payment Type</legend>
                        <CartInsuranceLabel for='card'>
                            <CartInsuranceInput type='radio' id='card' name='paymentType' value='card' onChange={(e) => setPaymentType(e.target.value)} />
                            Card
                        </CartInsuranceLabel>
                        <CartInsuranceLabel for='bitcoin'>
                            <CartInsuranceInput type='radio' id='bitcoin' name='paymentType' value='bitcoin' onChange={(e) => setPaymentType(e.target.value)} />
                            Bitcoin
                        </CartInsuranceLabel>
                        <CartInsuranceLabel for='ethereum'>
                            <CartInsuranceInput type='radio' id='ethereum' name='paymentType' value='ethereum' onChange={(e) => setPaymentType(e.target.value)} />
                            Ethereum
                        </CartInsuranceLabel>
                    </CheckoutFieldset>
                    <CartInsuranceContainer>
                        <CartInsuranceLabel>
                            <CartInsuranceInput type={'checkbox'} value={deliveryInsuranceSelection} onClick={() => deliveryInsuranceHandler()} />
                            Delivery Insurance 
                        </CartInsuranceLabel>
                        <VscInfo onClick={() => setShowInsuranceInfo(!showInsuranceInfo)} />
                        {showInsuranceInfo &&
                            <InsuranceInfoContainer theme={colors}>
                                <InsuranceInfoCloseContainer>
                                    <VscClose onClick={() => setShowInsuranceInfo(false)} />
                                </InsuranceInfoCloseContainer>
                                <InsuranceInfoText>If your tracking has not been marked as received within 10 business days, we will send your order again at no charge. If the products in your order are no longer available, we will send seeds of equal or greater value.</InsuranceInfoText>
                            </InsuranceInfoContainer>
                        }
                    </CartInsuranceContainer>
                    {setMobileView() ?
                        <CartDetailsContainer>
                            {sale && 
                                <>
                                    <CartSubtotalContainer>
                                        <CheckoutTotalTextMobile>
                                            PreSale Subtotal: 
                                        </CheckoutTotalTextMobile>
                                        <CheckoutTotalTextMobile>
                                            { `$${preSaleSubtotal/100}` }
                                        </CheckoutTotalTextMobile>
                                    </CartSubtotalContainer>
                                    <CartSubtotalContainer>
                                        <CheckoutTotalTextMobile>
                                            Sale Applied: 
                                        </CheckoutTotalTextMobile>
                                        <CheckoutTotalTextMobile>
                                        { discountAmountRemoved === 0 ? '' : '- '}
                                        { `$${discountAmountRemoved/100}` }
                                        </CheckoutTotalTextMobile>
                                    </CartSubtotalContainer>
                                </>
                            }
                            <CartSubtotalContainer>
                                <CheckoutTotalTextMobile>
                                        Subtotal: 
                                </CheckoutTotalTextMobile>
                                <CheckoutTotalTextMobile>
                                        { convertProductPrice(subtotal) }
                                </CheckoutTotalTextMobile>
                            </CartSubtotalContainer>
                            {deliveryInsuranceSelection &&
                                        <CartInsuranceTotalContainer>
                                            <CheckoutTotalTextMobile>
                                                Delivery Insurance:
                                            </CheckoutTotalTextMobile>
                                            <CheckoutTotalTextMobile>
                                                    { convertProductPrice(deliveryInsurance) }
                                            </CheckoutTotalTextMobile>
                                        </CartInsuranceTotalContainer>
                            }
                            <CartShippingContainer>
                                <CheckoutTotalTextMobile>
                                        Shipping:
                                </CheckoutTotalTextMobile>
                                <CheckoutTotalTextMobile>
                                        { convertProductPrice(shippingAndHandling.standard.price) }
                                </CheckoutTotalTextMobile>
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
                    :
                        <CartDetailsContainer>
                            {sale &&
                                <>
                                    <CartSubtotalContainer>
                                        <CartSubtotalText>
                                            PreSale Subtotal: 
                                        </CartSubtotalText>
                                        <CartSubtotalText>
                                            { `$${preSaleSubtotal/100}` }
                                        </CartSubtotalText>
                                    </CartSubtotalContainer>
                                    <CartSubtotalContainer>
                                        <CartSubtotalText>
                                            Sale Applied: 
                                        </CartSubtotalText>
                                        <CartSubtotalText>
                                        { discountAmountRemoved === 0 ? '' : '- '}
                                        { `$${discountAmountRemoved/100}` }
                                        </CartSubtotalText>
                                    </CartSubtotalContainer>
                                </>
                            }
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
                    }
                    <SquareContainer>
                        {/* <SquarePaymentForm
                            buyerData={{
                                addressOne: billingAddress.addressOne,
                                addressTwo: billingAddress.addressTwo,
                                total,
                                city: billingAddress.city,
                                givenName: billingAddress.firstName,
                                familyName: billingAddress.lastName
                            }}
                            checkout={checkout}
                        /> */}
                        {showCheckoutButton &&
                            <Button onClick={() => confirmCheckout()}>Place Order</Button>
                        }
                    </SquareContainer>
                </>
            }
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </CheckoutTotalContainer>
    )
}

export default CheckoutTotal;