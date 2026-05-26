import { defineStore } from 'pinia'
import { save, findTendersByContractor, findTendersByBidder } from '@/services/tender.api';

export const useTenderStore = defineStore('tender', {
    state: () => ({
        tenders: []
    }),

    getters: {
        getTenders: (state) => {
            return state.tenders;
        }
    },

    actions: {
        async save(tenderRequest) {
            const tender = await save(tenderRequest);
            this.tenders.unshift(tender);
            return tender;
        },

        async loadByContractor(page, pageSize) {
            const { content } = await findTendersByContractor(page, pageSize);
            this.tenders = content;
        },

        async loadMoreByContractor(page, pageSize) {
            const { content } = await findTendersByContractor(page, pageSize);
            this.tenders.push(...content);
        },

         async loadByBidder(page, pageSize) {
            const { content } = await findTendersByBidder(page, pageSize);
            this.tenders = content;
        },

        async loadMoreByBidder(page, pageSize) {
            const { content } = await findTendersByBidder(page, pageSize);
            this.tenders.push(...content);
        }
    }
})