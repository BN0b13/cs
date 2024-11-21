import CheckoutService from "../services/CheckoutService.js";

const checkoutService = new CheckoutService();

class CheckoutController {
    async checkoutSetup(req, res) {
        const { id } = req.userData;
        const data = await checkoutService.checkoutSetUp(id);
        res.send(data);
    }
}

export default CheckoutController;