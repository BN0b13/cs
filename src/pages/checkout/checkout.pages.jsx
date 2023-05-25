import { useContext, useEffect, useState } from 'react';

import Button from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import CheckoutAddress from '../../components/checkout/checkout-address/checkout-address.component';
import CheckoutShipping from '../../components/checkout/checkout-shipping/checkout-shipping.component';
import CheckoutTotal from '../../components/checkout/checkout-total/checkout-total.component';

import { CheckoutContext } from '../../contexts/checkout.context';
import { UserContext } from '../../contexts/user.context';

import { setMobileView } from '../../tools/mobileView';
import Client from '../../tools/client';

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
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const checkoutSetUp = async () => {
            const checkoutSetUp = await client.checkoutSetUp();
            const cartContents = await client.getCartContents();
            let subtotalCount = 0;
            currentUser.cart.products.map(item => subtotalCount = subtotalCount + (item.quantity * cartContents.rows[0].products[0].product[0].price));
    
            setSubtotal(subtotalCount);
            setBillingAddress(currentUser.billingAddress);
            setShippingAddress(currentUser.shippingAddress);
            setDeliveryInsurance(checkoutSetUp.deliveryInsurance);
            setShippingAndHandling(checkoutSetUp.shippingAndHandling);
            setLoading(false);
        }
        if(currentUser) {
            checkoutSetUp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ currentUser ]);

    return (
        <DisplayContainer>
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