import { defineStore } from "pinia";
import { findOffersByContractor } from "@/services/offer.api";

export const useContractorOffersStore = defineStore('contractor-offers', {
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
            this.items.push(...content);
        },
    }
});