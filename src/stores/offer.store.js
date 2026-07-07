import { defineStore } from 'pinia'
import { save, loadBidderOfferDetailsById, loadContractorOfferDetailsById } from "@/services/offer.api";

export const useOfferStore = defineStore('offer', {
    state: () => ({
        item: {
            currency: {},
            companyProfile: {
                country: {},
                contactPerson: {}
            },
            bidPrice: 0,
            proposition: {}
        },
    }),


    getters: {
        offer: (state) => {
            return state.item;
        }
    },

    actions: {
        async save(offerRequest) {
            this.item = await save(offerRequest);
        },

        async loadBidderOfferDetailsById(offerId) {
            this.item = await loadBidderOfferDetailsById(offerId);
        },

        async loadContractorOfferDetailsById(offerId) {
            this.item = await loadContractorOfferDetailsById(offerId);
        }
    }
})