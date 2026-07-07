import { reactive } from 'vue';
import { countTendersByContractor, countAllTenders } from "@/services/tender.api";
import { countOffersByBidder, countOffersByContractor } from "@/services/offer.api";

export const bidsCounter = reactive({
    tenders: 0,
    offers: 0,

    async loadContractorCounts() {
        const [tenderCountResponse, offerCountResponse] = await Promise.all([
            countTendersByContractor(),
            countOffersByContractor()
        ]);
        this.tenders = tenderCountResponse.count;
        this.offers = offerCountResponse.count;
    },

    async loadBidderCounts() {
        const [tenderCountResponse, offerCountResponse] = await Promise.all([
            countAllTenders(),
            countOffersByBidder()
        ]);
        this.tenders = tenderCountResponse.count;
        this.offers = offerCountResponse.count;
    },
});