<template>
    <MainToolBar 
      tendersRouteName='contractor-tenders'
      :tenders=bidsCounter.tenders
      offersRouteName='contractor-offers'
      :offers=bidsCounter.offers
      :authorities=userStore.authorities>
        <template #actions>
            <v-chip 
              v-if="showNewTenderBtn"
              :to="{ name: 'new-tender' }" 
              variant="flat" 
              color="indigo-darken-4" 
              class="my-2 mr-6"
              > + Create new Tender
            </v-chip>
        </template>
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
        await this.bidsCounter.loadContractorCounts(this.userStore.id);
    },

    computed: {
        showNewTenderBtn() {
            return this.$route.name !== 'new-tender';
        }
    }
}
</script>