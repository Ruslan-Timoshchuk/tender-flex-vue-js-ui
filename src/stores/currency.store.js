import { defineStore } from 'pinia'
import { findAllCurrencies } from '@/services/currency.api'

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        currencies: []
    }),

    actions: {
        async loadCurrencies() {
            if (this.currencies.length === 0) {
                this.currencies = await findAllCurrencies();
            }
        }
    }

})