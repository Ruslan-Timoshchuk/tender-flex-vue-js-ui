import axiosApiClient from "@/services/axios.api.client";

const URL_COUNTRIES_ALL = 'api/v1/countries';

export const findAllCountries = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_COUNTRIES_ALL}`);
    return tendersCountResponse.data;
}