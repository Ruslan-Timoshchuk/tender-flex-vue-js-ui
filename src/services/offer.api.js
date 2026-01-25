import axiosApiClient from "@/services/axios.api.client";

const URL_COUNT_OFFERS = 'api/v1/offers/count';

export const countOffers = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_COUNT_OFFERS}`);
    return tendersCountResponse.data;
}