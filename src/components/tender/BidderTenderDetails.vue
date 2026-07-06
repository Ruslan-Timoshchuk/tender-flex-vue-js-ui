<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip :to="{ name: 'bidder-tenders' }" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-12" style="font-size: 1.5rem">
          {{ tenderStore.item.cpv.summary }} ({{ tenderStore.item.cpv.code }})
        </v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <div class="mt-n8 mb-12">
  <TenderDetails 
    :tender="tenderStore.item">
    <template #documents>
      <v-row>
        <FileVchip 
          :fileName="tenderStore.item.contract.fileMetadata.name" 
          :fileKey="tenderStore.item.contract.fileMetadata.awsS3fileKey"
          @show-file="showFile">
        </FileVchip>
      </v-row>
    </template>
  </TenderDetails>
  <v-row class="d-flex justify-end mt-5">
    <v-col md="2" style="margin-right: 20rem;">
      <v-btn type="submit" block variant="flat" color="blue"
        :to="{ name: 'new-offer', params: { tenderId: $route.params.tenderId } }">
        + Create Offer
      </v-btn>
    </v-col>
  </v-row>
</div>
  <FileViewerModal 
    v-model:isOpen="isOpen" 
    @update:isOpen="closeFile" 
    :fileUrl="fileUrl">
  </FileViewerModal>
</template>

<script>
import { useTenderStore } from "@/stores/tender.store";
import { useOfferStore } from "@/stores/offer.store";
import { useFileStore } from "@/stores/file.store";
import { exceptionAlert } from "@/components/alerts";
import FileVchip from "@/components/childs/FileVchip.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"
import TenderDetails from "@/components/tender/childs/TenderDetails.vue";

export default {
  components: {
    FileVchip,
    FileViewerModal,
    TenderDetails
  },

  data: () => ({
    tenderStore: useTenderStore(),
    offerStore: useOfferStore(),
    fileStore: useFileStore(),
    isOpen: false,
    fileUrl: '',
    exceptionAlert
  }),

  methods: {
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
    this.tenderStore.loadTenderDetailsById(this.$route.params.tenderId);
  }
}
</script>
