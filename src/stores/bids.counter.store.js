import { reactive } from 'vue';
import { countTendersByContractor, countAllTenders } from "@/services/tender.api";
import { countOffersByBidder, countOffersByContractor } from "@/services/offer.api";

export const bidsCounter = reactive({
    tenders: 0,
    offers: 0,

    async loadContractorCounts(contractorId) {
        const [tenderCountResponse, offerCountResponse] = await Promise.all([
            countTendersByContractor(contractorId),
            countOffersByContractor(contractorId)
        ]);
        this.tenders = tenderCountResponse.count;
        this.offers = offerCountResponse.count;
    },

    async loadBidderCounts(bidderId) {
        const [tenderCountResponse, offerCountResponse] = await Promise.all([
            countAllTenders(),
            countOffersByBidder(bidderId)
        ]);
        this.tenders = tenderCountResponse.count;
        this.offers = offerCountResponse.count;
    },
});