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
   <OfferDetails :offer="offerStore.getOffer">
        <template #documents>
            <v-row>
                <FileVchip 
                  :fileName="offerStore.getOffer.proposition.name"
                  :fileKey="offerStore.getOffer.proposition.awsS3fileKey" 
                  @show-file="showFile">
                </FileVchip>
            </v-row>
        </template>
    </OfferDetails>
    <v-container v-if="offerStore.getOffer.statusName === 'OFFER_RECEIVED'" class="d-flex justify-end mt-2">
        <v-btn class="mx-2" variant="outlined" color="blue" @click="sendRejectDecision({
            offerId: offerId,
            rejectDecisionId: rejectDecisionId
        })">
            Send Reject Decision
        </v-btn>
        <v-btn class="mx-2" variant="flat" color="blue" @click="sendAwardDecision({
            contractId: contract.id,
            offerId: offerId,
            awardId: awardDecisionId
        })">Send Award Decision
        </v-btn>
    </v-container>
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
import { useRejectDecisionStore } from '@/stores/reject.decision.store';
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
        rejectDecisionStore: useRejectDecisionStore(),
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
        },

        async sendRejectDecision(rejectOfferDecisionRequest) {
            await this.rejectDecisionStore.sendRejectDecision(rejectOfferDecisionRequest);
        }
    },

    computed: {
        offerId() {
            return Number(this.$route.params.offerId);
        },
        rejectDecisionId() {
            return Number(this.$route.params.rejectDecisionId);
        },
        awardDecisionId() {
            return Number(this.$route.params.awardDecisionId);
        }
    },

    mounted() {
        this.offerStore.loadContractorOfferDetailsById(this.offerId);
    }
}
</script>