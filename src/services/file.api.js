import axiosFileApiClient from "@/services/axios.file.api.client";

const URL_FILES = '/api/v1/files'

export const upload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axiosFileApiClient.post(URL_FILES, formData,
        {
            headers: {
                Accept: 'application/json'
            }
        }
    );
    return data;
}

export const download = async (fileKey) => {
    const { data } = await axiosFileApiClient.get(
        `${URL_FILES}/${fileKey}`,
        {
            responseType: 'blob',
            headers: {
                Accept: 'application/pdf'
            }
        }
    );
    return data;
};