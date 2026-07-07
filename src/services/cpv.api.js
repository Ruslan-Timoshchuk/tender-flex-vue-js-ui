import axiosApiClient from "@/services/axios.api.client";

const URL_CPVS_ALL = 'api/v1/cpvs';

export const findAllCpvs = async () => {
    const cpvsResponse = await axiosApiClient.get(`${URL_CPVS_ALL}`);
    return cpvsResponse.data;
}