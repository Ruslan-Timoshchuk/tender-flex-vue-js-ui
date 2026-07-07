import { defineStore } from 'pinia'
import { findAllContractTypes } from '@/services/contract.type.api'

export const useContractTypeStore = defineStore('contract-type', {
    state: () => ({
        contractTypes: []
    }),

    actions: {
        async loadContractTypes() {
            if (this.contractTypes.length === 0) {
                this.contractTypes = await findAllContractTypes();
            }
        }
    }

})