import axios from "axios";

class CartService {
    #API_URL = "http://localhost:3000/api/cart";

    async createCart(customerID) {
        const response = await axios.post(
            `${this.#API_URL}/create`,
            {
                customerID
            },
            {
                withCredentials: true
            },
        );
        return response.data;
    }

    async getCart(cartID) {
        const response = await axios.get(`${this.#API_URL}/carts/${cartID}`, {
            withCredentials: true,
        });
        return response.data;

    }

    async getCartByCustomer(customerID) {
        const response = await axios.get(`${this.#API_URL}/customer/cart/${customerID}`,
            {
                withCredentials: true,
            });
        return response.data;
    }

    async getAllCarts() {
        const response = await axios.get(
            `${this.#API_URL}/allCarts`,
            {
                withCredentials: true
            }
        );
        return response.data;
    }

    async updateCart(cartID, cartDetails) {

        const response = await axios.put(
            `${this.#API_URL}/update/${cartID}`,
            cartDetails,
            {
                withCredentials: true,
            }
        );
        return response.data;

    }

    async addItemToCart(cartID, itemID) {
        try {
            const response = await axios.put(
                `${this.#API_URL}/${cartID}/addItem/${itemID}`,
                { withCredentials: true }
            );
            return response.data;
        }
        catch (err) {
            console.log(`Error adding items to the cartID: ${cartID}`, err);
            throw err;
        }
    }

    async decreaseItemFromCart(cartID, itemID) {
        try {
            const response = await axios.put(
                `${this.#API_URL}/${cartID}/decreaseItem/${itemID}`,
                { withCredentials: true }
            );
            return response.data;
        }
        catch (err) {
            console.log(`Error decrease items from the cartID: ${cartID}`, err);
            throw err;
        }
    }

    async deleteItemFromCart(cartID, itemID) {
        try {
            const response = await axios.delete(`${this.#API_URL}/${cartID}/removeItem/${itemID}`,
                { withCredentials: true }
            );
            return response.data;
        }
        catch (err) {
            console.log(`Error removing items from the cartID: ${cartID}`, err);
            throw err;
        }
    }
}

export default new CartService();
