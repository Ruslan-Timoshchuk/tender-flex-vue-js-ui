import { defineStore } from 'pinia'
import { save, loadContractorTenderDetailsById, loadBidderTenderDetailsById } from '@/services/tender.api';

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
            return this.tender;
        },

        async loadContractorTenderDetailsById(tenderId) {
            this.tender = await loadContractorTenderDetailsById(tenderId);
        },

        async loadBidderTenderDetailsById(tenderId) {
            this.tender = await loadBidderTenderDetailsById(tenderId);
        } 
    }
})