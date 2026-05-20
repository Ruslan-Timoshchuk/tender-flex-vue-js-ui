import { defineStore } from 'pinia'
import { save } from '@/services/contract.api'

export const useContractStore = defineStore('contract', {
    state: () => ({}),

    actions: {
        async saveContract(contractRequest) {
            return await save(contractRequest);
        }
    }
})