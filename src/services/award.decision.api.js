import axiosApiClient from "@/services/axios.api.client";

const URL_AWARD_DECISIONS = '/api/v1/award-decisions';
const URL_AWARD_OFFER = '/api/v1/award-decisions/award-offer';

export const applyAwardDecision = async (awardOfferDecisionRequest) => {
    await axiosApiClient.patch(URL_AWARD_OFFER, awardOfferDecisionRequest);
}