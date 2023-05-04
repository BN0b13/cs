import Client from './client';

const client = new Client();

export const getProductInventory = async (id) => {
    const res = await client.getProductById(id);
    return res.rows[0].Inventories.length;
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
    res.rows[0].products.map(product => currentCount = currentCount + product.quantity);
    return currentCount;
}

export const addCartItem = async (productToAdd) => {
    const res = await client.getCart();
    const cartItems = res.rows[0].products;
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.productId === productToAdd.productId
    );

    let cart = [...cartItems, { ...productToAdd }];

    if(existingCartItem) {
        cart = cartItems.map(
            (cartItem) => cartItem.productId === productToAdd.productId ? 
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
    const cartItems = res.rows[0].products;

    const data = cartItems.filter(cartItem => cartItem.productId !== cartItemToDelete.productId);
    
    return await modifyCart(data);
}

export const removeCartItem = async (cartItemToRemove) => {
    const res = await client.getCart();
    const cartItems = res.rows[0].products;

    let deleteCartItemCheck = false;

    let cart = cartItems.map((cartItem) => {
        if(cartItem.productId === cartItemToRemove.productId) {
            if(cartItem.quantity === 1) {
                deleteCartItemCheck = true;
                return cartItem
            }
            return {...cartItem, quantity: (cartItem.quantity - 1)} 
        }
        return cartItem
    });

    if(deleteCartItemCheck) {
        cart = cartItems.filter(cartItem => cartItem.productId !== cartItemToRemove.productId);
    }

    return await modifyCart(cart);
}

export const modifyCart = async (data) => {
    await client.modifyCart({products: data});
    const res = await client.getCart();
    return res.rows[0].products;
}