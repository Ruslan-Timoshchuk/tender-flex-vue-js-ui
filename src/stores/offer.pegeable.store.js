import { defineStore } from "pinia";
import { findOffersByTender } from "@/services/offer.api";

export const useOfferPegeableStore = defineStore('offer-pegeable', {
    state: () => ({
        offers: []
    }),

    getters: {
        getOffers: (state) => {
            return state.offers
        }
    },

    actions: {
        async loadByTender(tenderId, page, pageSize) {
            const { content } = await findOffersByTender(tenderId, page, pageSize);
            this.offers = content;
        }
    }
})