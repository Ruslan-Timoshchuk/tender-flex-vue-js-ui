import axios from 'axios'

const axiosApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

export default axiosApiClient