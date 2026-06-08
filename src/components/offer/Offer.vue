<template>
   <ToolBarTitle
      title="Create new Offer"
  ></ToolBarTitle>

  <v-card class="mt-n7 mx-auto" elevation="8" max-width="1000">
    <v-container class="pa-10">
      <v-form>
        <CompanyProfile
          companyRole="Bidder"
          oficialNameHint="Enter the name of the buyer (e.g. Aeroporto Friuli Venezia Giulia S.p.A.)"
          @update-oficial-name="(value) => offer.companyProfile.officialName = value"
          registrationNumberHint="Enter the national registration number of the buyer (e.g.ULG BE 0325 777 171)"
          @update-registration-number="(value) => offer.companyProfile.registrationNumber = value"
          countryHint="Choose the country"
          :countries="countryStore.countries"
          @update-country="(value) => offer.companyProfile.countryId = value"
          cityHint="Enter the city"
          @update-city="(value) => offer.companyProfile.city = value"
          firstNameHint="Enter the name of contact person"
          @update-first-name="(value) => offer.companyProfile.contactPerson.firstName = value"
          lastNameHint="Enter the surname of contact person"
          @update-last-name="(value) => offer.companyProfile.contactPerson.lastName = value"
          phoneNumberHint="Enter the phone number of the contact person"
          @update-phone="(value) => offer.companyProfile.contactPerson.phoneNumber = value">
        </CompanyProfile>

        <v-row>
          <Chapter title="Subject matter of the procurement"></Chapter>
        </v-row>

        <v-row class="mt-5 mx-8">
          <v-col cols="12" md="4">
            <NumericInput
              title="Bid Price"
              hint="Enter price which you can Offer"
              label="Offer value"
              counter="8"
              @updateValue="offer.bidPrice = $event">
            </NumericInput>
          </v-col>
          <v-col cols="12" md="4">
            <SelectOptionInput
              title="Currency"
              hint="Choose the currency"
              label="Currency"
              itemTitle="code"
              @update-value="(value) => offer.currencyId = value"
              :items="currencyStore.currencies">
            </SelectOptionInput>
          </v-col>
        </v-row>

        <v-row>
          <Chapter title="Documents"></Chapter>
        </v-row>

        <v-item-group class="py-5 mx-2">
          <FileInput
            label="* Proposition"
            fileInputId="proposition"
            hint="Choose document that will be displayed for a Contractor"
            @select-file="(value) => proposition = value"
            @showFile="() => {}"
          ></FileInput>
        </v-item-group>
      </v-form>
    </v-container>
  </v-card>

  <v-container class="px-10">
    <v-row class="justify-end pb-15 mr-12 mt-3">
      <v-col md="3">
        <v-btn type="submit" block class="mt-2" variant="outlined" color="blue"
          size="large" @click="isDialog = true">
          Cancel
        </v-btn>
        </v-col>
      <v-col md="3">
        <v-btn type="submit" block class="mt-2" variant="flat" color="blue"
          size="large" @click="save">
          Send Offer
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div class="text-center">
    <v-dialog v-model="isDialog" activator="parent" width="500">
      <v-card>
        <v-toolbar color="primary" title="Cancellation confirmation" height="50"></v-toolbar>
        <v-card-text class="text-center">
          <div>Do you really want to cancel the Offer creation?</div>
          <div>All you entered data will be lost</div>
        </v-card-text>
        <v-row class="justify-center mb-8 mt-3">
          <v-btn @click="isDialog = false" width="160" class="mx-2">No</v-btn>
          <v-btn :to="{ name: 'tenders' }" color="primary" width="160" class="mx-2">Yes</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { useCountryStore } from '@/stores/country.store';
import { useCurrencyStore } from '@/stores/currency.store';
import { useFileStore } from '@/stores/file.store';
import { useOfferStore } from '@/stores/offer.store';
import { format } from 'date-fns'
import { successAlert, exceptionAlert } from "@/components/alerts";
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import CompanyProfile from "@/components/childs/CompanyProfile.vue";
import Chapter from "@/components/childs/Chapter.vue"
import NumericInput from "@/components/childs/NumericInput.vue";
import SelectOptionInput from "@/components/childs/SelectOptionInput.vue";
import FileInput from "@/components/childs/FileInput.vue";

export default {
  components: {
    ToolBarTitle,
    CompanyProfile,
    Chapter,
    NumericInput,
    SelectOptionInput,
    FileInput
  },

  data: () => ({
    countryStore: useCountryStore(),
    currencyStore: useCurrencyStore(),
    fileStore: useFileStore(),
    offerStore: useOfferStore(),
    offer: {
      companyProfile: {
        contactPerson: {}
      }
    },
    currency: {},
    isDisabled: true,
    dialog: false,
    isDialog: false,
    successAlert,
    exceptionAlert,
    proposition: {},
  }),

  methods: {
    async save() {
      try {
        const propositionMetadata = await this.fileStore.uploadFile(this.proposition);
        this.offer.propositionMetadataId = propositionMetadata.id;
        this.offer.tenderId = this.$route.params.tenderId;
        this.offer.publication = this.initialDate;
        this.offerStore.save(this.offer)
        this.successAlert.activateAlert("Offer was successfully created");
        this.$router.push({ name: 'bidder-offers' })
      } catch (error) {
        this.exceptionAlert.activateAlert(error);
      }
    }
  },

  async mounted() {
    try {
      await Promise.all([
        this.countryStore.loadCountries(),
        this.currencyStore.loadCurrencies(),
      ]);
    } catch (error) {
      this.exceptionAlert.activateAlert("Error occurred when fetching the data: " + error)
    }
    this.initialDate = format(new Date(), 'yyyy-MM-dd');
  }
}

</script>
