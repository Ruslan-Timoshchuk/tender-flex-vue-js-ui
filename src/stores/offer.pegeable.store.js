import { defineStore } from "pinia";
import { findOffersByTender, findOffersByContractor } from "@/services/offer.api";

export const useOfferPegeableStore = defineStore('offer-pegeable', {
    state: () => ({
        page: 0,
        pages: 0,
        items: []
    }),

    getters: {
        isEmpty: (state) => { 
            return state.items.length === 0;
        },

        offers: (state) => {
            return state.items;
        },

        currentPage: (state) => {
            return state.page;
        },

        totalPages: (state) => {
            return state.pages;
        }
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
            this.tenders.push(...content);
        },

         async loadOffersByContractor(requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByContractor(requestedPage, pageSize);
            this.page = currentPage;
            this.pages = totalPages;
            this.items = content;
        },

         async loadMoreOffersByContractor(requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByContractor(requestedPage, pageSize);
            this.page = currentPage;
            this.pages = totalPages;
            this.tenders.push(...content);
        },
    }
})