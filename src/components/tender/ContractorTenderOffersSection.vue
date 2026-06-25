<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip :to="{ name: 'contractor-tenders' }" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-4" style="font-size: 1.5rem">{{ tenderStore.tender.cpv.summary }} ({{ tenderStore.tender.cpv.code }})</v-toolbar-title>
          <div style="margin-left: 3rem; margin-bottom: 3rem;"> 
            <v-btn @click="tab='offers'" rounded="0">Offers</v-btn>
            <v-btn @click="tab='tenderDescription'" rounded="0">Tender Description</v-btn>
        </div>
      </v-container>
    </template>
  </v-toolbar>

  <v-window v-model="tab" class="mt-n8 pb-10">
    <v-window-item value="offers">
      <v-card elevation="8" width="1000" class="mx-auto">
        <TenderOffersSummaryTable
          :offers="tenderOffersStore.offers"
          @load-more-on-scroll="loadMoreByTender"
          @select-offer="(offer) => navigateToOffer(offer)"
        ></TenderOffersSummaryTable>
      </v-card>
    </v-window-item>

    <v-window-item value="tenderDescription">
     <TenderDetails :tender="tenderStore.tender">
        <template #documents>
          <v-row>
            <FileVchip 
              :fileName="tenderStore.tender.contract.fileMetadata.name"
              :fileKey="tenderStore.tender.contract.fileMetadata.awsS3fileKey" 
              @show-file="showFile">
            </FileVchip>
          </v-row>
          <v-row>
            <FileVchip 
              :fileName="tenderStore.tender.awardDecision.fileMetadata.name"
              :fileKey="tenderStore.tender.awardDecision.fileMetadata.awsS3fileKey" 
              @show-file="showFile">
            </FileVchip>
          </v-row>
          <v-row>
            <FileVchip 
              :fileName="tenderStore.tender.rejectDecision.fileMetadata.name"
              :fileKey="tenderStore.tender.rejectDecision.fileMetadata.awsS3fileKey" 
              @show-file="showFile">
            </FileVchip>
          </v-row>
        </template>
      </TenderDetails>
    </v-window-item>
  </v-window>

   <FileViewerModal
      v-model:isOpen="isOpen"
      @update:isOpen="closeFile"
      :fileUrl="fileUrl"
   ></FileViewerModal>
</template>

<script>
import { useTenderStore } from "@/stores/tender.store"
import { useTenderOffersStore } from "@/stores/offer.tender.pegeable.store";
import { useFileStore } from "@/stores/file.store";
import { exceptionAlert } from "@/components/alerts";
import TenderDetails from "@/components/tender/childs/TenderDetails.vue";
import FileVchip from "@/components/childs/FileVchip.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"
import TenderOffersSummaryTable from "../offer/childs/TenderOffersSummaryTable.vue";

export default {
  components: {
    TenderOffersSummaryTable,
    TenderDetails,
    FileVchip,
    FileViewerModal
  },

  data: () => ({
    tenderStore: useTenderStore(),
    tenderOffersStore: useTenderOffersStore(),
    fileStore: useFileStore(),
    tab: "tenderDescription",
    isOpen: false,
    fileUrl: '',
    totalPages: 1,
    pageSize: 10,
    loading: false,
    exceptionAlert,
  }),

  methods: {
    async loadMoreByTender(e) {
      try {
        const page = this.tenderOffersStore.currentPage;
        const pages = this.tenderOffersStore.totalPages;
        const el = e.target;
        const nearBottom =
          el.scrollHeight - el.scrollTop <= el.clientHeight + 100;
        if (nearBottom && !this.loading && page < pages) {
          this.loading = true;
          await this.tenderOffersStore.loadMoreOffersByTender(
            this.$route.params.id,
            page + 1,
            this.pageSize
          );
        }
      } catch (error) {
        exceptionAlert.activateAlert('There was an error', error);
      } finally {
        this.loading = false;
      }
},

    async showFile(isOpen, fileKey, callback) {
      try {
        const file = await this.fileStore.downloadFile(fileKey);
        this.fileUrl = URL.createObjectURL(file);
        this.isOpen = isOpen;
      } catch (error) {
        console.error("File download failed:", error);
      } finally {
        if (callback) callback();
      }
    },

      closeFile() {
        if (this.fileUrl) {
          URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = null;
        }
        this.isOpen = false;
      },

    navigateToOffer(offer) {
      const tender = this.tenderStore.getTender;
      const isOfferReceived = offer.offerStatusName === 'OFFER_RECEIVED';
      const isDraftContract = tender.contract.status === 'DRAFT';
      let routeConfig;
      if (isOfferReceived && isDraftContract) {
        routeConfig = {
          name: 'contractor-offer-decision-actions',
          params: {
            offerId: offer.offerId,
            awardDecisionId: this.tenderStore.getTender.awardDecision.id,
            rejectDecisionId: this.tenderStore.getTender.rejectDecision.id
          }
        }
      } else {
        routeConfig = {
          name: 'contractor-offer-details',
          params: {
            id: offer.offerId
          }
        }
      }
      this.$router.push(routeConfig);
    }

  },

  computed: {
    tenderId() {
      return Number(this.$route.params.id);
    }
  },

  async mounted() {
    this.tenderStore.loadContractorTenderDetailsById(this.tenderId);
    const requestedPage = this.tenderOffersStore.currentPage;
    this.tenderOffersStore.loadOffersByTender(this.tenderId, requestedPage, this.pageSize);
  }
}
</script>
