import axiosApiClient from "@/services/axios.api.client";

const URL_REJECT_DECISIONS = 'api/v1/reject-decisions';
const URL_REJECT_OFFER = "api/v1/reject-decisions/reject-offer"

export const applyRejectDecision = async (rejectOfferDecisionRequest) => {
    axiosApiClient.patch(URL_REJECT_OFFER, rejectOfferDecisionRequest);
}