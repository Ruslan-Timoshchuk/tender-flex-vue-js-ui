<template>
  <ToolBarTitle
      title="Create new Tender"
  ></ToolBarTitle>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">
      <v-form v-model="valid" fast-fail @submit.prevent="save">

        <CompanyProfile
          companyRole="Contractor"
          oficialNameHint="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
          @update-oficial-name="(value) => tender.companyProfile.officialName = value"
          registrationNumberHint="Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
          @update-registration-number="(value) => tender.companyProfile.registrationNumber = value"
          countryHint="Choose the country of the buyer"
          :countries=countryStore.countries
          @update-country="(value) => tender.companyProfile.countryId = value"
          cityHint="Enter the city of the buyer"
          @update-city="(value) => tender.companyProfile.city = value"
          firstNameHint="Enter the name of contact person"
          @update-first-name="(value) => tender.companyProfile.contactPerson.firstName = value"
          lastNameHint="Enter the surname of contact person"
          @update-last-name="(value) => tender.companyProfile.contactPerson.lastName = value"
          phoneNumberHint="Enter the phone number of the contact person"
          @update-phone="(value) => tender.companyProfile.contactPerson.phoneNumber = value"
        ></CompanyProfile>

        <v-row>
          <Chapter title="Subject matter of the procurement"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <SelectOptionInput
                title="CPV code"
                hint="Choose CPV code with corresponded to this code description"
                label="CPV Code"
                itemTitle="code"
                @update-value="(value) => tender.cpvId = value"
                :items=cpvStore.cpvs>
              </SelectOptionInput>
            </v-col>

            <v-col cols="12" md="4">
              <SelectOptionInput
                title="Type of Tender"
                hint="Choose the type of contract"
                label="Type"
                itemTitle="title"
                @update-value="(value) => contract.contractTypeId = value"
                :items="contractTypeStore.contractTypes">
              </SelectOptionInput>
            </v-col>
            <v-col cols="12" md="4">
              <TextInput
                title="Description"
                hint="Enter detailed information about the Tender"
                @update-value="(value) => tender.description = value"
                :counter="250"
                label="Description"
              ></TextInput>
            </v-col>
            <v-col cols="12" md="4">
              <NumericInput
                title="Maximum Tender Value"
                hint="Enter maximum price of the Tender contract"
                @update-value="(value) => contract.maxPrice = value"
                :counter="8"
                label="Maximum tender value"
              ></NumericInput>
            </v-col>
            <v-col cols="12" md="4">
              <NumericInput
                title="Minimum Tender Value"
                hint="Enter minimum price of the Tender contract"
                @update-value="value => contract.minPrice = value"
                :counter="8"
                label="Minimum tender value"
              ></NumericInput>
            </v-col>
            <v-col cols="12" md="4">
              <SelectOptionInput
                title="Currency"
                hint="Choose the currency"
                label="Currency"
                itemTitle="code"
                @update-value="(value) => contract.currencyId = value"
                :items="currencyStore.currencies">
              </SelectOptionInput>
            </v-col>
          </v-row>

        <v-row>
          <Chapter title="Date"></Chapter>
        </v-row>

          <v-row class="mt-5 mx-8">
            <v-col cols="12" md="4">
              <DateInput
              title="Publication Date"
              hint="Today date"
              :label="initialDate"
              type="text"
              :isDisabled="true"
            ></DateInput>
          </v-col>
          <v-col cols="12" md="4">
            <DateInput
              title="Deadline for Offer Submission"
              hint="Choose the deadline date for Offer submission"
              :earliestDate="earliestDeadline"
              @update-value="(value) => tender.offerSubmissionDeadline = value"
            ></DateInput>
          </v-col>
          <v-col cols="12" md="4">
            <DateInput
              title="Deadline for Signing"
              hint="Choose the deadline date for signed contract submission"
              :earliestDate="earliestDeadline"
               @update-value="(value) => contract.signedDeadline = value"
            ></DateInput>
          </v-col>
          </v-row>

        <v-row>
          <Chapter title="Documents"></Chapter>
        </v-row>

          <v-item-group class="py-5 mx-2">
            <FileInput
              label="* Contract"
              fileInputId="contract"
              hint="Choose your contract document"
              @select-file="(value) => attachment.contract = value"
              @show-file="showFileInParent"
            ></FileInput>
            <FileInput
              label="* Award Decision"
              fileInputId="award"
              hint="Choose award decision document"
              @select-file="(value) => attachment.awardDecision = value"
              @show-file="showFileInParent"
            ></FileInput>
            <FileInput
              label="* Reject Decision"
              fileInputId="reject"
              hint="Choose reject decision document"
              @select-file="(value) => attachment.rejectDecision = value"
              @show-file="showFileInParent"
            ></FileInput>
          </v-item-group>

          <FileViewerModal
            v-model:isOpen="isOpenInParent"
            @update:isOpen="(value) => isOpenInParent = value"
            :fileUrl="fileUrl"
          ></FileViewerModal>

      </v-form>
    </v-container>
  </v-card>

  <ConfirmationMenu
      btnTitle="Publish"
      firstLineExplanation="Do you really want to cancel the new Tender creation?"
      secondLineExplanaton="All you entered data will be lost"
      redirectUrl="/module/contractor/tenders"
      @save-document="save"
  ></ConfirmationMenu>
</template>

<script>
import { format } from 'date-fns'
import { useFileStore } from "@/stores/file.store"
import { useCountryStore } from "@/stores/country.store"
import { useCpvStore } from "@/stores/cpv.store"
import { useContractTypeStore } from "@/stores/contract.type.store"
import { useCurrencyStore } from "@/stores/currency.store"
import { useTenderStore } from "@/stores/tender.store"
import { useContractStore } from '@/stores/contract.store'
import { useAwardDecisionStore } from '@/stores/award.decision.store'
import { useRejectDecisionStore } from '@/stores/reject.decision.store'
import { successAlert, exceptionAlert } from "@/components/alerts"
import TextInput from "@/components/childs/TextInput.vue"
import NumericInput from "@/components/childs/NumericInput.vue"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import Chapter from "@/components/childs/Chapter.vue"
import SelectOptionInput from "@/components/childs/SelectOptionInput.vue"
import FileInput from "@/components/childs/FileInput.vue"
import ConfirmationMenu from "@/components/childs/ConfirmationMenu.vue"
import CompanyProfile from "@/components/childs/CompanyProfile.vue"
import DateInput from "@/components/childs/DateInput.vue"
import FileViewerModal from "@/components/childs/FileViewerModal.vue"

export default {
  components: {
    CompanyProfile,
    TextInput,
    NumericInput,
    ToolBarTitle,
    Chapter,
    SelectOptionInput,
    DateInput,
    FileInput,
    ConfirmationMenu,
    FileViewerModal
  },

  data: () => ({
    countryStore: useCountryStore(),
    cpvStore: useCpvStore(),
    contractTypeStore: useContractTypeStore(),
    currencyStore: useCurrencyStore(),
    tenderStore: useTenderStore(),
    fileStore: useFileStore(),
    contractStore: useContractStore(),
    awardDecisionStore: useAwardDecisionStore(),
    rejectDecisionStore: useRejectDecisionStore(),
    earliestDeadline: null,
    isDisabled: true,
    initialDate: null,
    tender: {
      companyProfile: {
        contactPerson: {}
      }
    },
    contract: {},
    awardDecision: {},
    rejectDecision: {},
    valid: false,
    attachment: {},
    successAlert,
    exceptionAlert,
    isOpenInParent: false,
    fileUrl: ''
  }),

  methods: {
    showFileInParent(isOpen, fileUrl) {
      this.fileUrl = fileUrl;
      this.isOpenInParent = isOpen;
    },

    async save() {
      try { 
        const { contract, awardDecision, rejectDecision } = this.attachment;
        const [contractFileMetadata, awardFileMetadata, rejectFileMetadata] = await Promise.all([
          this.fileStore.uploadFile(contract),
          this.fileStore.uploadFile(awardDecision),
          this.fileStore.uploadFile(rejectDecision),
        ]);
        this.tender.publication = this.initialDate;
        const tender = await this.tenderStore.save(this.tender);
        const tenderId = tender.id;
        this.contract.tenderId = tenderId;
        this.contract.fileMetadataId = contractFileMetadata.id;
        this.awardDecision.tenderId = tenderId;
        this.awardDecision.fileMetadataId = awardFileMetadata.id;
        this.rejectDecision.tenderId = tenderId;
        this.rejectDecision.fileMetadataId = rejectFileMetadata.id;
        await Promise.all([
          this.contractStore.saveContract(this.contract),
          this.awardDecisionStore.saveAwardDecision(this.awardDecision),
          this.rejectDecisionStore.saveRejectDecision(this.rejectDecision)
        ]);
        this.successAlert.activateAlert("Tender was successfully created");
        await this.$router.push({ name: 'contractor-tenders' });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.exceptionAlert.activateAlert(error.response.data.message);
        } else {
          this.exceptionAlert.activateAlert(error);
        }
      }
    }
  },

  async mounted() {
    try {
      await Promise.all([
        this.countryStore.loadCountries(),
        this.cpvStore.loadCpvs(),
        this.contractTypeStore.loadContractTypes(),
        this.currencyStore.loadCurrencies(),
      ]);
    } catch (error) {
      this.exceptionAlert.activateAlert("Error occurred when fetching the data: " + error)
    }
    this.initialDate = format(new Date(), 'yyyy-MM-dd');
    this.earliestDeadline = format(new Date().getTime() + 86400000, 'yyyy-MM-dd');
  }

}
</script>