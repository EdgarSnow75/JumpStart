import axios from "axios";

class ItemService {
    #API_URL = "http://localhost:3000/api/items";

    async filterItems(search) {
        try {
            const response = await axios.get(`${this.#API_URL}/filter`, {
                params: { search }
            });

            return response.data.items;
        } catch (error) {
            // Handle any errors here
            console.error(error);
            throw error;
        }
    }
}

export default new ItemService();
