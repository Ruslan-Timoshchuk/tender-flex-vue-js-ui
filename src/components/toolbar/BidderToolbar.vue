<template>
    <MainToolBar
      :authorities=userStore.authorities
      :tenders=bidsCounter.tenders
      :offers=bidsCounter.offers>
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