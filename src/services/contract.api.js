import axiosApiClient from "@/services/axios.api.client";

const URL_CONTRACTS = 'api/v1/contracts';

export const save = async (contractRequest) => {
    const { data } = await axiosApiClient.post(URL_CONTRACTS, contractRequest);
    return data;
}