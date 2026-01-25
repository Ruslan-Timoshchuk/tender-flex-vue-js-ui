import { reactive } from 'vue';
import { countTenders } from "@/services/tender.api";
import { countOffers } from "@/services/offer.api";

export const totalStore = reactive({
    tenders: 0,
    offers: 0,

    async refreshTotalCounts() {
        const [tenderCountResponse, offerCountResponse] = await Promise.all([
            countTenders(),
            countOffers(),
        ]);
        this.tenders = tenderCountResponse.count;
        this.offers = offerCountResponse.count;
    }
});