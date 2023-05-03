import axios from "axios";

class StoreService {
    #API_URL = "http://localhost:3000/api/store";

    async getStores() {
        const response = await axios.get(
            `${this.#API_URL}/allStores`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async getStore(storeID) {
        const response = await axios.get(
            `${this.#API_URL}/stores/${storeID}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async create(details) {
        const {
            storeName,
            storeLocation,
            inventory,
        } = details;

        const response = await axios.post(
            `${this.#API_URL}/create`,
            {
                storeName,
                storeLocation,
                inventory
            },
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

    async updateStore(details, storeID) {
        const response = await axios.put(
            `${this.#API_URL}/update/${storeID}`,
            details,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async deleteStore(storeID) {
        const response = await axios.delete(`${this.#API_URL}/delete/${storeID}`, {
            withCredentials: true,
        });

        return response.data;
    }

    //Items
    async getItem(itemID) {
        const response = await axios.get(
            `${this.#API_URL}/items/${itemID}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async getStoreInventory(storeID) {
        const response = await axios.get(
            `${this.#API_URL}/${storeID}/inventory`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async addItemToStore(details, storeID) {
        const {
            itemName,
            itemImg,
            itemDesc,
            itemCategory,
            itemPrice,
            itemStock,
            itemRestockCount,
            restockStatus,
        } = details;
        try {
            const response = await axios.put(
                `${this.#API_URL}/${storeID}/addItem`,
                {
                    itemName,
                    itemImg,
                    itemDesc,
                    itemCategory,
                    itemPrice,
                    itemStock,
                    itemRestockCount,
                    restockStatus,
                },
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (err) {
            console.log(`Error adding item to store with ID ${storeID}:`, err);
            throw err;
        }
    }

    async getItems() {
        const response = await axios.get(
            `${this.#API_URL}/item/allItems`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async restockItem(storeId, itemId) {
        const response = await axios.put(
            `${this.#API_URL}/items/restock/${storeId}/${itemId}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async updateItem(details, itemID) {
        const response = await axios.put(
            `${this.#API_URL}/items/update/${itemID}`,
            details,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async deleteItem(itemID) {
        const response = await axios.delete(`${this.#API_URL}/items/delete/${itemID}`, {
            withCredentials: true,
        });

        return response.data;
    }
}

export default new StoreService();  