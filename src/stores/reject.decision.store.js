import { defineStore } from 'pinia'
import { save, applyRejectDecision } from '@/services/reject.decision.api'

export const useRejectDecisionStore = defineStore('reject-decision', {
    state: () => ({}),

    actions: {
        async saveRejectDecision(rejectDecisionRequest) {
            return await save(rejectDecisionRequest);
        },

        async sendRejectDecision(rejectOfferDecisionRequest) {
          return await applyRejectDecision(rejectOfferDecisionRequest);
        }
    }
    
})