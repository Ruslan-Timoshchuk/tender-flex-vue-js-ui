import axios from 'axios';

const axiosFileApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
});

export default axiosFileApiClient;