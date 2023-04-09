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
    
    fetchOptions(method, body = '', withToken = false) {
        const myHeaders = new Headers();
        if(withToken) {
            myHeaders.append("Authorization", `Bearer ${this.token}`);
        }
        myHeaders.append("Accept", "Bearer application/json");
        myHeaders.append("Content-Type", "application/json");

        return {
        method,
        headers: this.myHeaders,
        body
        };
    }


    // Init client
    
    // Helper Functions
    async getAccount() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/users`, requestOptions);
        const res = await account.json();

        return res;
    }

    async addView() {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch);
        const account = await fetch(`${api}/visits`, requestOptions);
        const res = await account.json();

        return res;
    }
}