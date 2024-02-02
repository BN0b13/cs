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
import { processSales } from '../../tools/sales';

const client = new Client();

const CartPage = () => {
    const [ cart, setCart ] = useState(null);
    const [ subtotal, setSubtotal ] = useState(null);
    const [ saleActive, setSaleActive ] = useState(false);
    const [ discountAmountRemoved, setDiscountAmountRemoved ] = useState(0);
    const [ preSaleSubtotal, setPreSaleSubtotal ] = useState(0);

    const { cartItems } = useContext(CartContext);
    const { colors } = useContext(ConfigurationContext);

    useEffect(() => {
        const getCart = async () => {
            const checkoutSetUp = await client.checkoutSetUp();
            const cartContents = await client.getCartContents();
            let subtotalCount = 0;
            let preSaleAmount = 0;
            
            if(checkoutSetUp.sales) {
                setSaleActive(true);
                const processSalePrice = processSales(checkoutSetUp.sales, cartContents.rows[0].products);
                subtotalCount = processSalePrice.subTotal;
                setDiscountAmountRemoved(processSalePrice.discountAmountRemoved);
                cartContents.rows[0].products.map(product => preSaleAmount = preSaleAmount + (product.quantity * product.product[0].Inventories[0].price));
            } else {
                cartContents.rows[0].products.map(product => subtotalCount = subtotalCount + (product.quantity * product.product[0].Inventories[0].price));
            }
            setPreSaleSubtotal(preSaleAmount); 
            setSubtotal(subtotalCount);
            setCart(cartContents.rows[0].products);
        }
        getCart();
    }, [ cartItems ]);
    

    return (
        <CartPageContainer theme={colors}>
            <CartPageTitle>Cart</CartPageTitle>
            { !cart ?  
                <Spinner />
            :
                cart.length === 0 ?
                    <CartPageEmpty>Your Cart is Empty</CartPageEmpty>
                :
                    <>
                        <CartItemsContainer>
                            {
                                cart.map((item, index) => 
                                    <CartItem key={index} quantity={item.quantity} product={item.product[0]} />
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