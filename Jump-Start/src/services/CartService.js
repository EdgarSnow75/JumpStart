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
            const response = await axios.post(
                `${this.#API_URL}/${cartID}/addItem/${itemID}`,
                itemID,
                { withCredentials: true }
            );
            return response.data;
        }
        catch (err) {
            console.log(`Error adding items to the cartID: ${cartID}`, err);
            throw err;
        }
    }

    async removeItemFromCart(cartID, itemID) {
        try {
            const response = await axios.post(
                `${this.#API_URL}/cart/${cartID}/removeItem/${itemID}`,
                { itemID },
                { withCredentials: true }
            );
            return response.data;
        }
        catch (err) {
            console.log(`Error removing items from the cartID: ${cartID}`, err);
            throw err;
        }
    }

    async getCart() {
        const response = await axios.get(`${this.#API_URL}/get`, {
            withCredentials: true,
        });
        return response.data;

    }
}

export default new CartService();
