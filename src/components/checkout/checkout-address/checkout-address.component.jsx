import { useEffect, useContext, useState } from 'react';

import Address from '../../address/address.component';

import { CheckoutContext } from '../../../contexts/checkout.context';

import {
    CheckoutAddressContainer,
    CartAddressCheckbox,
    CheckoutAddressesContainer,
    CartAddressLabel,
    CartAddressTitle
} from './checkout-address.styles';

const CheckoutAddress = ({ user }) => {
    const defaultAddress = {
        address: user.billingAddress.addressOne,
        city: user.billingAddress.city,
        state: user.billingAddress.state,
        zipCode: user.billingAddress.zipCode
    };
    const [ mobileView, setMobileView ] = useState(false);
    const [ checkbox, setCheckbox ] = useState(false);

    const { billingAddress, setBillingAddress, shippingAddress, setShippingAddress } = useContext(CheckoutContext);

    useEffect(() => {
        if(window.screen.width < 500) {
            setMobileView(true);
        }
    }, []);

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
        <CheckoutAddressContainer mobileView={mobileView}>
            <CheckoutAddressesContainer mobileView={mobileView}>
                <CartAddressTitle>Billing Address</CartAddressTitle>
                <Address address={user.billingAddress} updateAddress={updateBillingAddress} />
                <CartAddressLabel>
                    <CartAddressCheckbox type={'checkbox'} value={checkbox} onClick={() => handleCheckbox()} />
                    Ship to a different address 
                </CartAddressLabel>
            </CheckoutAddressesContainer>
            <CheckoutAddressesContainer mobileView={mobileView}>
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