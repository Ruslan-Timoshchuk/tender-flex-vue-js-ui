import { defineStore } from "pinia";
import { findOffersByBidder } from "@/services/offer.api";

export const useBidderOffersStore = defineStore('bidder-offers', {
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
        async loadOffers(requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByBidder(requestedPage, pageSize);
            this.page = currentPage;
            this.pages = totalPages;
            this.items = content;
        },

         async loadMoreOffers(requestedPage, pageSize) {
            const { currentPage, totalPages, content } = await findOffersByBidder(requestedPage, pageSize);
            this.page = currentPage;
            this.pages = totalPages;
            this.items.push(...content);
        },
    }
});