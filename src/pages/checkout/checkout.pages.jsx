import { useContext, useEffect, useState } from 'react';

import Button from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import CheckoutAddress from '../../components/checkout/checkout-address/checkout-address.component';
import CheckoutShipping from '../../components/checkout/checkout-shipping/checkout-shipping.component';
import CheckoutTotal from '../../components/checkout/checkout-total/checkout-total.component';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutContext } from '../../contexts/checkout.context';
import { UserContext } from '../../contexts/user.context';

import { shippingAndHandling } from '../../config';

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
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
    const [subtotal, setSubtotal] = useState(null);

    const { cartItems } = useContext(CartContext);
    const {
        setDeliveryInsurance,
        setShippingAndHandling
    } = useContext(CheckoutContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const checkoutSetUp = async () => {
            const checkoutSetUp = await client.checkoutSetUp();
            const getProducts = await client.getProducts();
            let subtotal = 0;
            currentUser.cart.products.map(item => {
                const product = getProducts.rows.filter(prod => prod.id === item.productId);
                subtotal = subtotal + (item.quantity * product[0].price);
            });
            setSubtotal(subtotal);
            setUser(currentUser);
            setCart(currentUser.cart.products);
            setDeliveryInsurance(checkoutSetUp.deliveryInsurance);
            setShippingAndHandling(checkoutSetUp.shippingAndHandling);
        }
        if(currentUser) {
            checkoutSetUp();
        }
    }, [ cartItems, currentUser ]);

    return (
        <DisplayContainer>
            <BackButtonContainer>
                <Button onClick={() => window.location = '/cart'}>Back To Cart</Button>
            </BackButtonContainer>
            { !cart || !user ?  
                <Spinner />
                :
                <ContentContainer setMobileView={setMobileView()}>
                    <CheckoutFormsContainer>
                        <AddressContainer>
                            <CheckoutAddress
                                user={user}
                            />
                        </AddressContainer>
                        <ShippingContainer>
                            <CheckoutShipping />
                        </ShippingContainer>
                    </CheckoutFormsContainer>
                    <PaymentContainer>
                        <CheckoutTotal
                            cart={cart}
                            user={user}
                            subtotal={subtotal}
                            shippingAndHandling={shippingAndHandling}
                        />
                    </PaymentContainer>
                </ContentContainer>
            }
        </DisplayContainer>
    );
};

export default CheckoutPage;