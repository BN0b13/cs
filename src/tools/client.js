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

    async createCustomer(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data);
        const completePasswordReset = await fetch(`${api}/user`, requestOptions);
        const res = await completePasswordReset.json();
        return res;
    }

    async getAccount() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/user`, requestOptions);
        const res = await account.json();

        return res;
    }

    async updateAccount(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
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

    async getCartContents() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const cart = await fetch(`${api}/cart/contents`, requestOptions);
        const res = await cart.json();
        return res;
    }

    async modifyCart(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const cart = await fetch(`${api}/cart`, requestOptions);
        const res = await cart.json();
        return res;
    }

    async checkoutSetUp() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const checkoutSetUp = await fetch(`${api}/checkout/set-up`, requestOptions);
        const res = await checkoutSetUp.json();
        return res;
    }

    async checkout(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const checkout = await fetch(`${api}/orders`, requestOptions);
        const res = await checkout.json();
        return res;
    }

    async getOrders() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getOrders = await fetch(`${api}/orders`, requestOptions);
        const res = await getOrders.json();
        return res;
    }

    async getOrderByRef(refId) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getOrderByRef = await fetch(`${api}/orders/${refId}`, requestOptions);
        const res = await getOrderByRef.json();
        return res;
    }

    async updateAccountPassword(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateAccountPassword = await fetch(`${api}/user/update-password`, requestOptions);
        const res = await updateAccountPassword.json();
        return res;
    }

    async passwordResetEmail(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data);
        const passwordResetEmail = await fetch(`${api}/user/reset-password`, requestOptions);
        const res = await passwordResetEmail.json();
        return res;
    }

    async completePasswordReset(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data);
        const completePasswordReset = await fetch(`${api}/user/reset-password/token`, requestOptions);
        const res = await completePasswordReset.json();
        return res;
    }

    async sendEmailVerificationEmail() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const sendEmailVerificationEmail = await fetch(`${api}/user/email-token`, requestOptions);
        const res = await sendEmailVerificationEmail.json();
        return res;
    }

    async isEmailTokenValid() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const isEmailTokenValid = await fetch(`${api}/user/email-token/verify`, requestOptions);
        const res = await isEmailTokenValid.json();
        return res;
    }

    async completeEmailVerification({ emailToken }) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const completeEmailVerification = await fetch(`${api}/user/verify-email/${emailToken}`, requestOptions);
        const res = await completeEmailVerification.json();
        return res;
    }
}