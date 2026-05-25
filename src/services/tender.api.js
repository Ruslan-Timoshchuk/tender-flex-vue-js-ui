import axiosApiClient from "@/services/axios.api.client";

const URL_TENDERS = '/api/v1/tenders'
const URL_CONTRACTOR_COUNT = 'api/v1/tenders/contractor-count';
const URL_COUNT_ALL = 'api/v1/tenders/count-all';
const URL_CONTRACTOR_TENDERS_PAGE = 'api/v1/tenders/contractor-page';

export const save = async (tenderRequest) => {
    const tenderResponse = await axiosApiClient.post(URL_TENDERS, tenderRequest);
    return tenderResponse.data;
}

export const countTendersByContractor = async (contractorId) => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_CONTRACTOR_COUNT}/${contractorId}`);
    return tendersCountResponse.data;
}

export const countAllTenders = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_COUNT_ALL}`);
    return tendersCountResponse.data;
}

export const findTendersByContractor = async (page, pageSize) => {
    const tendersPageResponse = await axiosApiClient
        .get(`${URL_CONTRACTOR_TENDERS_PAGE}?page=${page}&pageSize=${pageSize}`);
    return tendersPageResponse.data;
}