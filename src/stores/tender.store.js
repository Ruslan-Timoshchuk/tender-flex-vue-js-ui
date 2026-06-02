import { defineStore } from 'pinia'
import { save, findTendersByContractor, findTendersByBidder } from '@/services/tender.api';

export const useTenderStore = defineStore('tender', {
    state: () => ({
        tender: {}
    }),

    getters: {
        getTender: (state) => {
            return state.tender;
        }
    },

    actions: {
        async save(tenderRequest) {
            this.tender = await save(tenderRequest);
        },
    }
})