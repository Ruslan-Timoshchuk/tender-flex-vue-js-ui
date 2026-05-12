import axiosApiClient from "@/services/axios.api.client";

const URL_CONTRACTOR_COUNT = 'api/v1/tenders/contractor-count';
const URL_COUNT_ALL = 'api/v1/tenders/count-all';

export const countTendersByContractor = async (contractorId) => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_CONTRACTOR_COUNT}/${contractorId}`);
    return tendersCountResponse.data;
}

export const countAllTenders = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_COUNT_ALL}`);
    return tendersCountResponse.data;
}