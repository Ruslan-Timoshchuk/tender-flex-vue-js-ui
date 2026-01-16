import axiosApiClient from "@/services/axios.api.client";

const URL_LOGIN = 'api/v1/authentication/login';

export const authenticate = async (authenticationRequest) => {
    const authenticationResponse = await axiosApiClient.post(`${URL_LOGIN}`, authenticationRequest);
    return authenticationResponse.data;
}