import { defineStore } from 'pinia'
import { save } from "@/services/offer.api";

export const useOfferStore = defineStore('offer', {
    state: () => ({
        offer: {
            currency: {},
            companyProfile: {
                country: {},
                contactPerson: {}
            },
            bidPrice: 0,
            proposition: {},
        },
    }),


    getters: {
        getOffer: (state) => {
            return state.offer;
        }
    },

    actions: {
        async save(offerRequest) {
            this.offer = await save(offerRequest);
            return this.offer;
        },
    }
})