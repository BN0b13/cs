import { createContext, useReducer } from "react";

// Actual value you want to access
export const CheckoutContext = createContext({
    billingAddress: null,
    setBillingAddress: () => null,
    shippingAddress: null,
    setShippingAddress: () => null,
    shipping: null,
    setShipping: () => null,
    deliveryInsurance: null,
    setDeliveryInsurance: () => null,
    total: null,
    setTotal: () => null
});

export const CHECKOUT_ACTION_TYPES = {
    SET_BILLING_ADDRESS: 'SET_BILLING_ADDRESS',
    SET_SHIPPING_ADDRESS: 'SET_SHIPPING_ADDRESS',
    SET_SHIPPING: 'SET_SHIPPING',
    SET_DELIVERY_INSURANCE: 'SET_DELIVERY_INSURANCE',
    SET_TOTAL: 'SET_TOTAL'
}

const checkoutReducer = (state, action) => {
    // console.log('Action: ', action);
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
        case CHECKOUT_ACTION_TYPES.SET_SHIPPING:
            return {
                ...state,
                shipping: payload
            }
        case CHECKOUT_ACTION_TYPES.SET_DELIVERY_INSURANCE:
            return {
                ...state,
                deliveryInsurance: payload
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
    shipping: null,
    deliveryInsurance: null,
    total: null
}

export const CheckoutProvider = ({ children }) => {
    const [ { billingAddress, shippingAddress, shipping, deliveryInsurance, total }, dispatch ] = useReducer(checkoutReducer, INITIAL_STATE);

    const setBillingAddress = (billingAddress) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_BILLING_ADDRESS, payload: billingAddress });
    }

    const setShippingAddress = (shippingAddress) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_ADDRESS, payload: shippingAddress });
    }

    const setShipping = (shipping) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING, payload: shipping });
    }

    const setDeliveryInsurance = (deliveryInsurance) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_DELIVERY_INSURANCE, payload: deliveryInsurance });
    }

    const setTotal = (total) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_TOTAL, payload: total });
    }

    const value = { billingAddress, setBillingAddress, shippingAddress, setShippingAddress, shipping, setShipping, deliveryInsurance, setDeliveryInsurance, total, setTotal };

    return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}