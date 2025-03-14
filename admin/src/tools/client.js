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
    
    fetchOptions(method, body = null, withToken = false, image = false) {
        let modifiedBody = JSON.stringify(body);
        const headers = new Headers();
        if(withToken) {
            headers.append("Authorization", `Bearer ${this.token}`);
            headers.append("Access-Control-Request-Method", `${method}`);
            headers.append("Access-Control-Request-Headers", 'origin, x-requested-with');
            headers.append("Origin", "https://admin.cosmicstrains.com");
        }
        if(image) {
            modifiedBody = body;
        } else {
            headers.append("Accept", "Bearer application/json");
            headers.append("Content-Type", "application/json");
        }

        if(body) {
            return {
                method,
                headers,
                body: modifiedBody
            };
        }

        return {
            method,
            headers
        }   
    }

    // Accounts

    async getAccountById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/user/${id}`, requestOptions);
        const res = await account.json();
        return res;
    }

    async getAccountByPasswordToken(passwordToken) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/account/activate/${passwordToken}`, requestOptions);
        const res = await account.json();
        return res;
    }

    async getAccount() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/user/account`, requestOptions);
        const res = await account.json();

        return res;
    }

    async getAccounts() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/users`, requestOptions);
        const res = await account.json();
        return res;
    }

    async searchAccounts(params) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const search = await fetch(`${api}/admin/users/search${params}`, requestOptions);
        const res = await search.json();
        return res;
    }

    async createAccount(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const account = await fetch(`${api}/admin/user/accounts`, requestOptions);
        const res = await account.json();
        return res;
    }

    async activateAdminCreatedAccount(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data);
        const categories = await fetch(`${api}/account/activate`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async updateAccount(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const account = await fetch(`${api}/admin/users`, requestOptions);
        const res = await account.json();

        return res;
    }

    async updateAccountPassword(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateAccountPassword = await fetch(`${api}/user/update-password`, requestOptions);
        const res = await updateAccountPassword.json();
        return res;
    }

    async deleteAccount() {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, '', true);
        const deleteAccountRes = await fetch(`${api}/user/delete-account`, requestOptions);
        const res = await deleteAccountRes.json();
        return res;
    }

    // Categories

    async getAllCategories(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const categories = await fetch(`${api}/admin/categories${query}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoryById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories/${id}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoriesByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories/type/${type}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async createCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async addCategoryImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true, true);
        const categories = await fetch(`${api}/admin/categories/images/thumbnail`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async updateCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async deleteCategoryThumbnail(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const categories = await fetch(`${api}/admin/categories/images/thumbnail/delete`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async deleteCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    // Company

    async getCompanies(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const companies = await fetch(`${api}/admin/companies${query}`, requestOptions);
        const res = await companies.json();
        return res;
    }

    async getCompany() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const companies = await fetch(`${api}/admin/company`, requestOptions);
        const res = await companies.json();
        return res;
    }

    async getCompanyById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const company = await fetch(`${api}/admin/companies/${id}`, requestOptions);
        const res = await company.json();
        return res;
    }

    async createContributorCompany(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const company = await fetch(`${api}/admin/company`, requestOptions);
        const res = await company.json();
        return res;
    }

    async addCompanyLogo(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const companyLogo = await fetch(`${api}/admin/companies/logo`, requestOptions);
        const res = await companyLogo.json();
        return res;
    }

    async updateCompany(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const companies = await fetch(`${api}/admin/companies`, requestOptions);
        const res = await companies.json();
        return res;
    }

    async deleteCompany(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const company = await fetch(`${api}/admin/companies`, requestOptions);
        const res = await company.json();
        return res;
    }

    async deleteCompanyLogo(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const company = await fetch(`${api}/admin/companies/logo`, requestOptions);
        const res = await company.json();
        return res;
    }

    // Configuration

    async configuration() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const configuration = await fetch(`${api}/configuration`, requestOptions);
        const res = await configuration.json();
        return res;
    } 

    async getWelcomeImages() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeImage = await fetch(`${api}/welcome/images`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async postWelcomeImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postWelcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await postWelcomeImage.json();
        return res;
    }

    async updateWelcomeImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    async deleteImages(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const welcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await welcomeImage.json();
        return res;
    }

    async getWelcomeContent() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeContent = await fetch(`${api}/welcome/content`, requestOptions);
        const res = await getWelcomeContent.json();
        return res;
    }

    // Customers

    async getCustomers() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const customers = await fetch(`${api}/admin/customers`, requestOptions);
        const res = await customers.json();
        return res;
    }

    async getCustomersByDateRange(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const customers = await fetch(`${api}/admin/customers/date`, requestOptions);
        const res = await customers.json();
        return res;
    }

    // Employees

    async getEmployees() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const customers = await fetch(`${api}/admin/employees`, requestOptions);
        const res = await customers.json();
        return res;
    }

    // Giveaway

    async getGiveawaySignUp(amount = 1) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const giveaway = await fetch(`${api}/admin/giveaway/signup/today/${amount}`, requestOptions);
        const res = await giveaway.json();
        return res;
    }

    async getGiveaways() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const giveaways = await fetch(`${api}/admin/giveaways`, requestOptions);
        const res = await giveaways.json();
        return res;
    }

    async getGiveawayById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const giveaway = await fetch(`${api}/admin/giveaways/${id}`, requestOptions);
        const res = await giveaway.json();
        return res;
    }

    async createGiveaway(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const giveaway = await fetch(`${api}/admin/giveaways`, requestOptions);
        const res = await giveaway.json();
        return res;
    }

    async updateGiveaway(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const giveaway = await fetch(`${api}/admin/giveaways`, requestOptions);
        const res = await giveaway.json();
        return res;
    }

    async deleteGiveaway(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const giveaway = await fetch(`${api}/admin/giveaways`, requestOptions);
        const res = await giveaway.json();
        return res;
    }

    // GR Server

    async getGRServerHealth() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const health = await fetch(`${api}/admin/gr-server`, requestOptions);
        
        if(health?.status === 500) {
            return { status: 500 }
        }
        
        const res = await health.json();
        return res;
    }

    async outletStatus() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const outletStatus = await fetch(`${api}/admin/gr-server/outlet-status`, requestOptions);
        const res = await outletStatus.json();
        return res;
    }

    async cyclePowerOnOff(time = 10000) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const cyclePowerOnOff = await fetch(`${api}/admin/gr-server/cycle-outlet/on-off?time=${time}`, requestOptions);
        const res = await cyclePowerOnOff.json();
        return res;
    }

    async getGRServerLogs(query) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const logs = await fetch(`${api}/admin/gr-server/logs${query}`, requestOptions);
        const res = await logs.json();
        return res;
    }

    async deleteGRServerLogById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, '', true);
        const log = await fetch(`${api}/admin/gr-server/logs/${id}`, requestOptions);
        const res = await log.json();
        return res;
    }

    // Inventory

    async getInventory() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async getInventoryById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/inventory/id`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async createInventory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async updateInventory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async deleteInventory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    // Login

    async login(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const login = await fetch(`${api}/admin/login`, requestOptions);
        const res = await login.json();
        return res;
    }

    // Media

    async getMedia() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getMedia = await fetch(`${api}/admin/media`, requestOptions);
        const res = await getMedia.json();
        return res;
    }

    async getMediaById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getMediaById = await fetch(`${api}/admin/media/${id}`, requestOptions);
        const res = await getMediaById.json();
        return res;
    }

    async changeMediaActivationStatus(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const changeMediaStatus = await fetch(`${api}/admin/media/activate`, requestOptions);
        const res = await changeMediaStatus.json();
        return res;
    }

    async postMediaAudio(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postAudio = await fetch(`${api}/admin/media/audio`, requestOptions);
        const res = await postAudio.json();
        return res;
    }

    async postMediaVideo(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postVideo = await fetch(`${api}/admin/media/video`, requestOptions);
        const res = await postVideo.json();
        return res;
    }

    async postMediaYoutube(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const postYoutube = await fetch(`${api}/admin/media/youtube`, requestOptions);
        const res = await postYoutube.json();
        return res;
    }

    async updateMedia(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchMedia = await fetch(`${api}/admin/media`, requestOptions);
        const res = await patchMedia.json();
        return res;
    }

    async deleteMedia(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const deleteMedia = await fetch(`${api}/admin/media`, requestOptions);
        const res = await deleteMedia.json();
        return res;
    }

    // Messages

    async getMessages() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/messages`, requestOptions);
        const res = await account.json();
        return res;
    }

    async getMessageById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/messages/${id}`, requestOptions);
        const res = await account.json();
        return res;
    }

    async updateMessage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/messages`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    // Orders

    async getOrdersByStatus(status = 'new') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const orders = await fetch(`${api}/admin/orders/status/${status}`, requestOptions);
        const res = await orders.json();
        return res;
    }

    async getOrders(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const orders = await fetch(`${api}/admin/orders${query}`, requestOptions);
        const res = await orders.json();
        return res;
    }

    async getOrderByRefId(refId) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const orders = await fetch(`${api}/admin/orders/search/ref-id/${refId}`, requestOptions);
        const res = await orders.json();
        return res;
    }

    async getOrdersByDateRange(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const orders = await fetch(`${api}/admin/orders/date`, requestOptions);
        const res = await orders.json();
        return res;
    }

    async updateOrder(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchOrder = await fetch(`${api}/admin/orders`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    async cancelOrder(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, '', true);
        const patchOrder = await fetch(`${api}/admin/orders/cancel/${id}`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    async sendPaymentLink(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchOrder = await fetch(`${api}/admin/orders/payment-link`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    async shipOrder(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchOrder = await fetch(`${api}/admin/orders/ship`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    // Pages

    async getPages(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const pages = await fetch(`${api}/admin/pages${query}`, requestOptions);
        const res = await pages.json();
        return res;
    }

    async getPagesByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const pagesByType = await fetch(`${api}/admin/pages/type/${type}`, requestOptions);
        const res = await pagesByType.json();
        return res;
    }

    // Products

    async getProducts(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const products = await fetch(`${api}/admin/products${query}`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductsByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products/type/${type}`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const product = await fetch(`${api}/products/id/${id}`, requestOptions);
        const res = await product.json();
        return res;
    }

    async getProductInventory() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/products`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async getProductsByCategoryId(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const products = await fetch(`${api}/admin/products/category/${id}`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductTypes() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const productTypes = await fetch(`${api}/admin/products/product-types`, requestOptions);
        const res = await productTypes.json();
        return res;
    }

    async getProductProfiles() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const productProfiles = await fetch(`${api}/products/profiles/all`, requestOptions);
        const res = await productProfiles.json();
        return res;
    }

    async createProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const product = await fetch(`${api}/admin/products`, requestOptions);
        const res = await product.json();
        return res;
    }

    async createProductProfile(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const productProfile = await fetch(`${api}/admin/products/profiles`, requestOptions);
        const res = await productProfile.json();
        return res;
    }

    async addProductImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true, true);
        const productImage = await fetch(`${api}/admin/products/images`, requestOptions);
        const res = await productImage.json();
        return res;
    }

    async updateProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateProduct = await fetch(`${api}/admin/products`, requestOptions);
        const res = await updateProduct.json();
        return res;
    }

    async deleteProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const deleteProduct = await fetch(`${api}/admin/products`, requestOptions);
        const res = await deleteProduct.json();
        return res;
    }

    async deleteProductImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const deleteProductImage = await fetch(`${api}/admin/products/product-image`, requestOptions);
        const res = await deleteProductImage.json();
        return res;
    }

    // Raffles

    async getRaffles(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const raffles = await fetch(`${api}/admin/raffles${query}`, requestOptions);
        const res = await raffles.json();
        return res;
    }

    async getRaffleById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const raffle = await fetch(`${api}/admin/raffles/${id}`, requestOptions);
        const res = await raffle.json();
        return res;
    }

    async createRaffle(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const raffle = await fetch(`${api}/admin/raffles`, requestOptions);
        const res = await raffle.json();
        return res;
    }

    async updateRaffle(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateRaffle = await fetch(`${api}/admin/raffles`, requestOptions);
        const res = await updateRaffle.json();
        return res;
    }

    async deleteRaffle(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const deleteProduct = await fetch(`${api}/admin/raffles`, requestOptions);
        const res = await deleteProduct.json();
        return res;
    }

    // Roles

    async getRoles() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const roles = await fetch(`${api}/admin/roles`, requestOptions);
        const res = await roles.json();
        return res;
    }

    // Sales

    async getSales() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const sales = await fetch(`${api}/admin/sales`, requestOptions);
        const res = await sales.json();
        return res;
    }

    async createSale(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const product = await fetch(`${api}/admin/sales`, requestOptions);
        const res = await product.json();
        return res;
    }

    async updateSale(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateSale = await fetch(`${api}/admin/sales`, requestOptions);
        const res = await updateSale.json();
        return res;
    }

    async changeSaleActivationStatus(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateSale = await fetch(`${api}/admin/sales/activation`, requestOptions);
        const res = await updateSale.json();
        return res;
    }

    // Users

    async getUsers(query = '') {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const users = await fetch(`${api}/admin/users${query}`, requestOptions);
        const res = await users.json();
        return res;
    }

    // Views

    async getViews() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const views = await fetch(`${api}/admin/visits`, requestOptions);
        const res = await views.json();
        return res;
    }

    async getViewsByDateRange(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const views = await fetch(`${api}/admin/visits/date`, requestOptions);
        const res = await views.json();
        return res;
    }
}