import { defineStore } from 'pinia'
import { findAllCpvs } from '@/services/cpv.api'

export const useCpvStore = defineStore('cpv', {
    state: () => ({
        cpvs: []
    }),

    actions: {
        async loadCpvs() {
            if (this.cpvs.length === 0) {
                this.cpvs = await findAllCpvs();
            }
        }
    }

})