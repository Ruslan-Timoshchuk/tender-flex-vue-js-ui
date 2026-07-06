<template>
  <v-toolbar color="blue" extended extension-height="100">
    <v-chip :to="{ name: 'bidder-tenders' }" style="margin-left: 12rem" variant="text" text-color="white"
      prepend-icon="mdi-keyboard-backspace">Back
    </v-chip>
    <template v-slot:extension>
      <v-container class="px-15">
        <v-toolbar-title class="ml-14 mb-4" style="font-size: 1.5rem">{{ tenderStore.tender.cpv.summary }} ({{ tenderStore.tender.cpv.code }})</v-toolbar-title>
          <div style="margin-left: 3rem; margin-bottom: 3rem;">
            <v-btn v-if="isAwardDecision" @click="tab='awardDecision'" rounded="0">Award Decision</v-btn>
            <v-btn v-else-if="isRejectDecision" @click="tab='rejectDecision'" rounded="0">Reject Decision</v-btn>
            <v-btn @click="tab='tenderDescription'" rounded="0">Tender Description</v-btn>
            <v-btn @click="tab='offerDescription'" rounded="0">My Offer</v-btn>
          </div>
      </v-container>
    </template>
  </v-toolbar>

  <v-window v-model="tab" class="mt-n8 pb-10">
    <v-window-item value="awardDecision">
      <v-card class="mx-auto" elevation="8" max-width="1000">
        <v-toolbar color="white" height="280" class="text-left">
          <v-toolbar-title v-if="offerStore.item.statusName === 'OFFER_SELECTED_BY_CONTRACTOR'" class="text-center" style="font-size: 1.5rem">
            “Congratulation! Your Offer was selected by Contractor”
          </v-toolbar-title>
          <v-toolbar-title v-else-if="offerStore.item.statusName === 'CONTRACT_APPROVED_BY_BIDDER'" class="text-center" style="font-size: 1.5rem">
            “Contract is approved by Bidder”
          </v-toolbar-title>
            <v-toolbar-title v-if="offerStore.item.statusName === 'CONTRACT_DECLINED_BY_BIDDER'" class="text-center" style="font-size: 1.5rem">
            “Contract is declined by Bidder”
          </v-toolbar-title>
        </v-toolbar>
          <v-item-group>
        <v-row justify="center mb-10">
          <v-col md = 4 class="text-center">
          <FileVchip
             :fileName="tenderStore.tender.awardDecision.fileMetadata.name"
             :fileKey="tenderStore.tender.awardDecision.fileMetadata.awsS3fileKey"
            @show-file="showFile"
          ></FileVchip>
        </v-col>
          </v-row>
      </v-item-group>
        <v-row v-if="offerStore.item.statusName === 'OFFER_SELECTED_BY_CONTRACTOR'" class="d-flex justify-center mt-2 mb-10">
      <v-col md="3">
        <v-btn block variant="outlined" color="blue" @click="declineContract({ offerId: this.offerId, awardDecisionId: this.awardDecisionId })">
            Decline
        </v-btn>
         </v-col>
          <v-col md="3">
           <v-btn block variant="flat" color="blue"
             @click="approveContract({ offerId: this.offerId, awardDecisionId: this.awardDecisionId })">
             Approve
           </v-btn>
         </v-col>
       </v-row>
      </v-card>
    </v-window-item>

    <v-window-item value="rejectDecision">
      <v-card class="mx-auto" elevation="8" max-width="1000">
        <v-toolbar color="white" height="280" class="text-left">
          <v-toolbar-title class="text-center" style="font-size: 1.5rem">
            “Offer is rejected by contractor”
          </v-toolbar-title>
        </v-toolbar>
        <v-item-group>
        <v-row justify="center mb-10">
          <v-col md = 4 class="text-center">
          <FileVchip
             :fileName="tenderStore.tender.rejectDecision.fileMetadata.name"
             :fileKey="tenderStore.tender.rejectDecision.fileMetadata.awsS3fileKey"
            @show-file="showFile"
          ></FileVchip>
        </v-col>
          </v-row>
      </v-item-group>
      </v-card>
    </v-window-item>

    <v-window-item value="tenderDescription">
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
    </v-window-item>
    <v-window-item value="offerDescription">
      <OfferDetails
      :offer="offerStore.offer"> 
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
    </v-window-item>

    <FileViewerModal
      v-model:isOpen="isOpen"
      @update:isOpen="closeFile"
      :fileUrl="fileUrl"
   ></FileViewerModal>
  </v-window>
</template>

<script>
import { useTenderStore } from "@/stores/tender.store";
import { useOfferStore } from "@/stores/offer.store";
import { useFileStore } from "@/stores/file.store";
import { useAwardDecisionStore } from "@/stores/award.decision.store.js";
import { exceptionAlert } from "@/components/alerts";
import FileVchip from "@/components/childs/FileVchip.vue"
import TenderDetails from "@/components/tender/childs/TenderDetails.vue";
import OfferDetails from "@/components/offer/childs/OfferDetails.vue";
import FileViewerModal from "@/components/childs/FileViewerModal.vue"

export default {
  components: {
    FileVchip,
    TenderDetails,
    OfferDetails,
    FileViewerModal
  },

  data: () => ({
    tenderStore: useTenderStore(),
    offerStore: useOfferStore(),
    fileStore: useFileStore(),
    awardDecisionStore: useAwardDecisionStore(),
    tab: "tenderDescription",
    isOpen: false,
    fileUrl: '',
    totalPages: 1,
    plannedPage: 1,
    offersPerPage: 10,
    loading: false,
    isOffers: false,
    exceptionAlert
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
      },

    async declineContract(declineContractDecisionRequest) {
      this.awardDecisionStore.sendDeclineContractDecision(declineContractDecisionRequest);
    },

    async approveContract(approveContractDecisionRequest) {
      this.awardDecisionStore.sendApproveContractDecision(approveContractDecisionRequest);
    }
  },

  computed: {
    offerId() {
      return Number(this.$route.params.offerId);
    },

    tenderId() {
      return Number(this.$route.params.tenderId);
    },

    awardDecisionId() {
      return this.tenderStore.tender.awardDecision.id;
    },

    isAwardDecision() {
      const offerStatus = this.offerStore.item.statusName;
      return [
        'OFFER_SELECTED_BY_CONTRACTOR',
        'CONTRACT_APPROVED_BY_BIDDER',
        'CONTRACT_DECLINED_BY_BIDDER'
      ].includes(offerStatus);
    },

    isRejectDecision() {
      const offerStatus = this.offerStore.item.statusName;
      return [
        'OFFER_REJECTED_BY_CONTRACTOR'
      ].includes(offerStatus);
    }
  },

  async mounted() {
    await this.offerStore.loadBidderOfferDetailsById(this.offerId);
    await this.tenderStore.loadTenderDetailsById(this.tenderId);
  }
}
</script>
