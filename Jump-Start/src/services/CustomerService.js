import axios from "axios";

class CustomerService {
    #API_URI = "http://localhost:3000/api/customer";

    async signup(details) {
        const {
            customerName,
            emailAddress,
            password,
            customerLocation,
            customerContact,
        } = details;

        const response = await axios.post(
            `${this.#API_URI}/signup`,
            {
                customerName,
                emailAddress,
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
            emailAddress,
            password,
            customerLocation,
            customerContact,
        } = details;

        const response = await axios.put(
            `${this.#API_URI}/update`,
            {
                customerName,
                emailAddress,
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