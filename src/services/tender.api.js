import axiosApiClient from "@/services/axios.api.client";

const URL_TENDERS = '/api/v1/tenders'
const URL_CONTRACTOR_COUNT = 'api/v1/tenders/contractor-count';
const URL_COUNT_ALL = 'api/v1/tenders/count-all';
const URL_CONTRACTOR_TENDERS_PAGE = 'api/v1/tenders/contractor-page';
const URL_BIDDER_TENDERS_PAGE = 'api/v1/tenders/bidder-page';

export const save = async (tenderRequest) => {
    const { data } = await axiosApiClient.post(URL_TENDERS, tenderRequest);
    return data;
}

export const countTendersByContractor = async (contractorId) => {
    const { data } = await axiosApiClient.get(`${URL_CONTRACTOR_COUNT}/${contractorId}`);
    return data;
}

export const countAllTenders = async () => {
    const { data } = await axiosApiClient.get(`${URL_COUNT_ALL}`);
    return data;
}

export const findTendersByContractor = async (page, pageSize) => {
    const { data } = await axiosApiClient
        .get(`${URL_CONTRACTOR_TENDERS_PAGE}?page=${page}&pageSize=${pageSize}`);
    return data;
}

export const findTendersByBidder = async (page, pageSize) => {
    const { data } = await axiosApiClient
        .get(`${URL_BIDDER_TENDERS_PAGE}?page=${page}&pageSize=${pageSize}`);
    return data;
}