import { useEffect, useContext, useState } from 'react';

import { CheckoutContext } from '../../../contexts/checkout.context';

import {
    CheckoutShippingContainer,
    CheckoutShippingInput,
    CheckoutShippingOptionsContainer,
    CheckoutShippingText,
    CheckoutShippingTitle
} from './checkout-shipping.styles';

const CheckoutShipping = () => {
    const [ mobileView, setMobileView ] = useState(false);
    const [ shippingOptionOne, setShippingOptionOne ] = useState(true);
    const { setShipping } = useContext(CheckoutContext);

    useEffect(() => {
        if(window.screen.width < 500) {
            setMobileView(true);
        }
    }, []);

    useEffect(() => {
        setShipping(0);
    }, [ shippingOptionOne ]);

    return (
        <CheckoutShippingContainer mobileView={mobileView}>
            <CheckoutShippingTitle>Shipping</CheckoutShippingTitle>
            <CheckoutShippingOptionsContainer>
                <CheckoutShippingInput type={'radio'} checked={shippingOptionOne} onChange={() => setShippingOptionOne(true)} />
                <CheckoutShippingText>
                    First Class 5-7 business days **USPS service subject to delays** Direct from USPS site: ALERT: As a result of the ongoing COVID-19 emergency, certain packages may take longer than usual to arrive.
                </CheckoutShippingText>
            </CheckoutShippingOptionsContainer>
        </CheckoutShippingContainer>
    )
}

export default CheckoutShipping;