<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip :to="{ name: 'bidder-tenders' }" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-12" style="font-size: 1.5rem">
          {{ tenderStore.tender.cpv.summary }} ({{ tenderStore.tender.cpv.code }})
        </v-toolbar-title>
      </v-container>
    </template>
  </v-toolbar>

  <TenderDetails 
    :tender="tenderStore.tender">
    <template #documents>
      <v-row>
        <FileVchip 
          :fileName="tenderStore.tender.contract.fileMetadata.name" 
          :fileKey="tenderStore.tender.contract.fileMetadata.awsS3fileKey"
          @show-file="showFile">
        </FileVchip>
      </v-row>
    </template>
  </TenderDetails>
  <v-row class="d-flex justify-end mt-5 mb-10">
    <v-col md="2" style="margin-right: 20rem;">
      <v-btn type="submit" block variant="flat" color="blue"
        :to="{ name: 'new-offer', params: { tenderId: $route.params.id } }">
        + Create Offer
      </v-btn>
    </v-col>
  </v-row>

  <FileViewerModal 
    v-model:isOpen="isOpen" 
    @update:isOpen="closeFile" 
    :fileUrl="fileUrl">
  </FileViewerModal>
</template>

<script>
import { useTenderStore } from "@/stores/tender.store";
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
    this.tenderStore.loadBidderTenderDetailsById(this.$route.params.id);
  }
}
</script>
