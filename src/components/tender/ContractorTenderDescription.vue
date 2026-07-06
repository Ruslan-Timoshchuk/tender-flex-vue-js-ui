<template>
 <v-toolbar 
   color="blue" 
   extended 
   extension-height="100"
   ><v-chip 
     :to="{ name: 'contractor-tenders' }" 
     style="margin-left: 12rem" 
     variant="text" 
     text-color="white"
     prepend-icon="mdi-keyboard-backspace"
  >Back</v-chip>
    <template 
      v-slot:extension>
        <v-container 
          class="px-15"
            ><v-toolbar-title 
              class="ml-14 mb-4" 
              style="font-size: 1.5rem"
            >{{ tenderStore.tender.cpv.summary }} 
             ({{ tenderStore.tender.cpv.code }})
            </v-toolbar-title>
          <v-btn 
            rounded="0" 
            style="margin-left: 3rem; 
            margin-bottom: 3rem;"
          >Tender Description
          <v-tooltip
            activator="parent" 
            location="end"
          >The tender detailed information tab
          </v-tooltip>
          </v-btn>
        </v-container>
    </template>
  </v-toolbar>

  <div class="mt-n8 mb-12">
     <TenderDetails 
       :tender="tenderStore.tender"
       ><template #documents>
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
         <v-row class="mb-10">
           <FileVchip 
             :fileName="tenderStore.tender.rejectDecision.fileMetadata.name"
             :fileKey="tenderStore.tender.rejectDecision.fileMetadata.awsS3fileKey" 
             @show-file="showFile">
           </FileVchip>
         </v-row>
       </template>
     </TenderDetails>
  </div>

    <FileViewerModal
      v-model:isOpen="isOpen"
      @update:isOpen="closeFile"
      :fileUrl="fileUrl"
    ></FileViewerModal>
</template>

<script>
import { useTenderStore } from "@/stores/tender.store"
import { useFileStore } from "@/stores/file.store";
import { exceptionAlert } from "@/components/alerts";
import TenderDetails from "@/components/tender/childs/TenderDetails.vue"
import FileVchip from "@/components/childs/FileVchip.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"

export default {
  components: {
    TenderDetails,
    FileVchip,
    FileViewerModal
  },

  data: () => ({
    tenderStore: useTenderStore(),
    fileStore: useFileStore(),
    isOpen: false,
    fileUrl: '',
    exceptionAlert,
  }),

  methods: {
    async showFile(isOpen, fileKey, callback) {
      try {
        const file = await this.fileStore.downloadFile(fileKey);
        this.fileUrl = URL.createObjectURL(file);
        this.isOpen = isOpen;
      } catch (error) {
        exceptionAlert.activateAlert("File download failed:", error);
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
    this.tenderStore.loadTenderDetailsById(this.$route.params.id);
  }
}
</script>
