import { useContext, useState } from 'react';

import Address from '../../reusable/address/address.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { CheckoutContext } from '../../../contexts/checkout.context';
import { UserContext } from '../../../contexts/user.context';

import { setMobileView } from '../../../tools/mobileView';

import {
    CheckoutAddressContainer,
    CartAddressCheckbox,
    CheckoutAddressesContainer,
    CartAddressLabel,
    CartAddressTitle
} from './checkout-address.styles';

const CheckoutAddress = () => {
    const [ checkbox, setCheckbox ] = useState(false);

    const { 
        billingAddress,
        setBillingAddress,
        shippingAddress,
        setShippingAddress
    } = useContext(CheckoutContext);
    const { currentUser } = useContext(UserContext);

    const handleCheckbox = () => {
        setShippingAddress(currentUser.shippingAddress);
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
            {!currentUser ?
                <Spinner />
            :
            <>
                <CheckoutAddressesContainer setMobileView={setMobileView()}>
                    <CartAddressTitle>Billing Address</CartAddressTitle>
                    <Address address={currentUser.billingAddress} updateAddress={updateBillingAddress} />
                    <CartAddressLabel>
                        <CartAddressCheckbox type={'checkbox'} value={checkbox} onClick={() => handleCheckbox()} />
                        Ship to a different address 
                    </CartAddressLabel>
                </CheckoutAddressesContainer>
                <CheckoutAddressesContainer setMobileView={setMobileView()}>
                    {checkbox && 
                        <>
                            <CartAddressTitle>Shipping Address</CartAddressTitle>
                            <Address address={currentUser.shippingAddress} updateAddress={updateShippingAddress} />
                        </>
                    }
                </CheckoutAddressesContainer>
            </>
        }
        </CheckoutAddressContainer>
    )
}

export default CheckoutAddress;