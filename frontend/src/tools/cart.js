import Client from './client';

const client = new Client();

export const getProductInventory = async (id) => {
    const res = await client.getProductById(id);
    const currentInventory = res.data.Inventories[0].quantity;

    return currentInventory;
}

export const convertProductPrice = (price) => {
    return `$${price / 100}`;
}

const confirmCartWithInventory = async (cart, product) => {
    const inventory = await getProductInventory(product.productId);
    cart.forEach(cartItem => {
        if(cartItem.productId === product.productId && cartItem.quantity > inventory) {
            cartItem.quantity = inventory;
        }
    });

    return cart;
}

export const getCartCount = async () => {
    let currentCount = 0;
    const res = await client.getCart();
    res.products.map(product => currentCount = currentCount + product.quantity);

    return {
        cart: res,
        currentCount
    };
}

export const addCartItem = async (productToAdd) => {
    const res = await client.getCart();
    const cartItems = res.products;
    const existingCartItem = cartItems.filter(
        (cartItem) => (cartItem.productId === productToAdd.productId && cartItem.inventoryId === productToAdd.inventoryId)
    );

    let cart = [...cartItems, { ...productToAdd }];

    if(existingCartItem.length > 0) {
        cart = cartItems.map(
            (cartItem) => (cartItem.productId === productToAdd.productId && cartItem.inventoryId === productToAdd.inventoryId) ? 
                    {...cartItem, quantity: (cartItem.quantity + productToAdd.quantity)} 
                : 
                    cartItem
        );
    }

    const confirmCart = await confirmCartWithInventory(cart, productToAdd);

    return await modifyCart(confirmCart);
}

export const deleteCartItem = async (cartItemToDelete) => {
    const res = await client.getCart();
    const cartItems = res.products;

    const data = cartItems.filter(cartItem => cartItem.inventoryId !== cartItemToDelete.inventoryId);
    
    return await modifyCart(data);
}

export const removeCartItem = async (cartItemToRemove) => {
    const res = await client.getCart();
    const cartItems = res.products;

    let deleteCartItemCheck = false;

    let cart = cartItems.map((cartItem) => {
        if(cartItem.inventoryId === cartItemToRemove.inventoryId) {
            if(cartItem.quantity === 1) {
                deleteCartItemCheck = true;
                return cartItem
            }
            return {...cartItem, quantity: (cartItem.quantity - 1)} 
        }
        return cartItem
    });

    if(deleteCartItemCheck) {
        cart = cartItems.filter(cartItem => cartItem.inventoryId !== cartItemToRemove.inventoryId);
    }

    return await modifyCart(cart);
}

export const modifyCart = async (data) => {
    await client.modifyCart({products: data});
    const res = await client.getCart();
    return res.products;
}