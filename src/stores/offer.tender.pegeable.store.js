import { defineStore } from "pinia";
import { findOffersByTender } from "@/services/offer.api";

export const useTenderOffersStore = defineStore('tender-offers', {
    state: () => ({
        page: 0,
        pages: 0,
        items: []
    }),

    getters: {
        offers: (state) => state.items,
        currentPage: (state) => state.page,
        totalPages: (state) => state.pages,
        isEmpty: (state) => state.items.length === 0
    },

    actions: {
        async loadOffersByTender(tenderId, requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByTender(tenderId, requestedPage, pageSize);
            this.page = currentPage;
            this.pages = totalPages;
            this.items = content;
        },

        async loadMoreOffersByTender(tenderId, requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByTender(tenderId, requestedPage, pageSize);
            this.page = currentPage;
            this.pages = totalPages;
            this.items.push(...content);
        }
    }
})