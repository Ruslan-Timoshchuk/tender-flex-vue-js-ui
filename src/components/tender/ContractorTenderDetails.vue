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
        <v-toolbar class="table-header toolbar">
          <v-col class="v-col-3 mx-3">Oficial Name</v-col>
          <v-col class="v-col-1 mx-3">Price</v-col>
          <v-col class="v-col-1 mx-15">Country</v-col>
          <v-col class="v-col-2 ml-4">Received Date</v-col>
          <v-col class="v-col-2">Status</v-col>
        </v-toolbar>
        <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto"
          v-scroll:#scroll-target="onScroll">
          <v-sheet v-for="offer in offerPegeableStore.getOffers" :key="offer.id">
            <v-sheet class="table-row">
              <strong class="cpv-code" @click="navigateToOffer(offer.id)">{{ offer.bidderOfficialName
              }}</strong>
              <td style="width: 10rem;">{{ `${offer.currencyCode}.${offer.bidPrice}` }}</td>
              <td style="width: 10rem;">{{ offer.countryName }}</td>
              <td style="width: 10rem;">{{ offer.submissionDate }}</td>
              <td style="width: 10rem;"> {{ offer.offerStatusLabel }} </td>
            </v-sheet>
          </v-sheet>
        </v-container>
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
import { useOfferPegeableStore } from "@/stores/offer.pegeable.store";
import { useFileStore } from "@/stores/file.store";
import { exceptionAlert } from "@/components/alerts";
import TenderDetails from "@/components/tender/childs/TenderDetails.vue";
import FileVchip from "@/components/childs/FileVchip.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"
import TableHeaderWithoutField from "@/components/offer/childs/TableHeaderWithoutField.vue"

export default {
  components: {
    TenderDetails,
    FileVchip,
    FileViewerModal,
    TableHeaderWithoutField
  },

  data: () => ({
    tenderStore: useTenderStore(),
    offerPegeableStore: useOfferPegeableStore(),
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
    async onScroll(e) {
      try {
        const page = this.offerPegeableStore.getCurrentPage;
        const pages = this.offerPegeableStore.getTotalPages;
        const el = e.target;
        const nearBottom =
          el.scrollHeight - el.scrollTop <= el.clientHeight + 100;
        if (nearBottom && !this.loading && page < pages) {
          this.loading = true;
          await this.offerPegeableStore.loadMoreOffersByTender(
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
      }
  },

  async mounted() {
    const tenderId = this.$route.params.id;
    this.tenderStore.loadContractorTenderDetailsById(tenderId);
    const requestedPage = this.offerPegeableStore.getCurrentPage;
    this.offerPegeableStore.loadOffersByTender(tenderId, requestedPage, this.pageSize);
  }
}
</script>
