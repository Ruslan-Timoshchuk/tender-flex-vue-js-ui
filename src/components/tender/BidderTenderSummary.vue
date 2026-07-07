<template>
  <ToolBarTitle 
    title="Tenders">
  </ToolBarTitle>

  <v-container fluid class="d-flex align-center justify-center mt-n12">
    <v-card elevation="8" width="1000">
      <div v-if="isTenders">
        <TableHeader 
          field="Field" 
          companyName="Contractor Name" 
          tenderStatus="Tender Status" 
          deadline="Deadline"
          offerData="Offer Status">
        </TableHeader>
        <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto"
          v-scroll:#scroll-target="onScroll">
          <v-sheet v-for="tender in tenderPegeableStore.getTenders" :key="tender.id">       
            <v-sheet :class="{
              'table-row': tender.tenderStatusName === 'TENDER_IN_PROGRESS',
              'table-row disabled': tender.tenderStatusName === 'TENDER_CLOSED'
            }">
              <td class="v-col-4">
                <div class="cpv-code"><strong @click="openTenderDetails(tender)">{{ tender.cpvCode }}</strong>
                </div>
                <div class="cpv-text"><strong>{{ tender.fieldOfTheTender }}</strong></div>
              </td>
              <td class="v-col-2 text-center">{{ tender.contractorName }}</td>
              <td class="v-col-2 text-center">{{ tender.tenderStatusLabel }}</td>
              <td class="v-col-2 text-center">{{ tender.offerSubmissionDeadline }}</td>
              <td class="v-col-2 ml-6 text-left">{{ tender.offerStatusLabel }}</td>    
            </v-sheet>
          </v-sheet>
        </v-container>
      </div>
      <EmptyTableTitle 
        v-else message="“There are no available Tenders.”">
      </EmptyTableTitle>
    </v-card>
    <v-snackbar v-model="offerSubmissionInfo" :timeout="3000" color="blue-grey" rounded="pill">
      An offer has already been submitted for this tender.
      For detailed information, please go to the Offers tab.
    </v-snackbar>
  </v-container>

  <router-view />
</template>

<script>
import { useTenderPegeableStore } from "@/stores/tender.pageable.store"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import TableHeader from "@/components/tender/childs/TableHeader.vue"

export default {
  components: {
    ToolBarTitle,
    EmptyTableTitle,
    TableHeader
  },

  data: () => ({
    offerSubmissionInfo: false,
    tenderPegeableStore: useTenderPegeableStore(),
    loading: false,
    bottom: 285,
    page: 1,
    pageSize: 10,
    pages: 1
  }),

  methods: {
    onScroll(e) {
      try {
        const currentPage = Math.ceil(e.target.scrollTop / this.bottom);
        if (currentPage === this.page && !this.loading && this.page <= this.pages) {
          this.loading = true
          this.page++;
          this.tenderPegeableStore.loadMoreByBidder(this.page, this.pageSize);
          this.loading = false
        }
      } catch (error) {
        console.log('There was an error', error);
      }
    },

    openTenderDetails(tender) {
      if (tender.offerStatusName === 'OFFER_HAS_NOT_SENT') {
        this.$router.push({
          name: 'bidder-tender-details',
          params: {
            tenderId: tender.id
          }
        });
      } else {
        this.offerSubmissionInfo = true;
      }
    }
  },

  mounted() {
    this.tenderPegeableStore.loadByBidder(this.page, this.pageSize);
  },

  computed: {
    isTenders() {
      return this.tenderPegeableStore.getTenders.length > 0;
    }
  }
}
</script>
