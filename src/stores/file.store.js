import { defineStore } from "pinia";
import { upload } from "@/services/file.api"

export const useFileStore = defineStore('file', {
    state: () => ({}),

    actions: {
        async uploadFile(file) {
            return await upload(file);
        }
    }
})