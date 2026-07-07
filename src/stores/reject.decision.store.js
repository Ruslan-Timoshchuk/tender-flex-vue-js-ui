import { defineStore } from 'pinia'
import { applyRejectDecision } from '@/services/reject.decision.api'

export const useRejectDecisionStore = defineStore('reject-decision', {
    state: () => ({}),

    actions: {
        async sendRejectDecision(rejectOfferDecisionRequest) {
          return await applyRejectDecision(rejectOfferDecisionRequest);
        }
    }
    
})