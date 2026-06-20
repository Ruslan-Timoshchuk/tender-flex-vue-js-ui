import { defineStore } from "pinia";
import { applyAwardDecision } from "@/services/award.decision.api";

export const useAwardDecisionStore = defineStore('award-decision', {
    state: () => ({}),

    actions: {
        async sendAwardDecision(awardOfferDecisionRequest) {
             return await applyAwardDecision(awardOfferDecisionRequest)
        }
    }
    
})