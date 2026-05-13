import axiosApiClient from "@/services/axios.api.client";

const URL_CURRENCIES_ALL = 'api/v1/currencies';

export const findAllCurrencies = async () => {
    const currenciesResponse = await axiosApiClient.get(`${URL_CURRENCIES_ALL}`);
    return currenciesResponse.data;
}