import { defineStore } from 'pinia'
import { save } from '@/services/tender.api';

export const useTenderStore = defineStore('tender', {
    state: () => ({
        tenders: {}
    }),

    actions: {
        async save(tenderRequest) {
            const tender = await save(tenderRequest);
            this.tenders.unshift(tender);
            return tender;
        }
    }
})