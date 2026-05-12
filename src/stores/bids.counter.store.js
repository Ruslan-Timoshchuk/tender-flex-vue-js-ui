import { reactive } from 'vue';
import { countTendersByContractor, countAllTenders } from "@/services/tender.api";
import { countOffersByBidder, countOffersByContractor } from "@/services/offer.api";
import { useUserStore } from '@/stores/user.store';

export const bidsCounter = reactive({
    tenders: 0,
    offers: 0,

    async refreshTotalCounts() {
        const userStore = useUserStore();
        if (userStore.isContractor) {
            const contractorId = userStore.id;
            await this.fetchInPromiseAll(
                () => countTendersByContractor(contractorId), 
                () => countOffersByContractor(contractorId));
               
        } else if (userStore.isBidder) {
            const bidderId = userStore.id;
            await this.fetchInPromiseAll(
                () => countAllTenders(), 
                () => countOffersByBidder(bidderId));
        }
    },

    async fetchInPromiseAll(countTenders, countOffers) {
        const [tenderCountResponse, offerCountResponse] = await Promise.all([
            countTenders(),
            countOffers(),
        ]);
        this.tenders = tenderCountResponse.count;
        this.offers = offerCountResponse.count;
    }
});