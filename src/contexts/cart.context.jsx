import { createContext, useState } from "react";

import {
    addCartItem,
    deleteCartItem,
    removeCartItem
} from '../tools/cart';

export const CartContext = createContext({
    cartItems: [],
    addItemToCart: () => {},
    deleteItemFromCart: () => {},
    removeItemFromCart: () => {}
});

export const CartProvider = ({ children }) => {
    const [ cartItems, setCartItems ] = useState([]);
    
    const addItemToCart = async (productToAdd) => {
        const res = await addCartItem(productToAdd);
        setCartItems(res);
    }
        
    const deleteItemFromCart = async (cartItemToDelete) => {
        const res = await deleteCartItem(cartItemToDelete);
        setCartItems(res);
    }
    
    const removeItemFromCart = async (cartItemToRemove) => {
        const res = await removeCartItem(cartItemToRemove);
        setCartItems(res);
    }
    
    const value = { cartItems, addItemToCart, deleteItemFromCart, removeItemFromCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};