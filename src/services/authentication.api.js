import axiosApiClient from "@/services/axios.api.client";

const URL_LOGIN = 'api/v1/authentication/login';
const URL_LOAD_AUTHENTICATION_STATE = 'api/v1/authentication/load-authentication-state'

export const authenticate = async (authenticationRequest) => {
    const authenticationResponse = await axiosApiClient.post(`${URL_LOGIN}`, authenticationRequest);
    return authenticationResponse.data;
}

export const loadAuthenticationState = async () => {
    const authenticationStateResponse = await axiosApiClient.get(`${URL_LOAD_AUTHENTICATION_STATE}`);
    return authenticationStateResponse.data;
}