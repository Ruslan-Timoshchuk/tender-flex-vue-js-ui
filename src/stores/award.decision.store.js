import { defineStore } from "pinia";
import { applyAwardDecision, declineContract, approveContract } from "@/services/award.decision.api";

export const useAwardDecisionStore = defineStore('award-decision', {
    state: () => ({}),

    actions: {
        async sendAwardDecision(awardOfferDecisionRequest) {
             return await applyAwardDecision(awardOfferDecisionRequest)
        },

        async sendDeclineContractDecision(declineContractDecisionRequest) {
             return await declineContract(declineContractDecisionRequest)
        },

         async sendApproveContractDecision(approveContractDecisionRequest) {
             return await approveContract(approveContractDecisionRequest)
        },
    }
    
})