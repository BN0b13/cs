import { useEffect, useContext, useState } from 'react';

import Address from '../../address/address.component';

import { CheckoutContext } from '../../../contexts/checkout.context';

import { setMobileView } from '../../../tools/mobileView';

import {
    CheckoutAddressContainer,
    CartAddressCheckbox,
    CheckoutAddressesContainer,
    CartAddressLabel,
    CartAddressTitle
} from './checkout-address.styles';

const CheckoutAddress = ({ user }) => {
    const defaultAddress = {
        addressOne: user.billingAddress.addressOne,
        addressTwo: user.billingAddress.addressTwo,
        city: user.billingAddress.city,
        state: user.billingAddress.state,
        zipCode: user.billingAddress.zipCode
    };
    const [ checkbox, setCheckbox ] = useState(false);

    const { billingAddress, setBillingAddress, shippingAddress, setShippingAddress } = useContext(CheckoutContext);

    useEffect(() => {
        setBillingAddress(defaultAddress);
        setShippingAddress(defaultAddress);
    }, []);

    const handleCheckbox = () => {
        setShippingAddress(defaultAddress);
        setCheckbox(!checkbox);
    }

    const updateBillingAddress = (data) => {
        setBillingAddress({
            ...billingAddress,
            ...data
        });
    }

    const updateShippingAddress = (data) => {
        setShippingAddress({
            ...shippingAddress,
            ...data
        });
    }

    return (
        <CheckoutAddressContainer setMobileView={setMobileView()}>
            <CheckoutAddressesContainer setMobileView={setMobileView()}>
                <CartAddressTitle>Billing Address</CartAddressTitle>
                <Address address={user.billingAddress} updateAddress={updateBillingAddress} />
                <CartAddressLabel>
                    <CartAddressCheckbox type={'checkbox'} value={checkbox} onClick={() => handleCheckbox()} />
                    Ship to a different address 
                </CartAddressLabel>
            </CheckoutAddressesContainer>
            <CheckoutAddressesContainer setMobileView={setMobileView()}>
                {checkbox && 
                    <>
                        <CartAddressTitle>Shipping Address</CartAddressTitle>
                        <Address address={user.shippingAddress} updateAddress={updateShippingAddress} />
                    </>
                }
            </CheckoutAddressesContainer>
        </CheckoutAddressContainer>
    )
}

export default CheckoutAddress;