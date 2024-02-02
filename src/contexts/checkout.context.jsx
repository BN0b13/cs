import { createContext, useReducer } from "react";

// Actual value you want to access
export const CheckoutContext = createContext({
    billingAddress: null,
    setBillingAddress: () => null,
    shippingAddress: null,
    setShippingAddress: () => null,
    shippingId: null,
    setShippingId: () => null,
    shippingTotal: null,
    setShippingTotal: () => null,
    shippingAndHandling: null,
    setShippingAndHandling: () => null,
    deliveryInsurance: null,
    setDeliveryInsurance: () => null,
    sale: null,
    setSale: () => null,
    preSaleSubtotal: null,
    setPreSaleSubtotal: () => {},
    discountAmountRemoved: null,
    setDiscountAmountRemoved: () => {},
    subtotal: null,
    setSubtotal: () => {},
    total: null,
    setTotal: () => null
});

export const CHECKOUT_ACTION_TYPES = {
    SET_BILLING_ADDRESS: 'SET_BILLING_ADDRESS',
    SET_SHIPPING_ADDRESS: 'SET_SHIPPING_ADDRESS',
    SET_SHIPPING_ID: 'SET_SHIPPING_ID',
    SET_SHIPPING_TOTAL: 'SET_SHIPPING_TOTAL',
    SET_SHIPPING_AND_HANDLING: 'SET_SHIPPING_AND_HANDLING',
    SET_DELIVERY_INSURANCE: 'SET_DELIVERY_INSURANCE',
    SET_SALE: 'SET_SALE',
    SET_PRE_SALE_SUBTOTAL: 'SET_PRE_SALE_SUBTOTAL',
    SET_DISCOUNT_AMOUNT_REMOVED: 'SET_DISCOUNT_AMOUNT_REMOVED',
    SET_SUBTOTAL: 'SET_SUBTOTAL',
    SET_TOTAL: 'SET_TOTAL'
}

const checkoutReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CHECKOUT_ACTION_TYPES.SET_BILLING_ADDRESS:
            return {
                ...state,
                billingAddress: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_SHIPPING_ID:
            return {
                ...state,
                shippingId: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_SHIPPING_TOTAL:
            return {
                ...state,
                shippingTotal: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_SHIPPING_AND_HANDLING:
            return {
                ...state,
                shippingAndHandling: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_DELIVERY_INSURANCE:
            return {
                ...state,
                deliveryInsurance: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_SALE:
            return {
                ...state,
                sale: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_PRE_SALE_SUBTOTAL:
            return {
                ...state,
                preSaleSubtotal: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_DISCOUNT_AMOUNT_REMOVED:
            return {
                ...state,
                discountAmountRemoved: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_SUBTOTAL:
            return {
                ...state,
                subtotal: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_TOTAL:
            return {
                ...state,
                total: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in checkoutReducer`);
    }
}

const INITIAL_STATE = {
    billingAddress: null,
    shippingAddress: null,
    shippingId: null,
    shippingTotal: null,
    shippingAndHandling: null,
    deliveryInsurance: null,
    sale: null,
    preSaleSubtotal: null,
    discountAmountRemoved: null,
    subtotal: null,
    total: null
}

export const CheckoutProvider = ({ children }) => {
    const [ { billingAddress, shippingAddress, shippingId, shippingTotal, shippingAndHandling, deliveryInsurance, sale, preSaleSubtotal, discountAmountRemoved, subtotal, total }, dispatch ] = useReducer(checkoutReducer, INITIAL_STATE);

    const setBillingAddress = (billingAddress) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_BILLING_ADDRESS, payload: billingAddress });
    }

    const setShippingAddress = (shippingAddress) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_ADDRESS, payload: shippingAddress });
    }

    const setShippingId = (shippingId) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_ID, payload: shippingId });
    }

    const setShippingTotal = (shippingTotal) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_TOTAL, payload: shippingTotal });
    }

    const setShippingAndHandling = (shippingAndHandling) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_AND_HANDLING, payload: shippingAndHandling });
    }

    const setDeliveryInsurance = (deliveryInsurance) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_DELIVERY_INSURANCE, payload: deliveryInsurance });
    }

    const setSale = (sale) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SALE, payload: sale });
    }

    const setPreSaleSubtotal = (preSaleSubtotal) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_PRE_SALE_SUBTOTAL, payload: preSaleSubtotal });
    }

    const setDiscountAmountRemoved = (subtotal) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_DISCOUNT_AMOUNT_REMOVED, payload: subtotal });
    }

    const setSubtotal = (subtotal) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SUBTOTAL, payload: subtotal });
    }

    const setTotal = (total) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_TOTAL, payload: total });
    }

    const value = { 
        billingAddress, 
        setBillingAddress, 
        shippingAddress, 
        setShippingAddress, 
        shippingId, 
        setShippingId,
        shippingTotal,
        setShippingTotal,
        shippingAndHandling, 
        setShippingAndHandling, 
        deliveryInsurance, 
        setDeliveryInsurance, 
        sale,
        setSale,
        preSaleSubtotal,
        setPreSaleSubtotal,
        discountAmountRemoved,
        setDiscountAmountRemoved,
        subtotal, 
        setSubtotal, 
        total, 
        setTotal 
    };

    return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}