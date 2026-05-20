import axios from 'axios';

export const axiosFileApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
});