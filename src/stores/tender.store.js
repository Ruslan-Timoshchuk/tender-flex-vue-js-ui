import { defineStore } from 'pinia'
import { save, loadTenderDetailsById } from '@/services/tender.api';

export const useTenderStore = defineStore('tender', {
    state: () => ({
        item: {
            companyProfile: {
                country: {},
                contactPerson: {}
            },
            procedure: {},
            cpv: {},
            awardDecision: {
                fileMetadata: {}
            },
            rejectDecision: {
                fileMetadata: {}
            },
            contract: {
                currency: {},
                contractType: {},
                fileMetadata: {}
            },
        },
    }),

    getters: {
        tender: (state) => {
            return state.item;
        }
    },

    actions: {
        async save(tenderRequest) {
            this.item = await save(tenderRequest);
            return this.item;
        },

        async loadTenderDetailsById(tenderId) {
            this.item = await loadTenderDetailsById(tenderId);
        }
    }
})