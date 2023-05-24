import { createContext, useReducer } from "react";

// Actual value you want to access
export const CheckoutContext = createContext({
    billingAddress: null,
    setBillingAddress: () => null,
    shippingAddress: null,
    setShippingAddress: () => null,
    shipping: null,
    setShipping: () => null,
    shippingAndHandling: null,
    setShippingAndHandling: () => null,
    deliveryInsurance: null,
    setDeliveryInsurance: () => null,
    subtotal: null,
    setSubtotal: () => {},
    total: null,
    setTotal: () => null
});

export const CHECKOUT_ACTION_TYPES = {
    SET_BILLING_ADDRESS: 'SET_BILLING_ADDRESS',
    SET_SHIPPING_ADDRESS: 'SET_SHIPPING_ADDRESS',
    SET_SHIPPING: 'SET_SHIPPING',
    SET_SHIPPING_AND_HANDLING: 'SET_SHIPPING_AND_HANDLING',
    SET_DELIVERY_INSURANCE: 'SET_DELIVERY_INSURANCE',
    SET_SUBTOTAL: 'SET_SUBTOTAL',
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
    shipping: null,
    shippingAndHandling: null,
    deliveryInsurance: null,
    subtotal: null,
    total: null
}

export const CheckoutProvider = ({ children }) => {
    const [ { billingAddress, shippingAddress, shipping, shippingAndHandling, deliveryInsurance, subtotal, total }, dispatch ] = useReducer(checkoutReducer, INITIAL_STATE);

    const setBillingAddress = (billingAddress) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_BILLING_ADDRESS, payload: billingAddress });
    }

    const setShippingAddress = (shippingAddress) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_ADDRESS, payload: shippingAddress });
    }

    const setShipping = (shipping) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING, payload: shipping });
    }

    const setShippingAndHandling = (shippingAndHandling) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_SHIPPING_AND_HANDLING, payload: shippingAndHandling });
    }

    const setDeliveryInsurance = (deliveryInsurance) => {
        dispatch({ type: CHECKOUT_ACTION_TYPES.SET_DELIVERY_INSURANCE, payload: deliveryInsurance });
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
        shipping, setShipping, 
        shippingAndHandling, 
        setShippingAndHandling, 
        deliveryInsurance, 
        setDeliveryInsurance, 
        subtotal, 
        setSubtotal, 
        total, 
        setTotal 
    };

    return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}