<template>
  <ToolBarTitle
    title="My Offers">
  </ToolBarTitle>

  <v-container fluid class="d-flex align-center justify-center mt-n12">
  <v-card elevation="8" width="1000">
    <div v-if="bidderOffersStore.isEmpty">
      <EmptyTableTitle
        message="“There are no sent Offers in your list”">
      </EmptyTableTitle>
    </div>
    <div v-else>
      <OffersSummaryTable 
        companyName="Oficial Name"
        field="Field"
        price="Price"
        country="Country"
        date="Sent Date"
        status="Status"
        :offers="bidderOffersStore.offers"
        @load-more-on-scroll="loadMoreOnScroll"
        @select-offer="(offer) => openOfferDetails(offer)"
      ></OffersSummaryTable>
      
    </div>
  </v-card>
  </v-container>
</template>

<script>
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import OffersSummaryTable from "@/components/offer/childs/OffersSummaryTable.vue"
import { useBidderOffersStore } from '@/stores/offer.bidder.pegeable.store';
import { exceptionAlert } from "@/components/alerts";

export default {
    components:{
      ToolBarTitle,
      EmptyTableTitle,
      OffersSummaryTable,
  },

    data: () => ({
      bidderOffersStore: useBidderOffersStore(),
      pageSize: 10,
      loading: false,
      exceptionAlert
  }),

  methods: {
    async loadMoreOnScroll(value) {
      try {
        const target = value.target;
        const scrollPosition = target.scrollTop + target.clientHeight;
        const isBottomReached = scrollPosition >= target.scrollHeight - 50;
        const currentPage = this.bidderOffersStore.currentPage;
        const totalPages = this.bidderOffersStore.totalPages;
        if (isBottomReached && !this.loading && currentPage < totalPages) {
          this.loading = true;
          const nextPage = currentPage + 1;
          await this.bidderOffersStore.loadMoreOffers(nextPage, this.pageSize);
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.exceptionAlert.activateAlert(error);
      }
    },

    openOfferDetails(offer) {
      this.$router.push({ 
        name: "bidder-offer-details", 
        params: { offerId: offer.offerId, tenderId: tenderId } });
    }
  },

  async mounted() {
    await this.bidderOffersStore.loadOffers(this.bidderOffersStore.currentPage, this.pageSize);
  }
}
</script>