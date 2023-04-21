import axios from "axios";

class CustomerService {
    #API_URI = "https://localhost:3000/api/customer";

    async signup(details) {
        const {
            customerName,
            customerEmail,
            password,
            customerLocation,
            customerContact,
        } = details;

        const response = await axios.post(
            `${this.#API_URI}/signup`,
            {
                customerName,
                customerEmail,
                password,
                customerLocation,
                customerContact,
            },
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

    async update(details) {
        const {
            customerName,
            customerEmail,
            password,
            customerLocation,
            customerContact,
        } = details;

        const response = await axios.post(
            `${this.#API_URI}/update`,
            {
                customerName,
                customerEmail,
                password,
                customerLocation,
                customerContact,
            },
            {
                withCredentials: true,
            }
        );
        return response.data;

    }
}

export default new CustomerService();