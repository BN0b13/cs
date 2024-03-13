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
import { processSales } from '../../tools/sales';

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
        setSale,
        setDiscountAmountRemoved,
        setPreSaleSubtotal,
        setSubtotal
    } = useContext(CheckoutContext);
    const { colors } = useContext(ConfigurationContext);
    const { currentUser } = useContext(UserContext);
    const { total } = useContext(CheckoutContext);

    useEffect(() => {
        const checkoutSetUp = async () => {
            const checkoutSetUp = await client.checkoutSetUp();
            const cartContents = await client.getCartContents();
            let subtotalCount = 0;

            if(cartContents.rows[0].products.length === 0) {
                window.location.href = '/shop';
                return
            }

            if(checkoutSetUp.sales) {
                const processSale = processSales(checkoutSetUp.sales, cartContents.rows[0].products);
                let calculatePreSaleSubtotal = 0;
                cartContents.rows[0].products.map(product => calculatePreSaleSubtotal = calculatePreSaleSubtotal + (product.quantity * product.product[0].Inventories[0].price));
                subtotalCount = processSale.subTotal;
                
                setSale(checkoutSetUp.sales);
                setDiscountAmountRemoved(processSale.discountAmountRemoved);
                setPreSaleSubtotal(calculatePreSaleSubtotal);
                
            } else {
                cartContents.rows[0].products.map(product => subtotalCount = subtotalCount + (product.quantity * product.product[0].Inventories[0].price));
            }

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