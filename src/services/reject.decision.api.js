import axiosApiClient from "@/services/axios.api.client";

const URL_REJECT_DECISIONS = 'api/v1/reject-decisions';

export const save = async (rejectDecisionRequest) => {
    const { data } = axiosApiClient.post(URL_REJECT_DECISIONS, rejectDecisionRequest);
    return data;
} 