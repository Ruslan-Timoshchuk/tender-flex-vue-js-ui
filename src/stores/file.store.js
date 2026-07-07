import { defineStore } from "pinia";
import { upload, download } from "@/services/file.api"

export const useFileStore = defineStore('file', {
    state: () => ({}),

    actions: {
        async uploadFile(file) {
            return await upload(file);
        },

        async downloadFile(fileKey) {
            return await download(fileKey);
        }
    }
})