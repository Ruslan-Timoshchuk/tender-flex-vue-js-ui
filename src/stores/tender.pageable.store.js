import { defineStore } from 'pinia'
import { findTendersByContractor, findTendersByBidder } from '@/services/tender.api';

export const useTenderPegeableStore = defineStore('tender-pegeable', {
    state: () => ({
        tenders: []
    }),

    getters: {
        getTenders: (state) => {
            return state.tenders;
        }
    },

    actions: {
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