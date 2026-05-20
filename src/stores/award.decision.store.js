import { defineStore } from "pinia";
import { save } from "@/services/award.decision.api";

export const useAwardDecisionStore = defineStore('award-decision', {
    state: () => ({}),

    actions: {
        async saveAwardDecision(awardDecisionRequest) {
            return await save(awardDecisionRequest);
        }
    }
})