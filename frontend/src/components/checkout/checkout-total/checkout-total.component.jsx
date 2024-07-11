import { useContext, useEffect, useState } from 'react';

import { VscClose, VscInfo } from 'react-icons/vsc'

// import SquarePaymentForm from '../payment-form/payment-form.component';
import Button from '../../reusable/button/button.component';
import ClientModal from '../../reusable/client-modal/client-modal.component';

import { CheckoutContext } from '../../../contexts/checkout.context';
import { ConfigurationContext } from '../../../contexts/configuration.context';
import { ToastContext } from '../../../contexts/toast.context';
import { UserContext } from '../../../contexts/user.context';

import { convertProductPrice } from '../../../tools/cart';
import Tools from '../../../tools/tools';

import Client from '../../../tools/client';

import {
    CartDetailsContainer,
    CartInsuranceContainer,
    CartInsuranceInput,
    CartInsuranceLabel,
    CheckoutFieldset,
    CheckoutButton,
    CheckoutRowContainer,
    CheckoutTotalContainer,
    CheckoutText,
    InsuranceInfoText,
    InsuranceInfoContainer,
    InsuranceInfoCloseContainer
} from './checkout-total.styles';

const client = new Client();
const tools = new Tools();

const CheckoutTotal = () => {
    const [ deliveryInsuranceSelection, setDeliveryInsuranceSelection ] = useState(false);
    const [ showInsuranceInfo, setShowInsuranceInfo ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ showCheckoutButton, setShowCheckoutButton ] = useState(true);
    const [ currentUserCredit, setCurrentUserCredit ] = useState(null);
    const [ userCreditInput, setUserCreditInput ] = useState(0);
    const [ userCreditInputDisplay, setUserCreditInputDisplay ] = useState('');
    const [ userCreditApplied, setUserCreditApplied ] = useState(0);
    const [ paymentType, setPaymentType ] = useState('');

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
    const { errorToast, successToast } = useContext(ToastContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if(currentUser && currentUserCredit === null) {
            setCurrentUserCredit(currentUser.credit);
        }

        let deliveryInsuranceTotal = deliveryInsuranceSelection ? deliveryInsurance : 0;
        
        setTotal(subtotal + deliveryInsuranceTotal + shippingTotal - userCreditApplied);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ subtotal, shippingTotal, deliveryInsuranceSelection, currentUser, total ]);

    const deliveryInsuranceHandler = () => {
        setDeliveryInsuranceSelection(!deliveryInsuranceSelection);
    }

    const handleUserCreditInput = (e) => {
        let inputAmount = e;
        if(inputAmount < 0) {
            return
        }

        if(inputAmount > total) {
            inputAmount = total;
        }

        if(inputAmount > currentUserCredit) {
            inputAmount = currentUserCredit;
        }

        setUserCreditInput(inputAmount);
        setUserCreditInputDisplay(`$${inputAmount/100}`);
    }

    const applyUserCredit = () => {
        if(userCreditInput <= 0) {
            return
        }

        if(userCreditInput > currentUserCredit) {
            return
        }

        setCurrentUserCredit(currentUserCredit - userCreditInput);
        setUserCreditApplied(userCreditInput);
        setTotal(total - userCreditInput);
        setUserCreditInput(0);
        setUserCreditInputDisplay('');
        successToast(`Applied $${userCreditInput/100} credit to order`);
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
        if(!paymentType && total > 0){
            errorToast('Please select a payment type to submit order.');
            return false;
        }
        
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
            deliveryInsuranceTotal: deliveryInsuranceSelection ? deliveryInsurance : 0,
        };

        if(sale) {
            data.saleId = sale[0].id;
        }

        if(userCreditApplied) {
            data.credit = userCreditApplied;
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
            <>
                <CheckoutText>Account Credit: ${currentUserCredit/100}</CheckoutText>
                <CartInsuranceInput type='text' value={userCreditInputDisplay} onChange={(e) => tools.integerInputValidation(e.target.value, handleUserCreditInput)} placeholder='Credit Amount' />
                <CheckoutButton onClick={() => applyUserCredit()}>Apply Credit</CheckoutButton>
            </>

            <CheckoutFieldset>
                <legend>Select Payment Type</legend>
                <CartInsuranceLabel htmlFor='card'>
                    <CartInsuranceInput type='radio' id='card' name='paymentType' value='card' onChange={(e) => setPaymentType(e.target.value)} />
                    Card
                </CartInsuranceLabel>
                <CartInsuranceLabel htmlFor='bitcoin'>
                    <CartInsuranceInput type='radio' id='bitcoin' name='paymentType' value='bitcoin' onChange={(e) => setPaymentType(e.target.value)} />
                    Bitcoin
                </CartInsuranceLabel>
                <CartInsuranceLabel htmlFor='ethereum'>
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
            
                <CartDetailsContainer>
                    {sale &&
                        <>
                            <CheckoutRowContainer>
                                <CheckoutText>
                                    PreSale Subtotal: 
                                </CheckoutText>
                                <CheckoutText>
                                    { `$${preSaleSubtotal/100}` }
                                </CheckoutText>
                            </CheckoutRowContainer>
                            <CheckoutRowContainer>
                                <CheckoutText>
                                    Sale Applied: 
                                </CheckoutText>
                                <CheckoutText>
                                { discountAmountRemoved === 0 ? '' : '- '}
                                { `$${discountAmountRemoved/100}` }
                                </CheckoutText>
                            </CheckoutRowContainer>
                        </>
                    }
                    <CheckoutRowContainer>
                        <CheckoutText>
                                Subtotal: 
                        </CheckoutText>
                        <CheckoutText>
                                { convertProductPrice(subtotal) }
                        </CheckoutText>
                    </CheckoutRowContainer>
                    {deliveryInsuranceSelection &&
                                <CheckoutRowContainer>
                                    <CheckoutText>
                                        Delivery Insurance:
                                    </CheckoutText>
                                    <CheckoutText>
                                            { convertProductPrice(deliveryInsurance) }
                                    </CheckoutText>
                                </CheckoutRowContainer>
                    }
                    <CheckoutRowContainer>
                        <CheckoutText>
                                Shipping:
                        </CheckoutText>
                        <CheckoutText>
                                { convertProductPrice(shippingAndHandling.standard.price) }
                        </CheckoutText>
                    </CheckoutRowContainer>
                    {userCreditApplied !== 0 &&
                        <CheckoutRowContainer>
                            <CheckoutText>
                                Credit Applied:
                            </CheckoutText>
                            <CheckoutText>
                                ${ userCreditApplied/100 }
                            </CheckoutText>
                        </CheckoutRowContainer>
                    }
                    <CheckoutRowContainer borderTop={true}>
                        <CheckoutText>
                                Total:
                        </CheckoutText>
                        <CheckoutText>
                                { convertProductPrice(total) }
                        </CheckoutText>
                    </CheckoutRowContainer>
                </CartDetailsContainer>
                <CheckoutRowContainer>
                    {showCheckoutButton &&
                        <Button onClick={() => confirmCheckout()}>Place Order</Button>
                    }
                </CheckoutRowContainer>
        </CheckoutTotalContainer>
    )
}

export default CheckoutTotal;