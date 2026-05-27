import axiosApiClient from "@/services/axios.api.client";

const URL_BIDDER_COUNT = 'api/v1/offers/bidder-count';
const URL_CONTRACTOR_COUNT = 'api/v1/offers/contractor-count';

export const countOffersByBidder = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_BIDDER_COUNT}`);
    return tendersCountResponse.data;
}

export const countOffersByContractor = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_CONTRACTOR_COUNT}`);
    return tendersCountResponse.data;
}