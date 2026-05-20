import { defineStore } from "pinia";
import { axiosFileApiClient } from "@/services/axios.file.api.client";

export const useFileStore = defineStore('file', {
    state: () => ({}),

    actions: {
        async uploadFile(file) {
            return await axiosFileApiClient.upload(file);
        }
    }
})