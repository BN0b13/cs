import React, { useContext, useEffect, useState } from 'react';

import Button from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import CartTotal from '../../components/checkout/cart-total/cart-total.component';
import CheckoutAddress from '../../components/checkout/checkout-address/checkout-address.component';
import CheckoutShipping from '../../components/checkout/checkout-shipping/checkout-shipping.component';
import Collapsible from '../../components/collapsible/collapsible.component';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutContext } from '../../contexts/checkout.context';

import {
    BackButtonContainer,
    CheckoutCollapseButtonContainer,
    CheckoutPageContainer,
    CheckoutPageTitle,
} from './checkout.styles';

import { shippingAndHandling } from '../../config';

import Client from '../../tools/client';

const client = new Client();

const CheckoutPage = () => {
    const addressScroll = React.createRef();
    const shippingScroll = React.createRef();
    const totalScroll = React.createRef();

    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
    const [subtotal, setSubtotal] = useState(null);
    const [ showAddress, setShowAddress ] = useState(false);
    const [ showShipping, setShowShipping ] = useState(true);
    const [ showTotal, setShowTotal ] = useState(true);

    const { cartItems } = useContext(CartContext);
    const { 
        billingAddress,
        shippingAddress,
        shipping,
        deliveryInsurance,
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

    const checkoutInteract = (data) => {
        switch(data) {
            case 'address':
                addressScroll.current?.scrollIntoView({ behavior: 'smooth' });
                showAddressOnly();
                break
            case 'shipping':
                shippingScroll.current?.scrollIntoView({ behavior: 'smooth' });
                showShippingOnly();
                break
            case 'total':
                totalScroll.current?.scrollIntoView({ behavior: 'smooth' });
                showTotalOnly();
                break
            default:
                throw new Error('There was an error in the checkout collapsible switch statement');
        }
    }

    const showAddressOnly = () => {
        setShowAddress(false);
        setShowShipping(true);
        setShowTotal(true);
    }

    const showShippingOnly = () => {
        setShowAddress(true);
        setShowShipping(false);
        setShowTotal(true);
    }

    const showTotalOnly = () => {
        setShowAddress(true);
        setShowShipping(true);
        setShowTotal(false)
    }

    const checkout = async () => {
        // CC Payment check. If card info missing, display error
        const data = {
            products: cart,
            total,
            billingAddress,
            shippingAddress,
            shipping,
            deliveryInsurance,
        };

        const res = await client.checkout(data);

        if(res) {
            window.location ='/thankyou';
        }
    }

    return (
        <CheckoutPageContainer>
            <BackButtonContainer>
                <Button onClick={() => window.location = '/cart'}>Back To Cart</Button>
            </BackButtonContainer>
            <CheckoutPageTitle>Checkout</CheckoutPageTitle>
            { !cart ?  
                <Spinner />
            :
                <>
                     <>
                        <div ref={addressScroll}></div>
                        <Collapsible 
                            child={
                                <>
                                    <CheckoutAddress user={user} />
                                    <CheckoutCollapseButtonContainer>
                                        <Button onClick={() => checkoutInteract('shipping')}>Continue to Shipping</Button>
                                    </CheckoutCollapseButtonContainer>
                                </>
                            }
                            title={'address'}
                            showStatus={showAddress}
                            checkoutInteract={checkoutInteract}
                            
                        />
                        <div ref={shippingScroll}></div>
                        <Collapsible 
                            child={
                                <>
                                    <CheckoutShipping />
                                    <CheckoutCollapseButtonContainer>
                                        <Button onClick={() => checkoutInteract('payment')}>Continue to Payment</Button>
                                    </CheckoutCollapseButtonContainer>
                                </>
                            }
                            title={'shipping'}
                            showStatus={showShipping}
                            checkoutInteract={checkoutInteract}
                        />
                        <div ref={totalScroll}></div>
                        <Collapsible 
                            child={
                                <>
                                    <CartTotal cart={cart} subtotal={subtotal} shippingAndHandling={shippingAndHandling} />
                                    <CheckoutCollapseButtonContainer>
                                        <Button onClick={() => checkout()}>CHECKOUT</Button>
                                    </CheckoutCollapseButtonContainer>
                                </>
                            }
                            title={'total'}
                            showStatus={showTotal}
                            checkoutInteract={checkoutInteract}
                        />
                     </>
                </>
            }
        </CheckoutPageContainer>
    );
};

export default CheckoutPage;