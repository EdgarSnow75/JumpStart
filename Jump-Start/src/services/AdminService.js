import axios from "axios";

class AdminService {
    #API_URI = "http://localhost:3000/api/admin";

    async getUsers() {
        const response = await axios.get(`${this.#API_URI}/users`, {
            withCredentials: true,
        });

        return response.data;
    }

    async getUser(id) {
        const response = await axios.get(`${this.#API_URI}/user/${id}`, {
            withCredentials: true,
        });

        return response.data;
    }

    async newUser(details, userType) {
        const response = await axios.post(
            `${this.#API_URI}/user?type=${userType}`,
            details,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async updateUser(details, userId) {
        const response = await axios.put(
            `${this.#API_URI}/user/${userId}`,
            details,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }

    async deleteUser(userId) {
        const response = await axios.delete(`${this.#API_URI}/user/${userId}`, {
            withCredentials: true,
        });

        return response.data;
    }


}
export default new AdminService();
