import { useContext, useEffect, useState } from 'react';

import Button from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import CheckoutAddress from '../../components/checkout/checkout-address/checkout-address.component';
import CheckoutShipping from '../../components/checkout/checkout-shipping/checkout-shipping.component';
import CheckoutTotal from '../../components/checkout/checkout-total/checkout-total.component';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutContext } from '../../contexts/checkout.context';

import {
    AddressContainer,
    BackButtonContainer,
    CheckoutFormsContainer,
    ContentContainer,
    DisplayContainer,
    ShippingContainer,
    PaymentContainer,
} from './checkout.styles';

import { shippingAndHandling } from '../../config';

import Client from '../../tools/client';

const client = new Client();

const CheckoutPage = () => {

    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
    const [subtotal, setSubtotal] = useState(null);

    const { cartItems } = useContext(CartContext);
    const {
        total
    } = useContext(CheckoutContext);

    useEffect(() => {
        const getCart = async () => {
            const getUser = await client.getAccount();
            setUser(getUser);
            const getProducts = await client.getProducts();
            const res = await client.getCart();
            let total = 0;
            res.rows[0].products.map(item => {
                const product = getProducts.rows.filter(prod => prod.id === item.productId);
                total = total + (item.quantity * product[0].price);
            });
            setSubtotal(total);
            setCart(res.rows[0].products);
        }
        getCart();
    }, [ cartItems ]);

    return (
        <DisplayContainer>
            <BackButtonContainer>
                <Button onClick={() => window.location = '/cart'}>Back To Cart</Button>
            </BackButtonContainer>
            { !cart ?  
                <Spinner />
                :
                <ContentContainer>
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