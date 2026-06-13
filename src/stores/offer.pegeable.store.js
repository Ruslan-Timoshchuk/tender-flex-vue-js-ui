import { defineStore } from "pinia";
import { findOffersByTender } from "@/services/offer.api";

export const useOfferPegeableStore = defineStore('offer-pegeable', {
    state: () => ({
        currentPage: 0,
        totalPages: 0,
        offers: []
    }),

    getters: {
        getOffers: (state) => {
            return state.offers;
        },

        getCurrentPage: (state) => {
            return state.currentPage;
        },

        getTotalPages: (state) => {
            return state.pages;
        }
    },

    actions: {
        async loadOffersByTender(tenderId, requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByTender(tenderId, requestedPage, pageSize);
            this.currentPage = currentPage;
            this.totalPages = totalPages;
            this.offers = content;
        },

        async loadMoreOffersByTender(tenderId, requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByTender(tenderId, requestedPage, pageSize);
            this.currentPage = currentPage;
            this.totalPages = totalPages;
            this.tenders.push(...content);
        },
    }
})