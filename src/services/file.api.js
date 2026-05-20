import axiosFileApiClient from "@/services/axios.file.api.client";

const URL_FILES = '/api/v1/files'

export const upload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axiosFileApiClient.post(URL_FILES, formData);
    return data;
}