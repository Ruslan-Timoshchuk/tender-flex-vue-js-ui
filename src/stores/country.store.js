import { defineStore } from 'pinia'
import { findAllCountries } from '@/services/country.api'

export const useCountryStore = defineStore('country', {
    state: () => ({
        countries: []
    }),

    actions: {
        async loadCountries() {
            if (this.countries.length === 0) {
                this.countries = await findAllCountries();
            }
        }
    }

})