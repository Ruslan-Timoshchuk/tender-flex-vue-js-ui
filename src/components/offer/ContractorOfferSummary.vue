<template>
  <ToolBarTitle
    title="Offers">
  </ToolBarTitle>

  <v-container fluid class="d-flex align-center justify-center mt-n12">
  <v-card elevation="8" width="1000">
    <div v-if="contractorOffersStore.isEmpty">
      <EmptyTableTitle
        message="“There are no received Offers”">
      </EmptyTableTitle>
    </div>
    <div v-else>
      <OffersSummaryTable
        companyName="Oficial Name"
        field="Field"
        price="Price"
        country="Country"
        date="Received Date"
        status="Status"
        :offers="contractorOffersStore.offers"
        @load-more-on-scroll="loadMoreByContractor"
        @select-offer="(offer) => navigateToTender(offer.tender)"
      ></OffersSummaryTable>
    </div>
  </v-card>
  </v-container>
</template>

<script>
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import OffersSummaryTable from "@/components/offer/childs/OffersSummaryTable.vue"
import { useContractorOffersStore } from "@/stores/offer.contractor.pegeable.store"
import { exceptionAlert } from "@/components/alerts";

export default {
  components:{
    ToolBarTitle,
    EmptyTableTitle,
    OffersSummaryTable,
  },

  data: () => ({
    contractorOffersStore: useContractorOffersStore(),
    pageSize: 10,
    loading: false,
    exceptionAlert
  }),

  methods: {
    async loadMoreByContractor(value) {
      try {
        const target = value.target;
        const scrollPosition = target.scrollTop + target.clientHeight;
        const isBottomReached = scrollPosition >= target.scrollHeight - 50;
        const currentPage = this.contractorOffersStore.currentPage;
        const totalPages = this.contractorOffersStore.totalPages;
        if (isBottomReached && !this.loading && currentPage < totalPages) {
          this.loading = true;
          const nextPage = currentPage + 1;
          await this.contractorOffersStore.loadMoreOffersByContractor(nextPage, this.pageSize);
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.exceptionAlert.activateAlert(error);
      }
    }
  },

 async mounted() {
    await this.contractorOffersStore.loadOffersByContractor(this.contractorOffersStore.currentPage, this.pageSize);
  }
}
</script>
