import axiosApiClient from "@/services/axios.api.client";

const URL_COUNT_TENDERS = 'api/v1/tenders/count';

export const countTenders = async () => {
    const tendersCountResponse = await axiosApiClient.get(`${URL_COUNT_TENDERS}`);
    return tendersCountResponse.data;
}