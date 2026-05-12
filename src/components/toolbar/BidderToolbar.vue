<template>
    <MainToolBar
      tendersRouteName='bidder-tenders'
      :tenders=bidsCounter.tenders
      offersRouteName='bidder-offers'
      :offers=bidsCounter.offers
      :authorities=userStore.authorities>
    </MainToolBar>
</template>

<script>
import MainToolBar from '@/components/toolbar/MainToolBar.vue';
import { bidsCounter } from "@/stores/bids.counter.store";
import { useUserStore } from "@/stores/user.store";

export default {
    components: {
        MainToolBar
    },

    setup() {
        const userStore = useUserStore()
        return { userStore }
    },

    data: () => ({
        bidsCounter
    }),

    async mounted() {
        await this.bidsCounter.loadBidderCounts(this.userStore.id);
    }

}
</script>