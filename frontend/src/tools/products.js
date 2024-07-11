import Client from './client';

const client = new Client();

export const getProducts = async () => {
    const res = await client.getProducts();
    return res.rows;
}

export const searchProducts = async (searchTerm, page, size) => {
    const res = await client.searchProducts(searchTerm, page, size);
    return res;
}