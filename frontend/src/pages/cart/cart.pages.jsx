import { useContext, useEffect, useState } from 'react';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import CartItem from '../../components/cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';
import { ConfigurationContext } from '../../contexts/configuration.context';

import {
    CartCollapseButtonContainer,
    CartItemsContainer,
    CartPageContainer,
    CartPageEmpty,
    CartPageTitle,
    SubtotalContainer,
    SubtotalCountContainer,
    SubtotalText,
    SubtotalMobileText
} from './cart.styles';

import { convertProductPrice } from '../../tools/cart';
import Client from '../../tools/client';
import { setMobileView } from '../../tools/mobileView';

const client = new Client();

const CartPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ cart, setCart ] = useState(null);
    const [ subtotal, setSubtotal ] = useState(null);
    const [ saleActive, setSaleActive ] = useState(false);
    const [ discountAmountRemoved, setDiscountAmountRemoved ] = useState(0);
    const [ preSaleSubtotal, setPreSaleSubtotal ] = useState(0);

    const { cartItems } = useContext(CartContext);
    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        getCart();
    }, [ cartItems ]);

    const getCart = async () => {
        setLoading(true);
        const checkoutSetup = await client.checkoutSetup();

        if(checkoutSetup.preSaleTotal) {
            setPreSaleSubtotal(checkoutSetup.preSaleTotal);
            setDiscountAmountRemoved(checkoutSetup.subtotal - checkoutSetup.preSaleTotal);
            setSaleActive(true);
        }
        setSubtotal(checkoutSetup.subtotal);
        setCart(checkoutSetup.cart.products);
        setLoading(false);
    }

    return (
        <CartPageContainer theme={colors}>
            <CartPageTitle>Cart</CartPageTitle>
            { loading ?  
                <Spinner />
            :
                cart.length === 0 ?
                    <CartPageEmpty>Your Cart is Empty</CartPageEmpty>
                :
                    <>
                        <CartItemsContainer>
                            {
                                cart.map((item, index) => 
                                    <CartItem key={index} quantity={item.quantity} product={item.product} inventoryId={item.inventory.id} />
                                )
                            }
                        </CartItemsContainer>
                        <SubtotalContainer>
                            {saleActive ?
                                setMobileView() ? 
                                    <>
                                        <SubtotalCountContainer>
                                            <SubtotalMobileText>PreSale Subtotal:</SubtotalMobileText>
                                            <SubtotalMobileText>{`$${preSaleSubtotal/100}`}</SubtotalMobileText>
                                        </SubtotalCountContainer>
                                        <SubtotalCountContainer>
                                            <SubtotalMobileText>Sale Applied:</SubtotalMobileText>
                                            <SubtotalMobileText>{discountAmountRemoved > 0 ? '- ' : ''}{`$${discountAmountRemoved/100}`}</SubtotalMobileText>
                                        </SubtotalCountContainer>
                                    </>
                                :
                                    <>
                                        <SubtotalCountContainer>
                                            <SubtotalText>PreSale Subtotal:</SubtotalText>
                                            <SubtotalText>{`$${preSaleSubtotal/100}`}</SubtotalText>
                                        </SubtotalCountContainer>
                                        <SubtotalCountContainer>
                                            <SubtotalText>Sale Applied:</SubtotalText>
                                            <SubtotalText>{discountAmountRemoved > 0 ? '- ' : ''}{`$${discountAmountRemoved/100}`}</SubtotalText>
                                        </SubtotalCountContainer>
                                    </>
                                :
                                    <>
                                    </>
                            }
                            {setMobileView() ? 
                                <SubtotalCountContainer>
                                    <SubtotalMobileText>
                                        Subtotal:
                                    </SubtotalMobileText>
                                    <SubtotalMobileText>
                                        { convertProductPrice(subtotal) }
                                    </SubtotalMobileText>
                                </SubtotalCountContainer>
                            :
                                <SubtotalCountContainer>
                                    <SubtotalText>
                                        Subtotal:
                                    </SubtotalText>
                                    <SubtotalText>
                                        { convertProductPrice(subtotal) }
                                    </SubtotalText>
                                </SubtotalCountContainer>
                            }
                        </SubtotalContainer>
                        <CartCollapseButtonContainer>
                            <Button onClick={() => window.location = '/checkout'}>Checkout</Button>
                        </CartCollapseButtonContainer>
                    </>
            }
        </CartPageContainer>
    );
};

export default CartPage;