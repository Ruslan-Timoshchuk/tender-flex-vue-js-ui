import axiosApiClient from "@/services/axios.api.client";

const URL_BIDDER_COUNT = 'api/v1/offers/bidder-count';
const URL_CONTRACTOR_COUNT = 'api/v1/offers/contractor-count';

export const countOffersByBidder = async (bidderId) => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_BIDDER_COUNT}/${bidderId}`);
    return tendersCountResponse.data;
}

export const countOffersByContractor = async (contractorId) => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_CONTRACTOR_COUNT}/${contractorId}`);
    return tendersCountResponse.data;
}