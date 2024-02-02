export const processSales = (sales, products) => {
    let subTotal = 0;
    let productCount = 0;
    let discountAmountRemoved = 0;

    products.map(product => {
        subTotal = subTotal + (product.quantity * product.product[0].Inventories[0].price);
        productCount = productCount + product.quantity;
    });

    if(sales[0].type === 'bogo' && productCount > 1) {
        const price = products[0].product[0].Inventories[0].price;
        subTotal = price * Math.floor(productCount/2);
        discountAmountRemoved = (price * productCount) - subTotal;
        
        if(productCount%2 !== 0) {
            subTotal = subTotal + price;
            discountAmountRemoved = discountAmountRemoved - price;
        }
    }

    return {
        discountAmountRemoved,
        subTotal
    };
}