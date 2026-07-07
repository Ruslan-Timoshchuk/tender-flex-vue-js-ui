import axiosApiClient from "@/services/axios.api.client";

const URL_CONTRACT_TYPES_ALL = 'api/v1/contract-types';

export const findAllContractTypes = async () => {
    const cpvsResponse = await axiosApiClient.get(`${URL_CONTRACT_TYPES_ALL}`);
    return cpvsResponse.data;
}