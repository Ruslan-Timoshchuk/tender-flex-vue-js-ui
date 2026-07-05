import axiosApiClient from "@/services/axios.api.client";

const URL_AWARD_OFFER = '/api/v1/award-decisions/award-offer';
const URL_DECLINE_CONTRACT = '/api/v1/award-decisions/decline-contract';
const URL_APPROVE_CONTRACT = '/api/v1/award-decisions/approve-contract';

export const applyAwardDecision = async (awardOfferDecisionRequest) => {
    await axiosApiClient.patch(URL_AWARD_OFFER, awardOfferDecisionRequest);
}

export const declineContract = async (declineContractDecisionRequest) => {
    await axiosApiClient.patch(URL_DECLINE_CONTRACT, declineContractDecisionRequest);
}

export const approveContract = async (approveContractDecisionRequest) => {
    await axiosApiClient.patch(URL_APPROVE_CONTRACT, approveContractDecisionRequest);
}