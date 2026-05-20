import { axiosApiClient } from "@/axios.api.client";

const URL_AWARD_DECISIONS = '/api/v1/award-decisions';

export const save = async (awardDecisionRequest) => {
    const { data } = await axiosApiClient.post(URL_AWARD_DECISIONS, awardDecisionRequest);
    return data;
}