import { 
    api,
    tokenName
} from '../config';

export default class Client {
    token = localStorage.getItem(tokenName);
    fetchMethods = {
        get: 'GET',
        post: 'POST',
        patch: 'PATCH',
        delete: 'DELETE'
    }
    
    fetchOptions(method, body = null, withToken = false) {
        const headers = new Headers();
        if(withToken) {
            headers.append("Authorization", `Bearer ${this.token}`);
        }
        headers.append("Accept", "Bearer application/json");
        headers.append("Content-Type", "application/json");

        if(body) {
            return {
                method,
                headers,
                body: JSON.stringify(body)
            };
        }

        return {
            method,
            headers
        }   
    }
    
    // Helper Functions
    async getAccount() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/user`, requestOptions);
        const res = await account.json();

        return res;
    }

    async addView() {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch);
        const account = await fetch(`${api}/visits`, requestOptions);
        const res = await account.json();

        return res;
    }

    async getProducts() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products/${id}`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getCategories() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCart() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const cart = await fetch(`${api}/cart`, requestOptions);
        const res = await cart.json();
        return res;
    }

    async modifyCart(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const cart = await fetch(`${api}/cart`, requestOptions);
        const res = await cart.json();
        return res;
    }
}