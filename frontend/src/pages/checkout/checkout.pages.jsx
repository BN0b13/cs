import { useContext, useEffect, useState } from 'react';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import CheckoutAddress from '../../components/checkout/checkout-address/checkout-address.component';
import CheckoutShipping from '../../components/checkout/checkout-shipping/checkout-shipping.component';
import CheckoutTotal from '../../components/checkout/checkout-total/checkout-total.component';

import { CheckoutContext } from '../../contexts/checkout.context';
import { ConfigurationContext } from '../../contexts/configuration.context';
import { UserContext } from '../../contexts/user.context';

import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

import {
    AddressContainer,
    BackButtonContainer,
    CheckoutFormsContainer,
    ContentContainer,
    DisplayContainer,
    ShippingContainer,
    PaymentContainer,
} from './checkout.styles';

const client = new Client();

const CheckoutPage = () => {
    const [ loading, setLoading ] = useState(true);

    const {
        setBillingAddress,
        setShippingAddress,
        setDeliveryInsurance,
        setShippingAndHandling,
        setSubtotal
    } = useContext(CheckoutContext);
    const { colors } = useContext(ConfigurationContext);
    const { currentUser } = useContext(UserContext);
    const { total } = useContext(CheckoutContext);

    useEffect(() => {
        const checkoutSetup = async () => {
            const checkoutSetup = await client.checkoutSetup();
            let subtotalCount = checkoutSetup.subtotal;

            setSubtotal(subtotalCount);
            setBillingAddress(currentUser.billingAddress);
            setShippingAddress(currentUser.shippingAddress);
            setDeliveryInsurance(checkoutSetup.deliveryInsurance);
            setShippingAndHandling(checkoutSetup.shippingAndHandling);
            setLoading(false);
        }
        if(currentUser) {
            checkoutSetup();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ currentUser, total ]);

    return (
        <DisplayContainer theme={colors}>
            <BackButtonContainer>
                <Button onClick={() => window.location = '/cart'}>Back To Cart</Button>
            </BackButtonContainer>
            {loading ?  
                <Spinner />
                :
                <ContentContainer setMobileView={setMobileView()}>
                    <CheckoutFormsContainer>
                        <AddressContainer>
                            <CheckoutAddress />
                        </AddressContainer>
                        <ShippingContainer>
                            <CheckoutShipping />
                        </ShippingContainer>
                    </CheckoutFormsContainer>
                    <PaymentContainer>
                        <CheckoutTotal />
                    </PaymentContainer>
                </ContentContainer>
            }
        </DisplayContainer>
    );
};

export default CheckoutPage;