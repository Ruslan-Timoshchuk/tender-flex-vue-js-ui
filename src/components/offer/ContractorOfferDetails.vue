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
              class="ml-14 mb-8" 
              style="font-size: 1.5rem"
            >{{ 'Contractor offer details' }}
            </v-toolbar-title>
        </v-container>
    </template>
  </v-toolbar>
  <div class="mt-n8 mb-12">
   <OfferDetails :offer="offerStore.offer">
        <template #documents>
            <v-row>
                <FileVchip 
                  :fileName="offerStore.offer.proposition.name"
                  :fileKey="offerStore.offer.proposition.awsS3fileKey" 
                  @show-file="showFile">
                </FileVchip>
            </v-row>
        </template>
    </OfferDetails>
</div>

    <FileViewerModal
      v-model:isOpen="isOpen"
      @update:isOpen="closeFile"
      :fileUrl="fileUrl"
   ></FileViewerModal>
</template>

<script>
import FileVchip from '@/components/childs/FileVchip.vue'
import OfferDetails from '@/components/offer/childs/OfferDetails.vue';
import FileViewerModal from "@/components/childs/FileViewerModal.vue"
import { useOfferStore } from '@/stores/offer.store';
import { useFileStore } from '@/stores/file.store';
import {exceptionAlert } from "@/components/alerts"

export default {
    components: {
        FileVchip,
        OfferDetails,
        FileViewerModal
    },

    data: () => ({
        offerStore: useOfferStore(),
        fileStore: useFileStore(),
        fileUrl: '',
        isOpen: false,
        exceptionAlert
    }),

    methods: {
        async showFile(isOpen, fileKey, callback) {
            try {
                const file = await this.fileStore.downloadFile(fileKey);
                this.fileUrl = URL.createObjectURL(file);
                this.isOpen = isOpen;
            } catch (error) {
                this.exceptionAlert.activateAlert("File download failed:", error);
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

    computed: {
        offerId() {
            return Number(this.$route.params.id);
        }
    },

    mounted() {
        this.offerStore.loadContractorOfferDetailsById(this.offerId);
    }
}
</script>