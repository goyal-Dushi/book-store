import { api } from "../config/axios.config"

export const CheckoutAPI = {
    buy: async function(booksdata, userId){
        const response = await api.request({
            url: '/checkout/buy',
            method: 'POST',
            body: {
                booksdata,
                userId,
            }
        });

        return response.data;
    }
}