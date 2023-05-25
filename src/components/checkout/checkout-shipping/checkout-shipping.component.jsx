import { useContext, useEffect, useState } from 'react';

import { CheckoutContext } from '../../../contexts/checkout.context';

import {
    CheckoutShippingContainer,
    CheckoutShippingInput,
    CheckoutShippingOptionsContainer,
    CheckoutShippingText,
    CheckoutShippingTitle
} from './checkout-shipping.styles';

const CheckoutShipping = () => {
    const [ shippingOptionOne, setShippingOptionOne ] = useState(true);
    const { setShippingId, setShippingTotal, shippingAndHandling } = useContext(CheckoutContext);


    useEffect(() => {
        setShippingId(0);
        setShippingTotal(shippingAndHandling.standard.price);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CheckoutShippingContainer>
            <CheckoutShippingTitle>Shipping</CheckoutShippingTitle>
            <CheckoutShippingOptionsContainer>
                <CheckoutShippingInput type={'radio'} checked={shippingOptionOne} onChange={() => setShippingOptionOne(true)} />
                <CheckoutShippingText>
                    { shippingAndHandling.standard.description }
                </CheckoutShippingText>
            </CheckoutShippingOptionsContainer>
        </CheckoutShippingContainer>
    )
}

export default CheckoutShipping;