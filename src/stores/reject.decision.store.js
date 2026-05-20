import { defineStore } from 'pinia'
import { save } from '@/services/reject.decision.api'

export const useRejectDecisionStore = defineStore('reject-decision', {
    state: () => ({}),

    actions: {
        async saveRejectDecision(rejectDecisionRequest) {
            return await save(rejectDecisionRequest);
        }
    }
})