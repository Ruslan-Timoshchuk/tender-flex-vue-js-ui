import { defineStore } from "pinia";
import { save, applyAwardDecision } from "@/services/award.decision.api";

export const useAwardDecisionStore = defineStore('award-decision', {
    state: () => ({}),

    actions: {
        async saveAwardDecision(awardDecisionRequest) {
            return await save(awardDecisionRequest);
        },

        async sendAwardDecision(awardOfferDecisionRequest) {
             return await applyAwardDecision(awardOfferDecisionRequest)
        }
    }
    
})