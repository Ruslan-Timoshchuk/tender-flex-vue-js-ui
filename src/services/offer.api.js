import axiosApiClient from "@/services/axios.api.client";

const URL_OFFERS = 'api/v1/offers';
const URL_CONTRACTOR_OFFER_DETAILS = "api/v1/offers/contractor-details";
const URL_BIDDER_COUNT = 'api/v1/offers/bidder-count';
const URL_CONTRACTOR_COUNT = 'api/v1/offers/contractor-count';
const URL_TENDER_OFFERS_PAGE = 'api/v1/offers/tender-page';

export const save = async (offerRequest) => {
    await axiosApiClient.post(`${URL_OFFERS}`, offerRequest);
}

export const countOffersByBidder = async () => {
    const { data } = await axiosApiClient.get(`${URL_BIDDER_COUNT}`);
    return data;
}

export const countOffersByContractor = async () => {
    const { data } = await axiosApiClient.get(`${URL_CONTRACTOR_COUNT}`);
    return data;
}

export const findOffersByTender = async (tenderId, requestedPage, pageSize) => {
    const { data } = await axiosApiClient
        .get(`${URL_TENDER_OFFERS_PAGE}/${tenderId}?requestedPage=${requestedPage}&pageSize=${pageSize}`);
    return data;
}

export const findContractorOfferDetailsById = async (offerId) => {
    const { data } = await axiosApiClient.get(`${URL_CONTRACTOR_OFFER_DETAILS}/${offerId}`);
    return data;
}