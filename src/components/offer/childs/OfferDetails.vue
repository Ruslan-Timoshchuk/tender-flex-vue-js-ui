<template>
    <v-card class="mx-auto" elevation="8" max-width="1000">
      <v-toolbar color="white" height="240" class="text-left">
        <v-container class="pa-15">
          <v-toolbar-title class="mb-5">Bidder</v-toolbar-title>
          <v-row class="text-center mx-10">
            <v-col class="text-left">
              <div class="ma-2 details-title">Oficial Name:</div>
              <div class="ma-2 details-title">National Registration Number: </div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2">{{ offer.companyProfile.officialName }}</div>
              <div class="ma-2">{{ offer.companyProfile.registrationNumber }}</div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2 details-title">Country:</div>
              <div class="ma-2 details-title">City / Town:</div>
            </v-col>
            <v-col class="text-left">
              <div class="ma-2">{{ offer.companyProfile.country.name }}</div>
              <div class="ma-2">{{ offer.companyProfile.city }}</div>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
      </v-card>

    <v-container class="d-flex align-center details-container">
      <p class="chapter-label">Contact person</p>
      <div class="horizontal-divider-details"></div>
    </v-container>

    <v-container class="details-container">
      <v-row class="text-center mx-10">
        <v-col class="text-left mx-2">
          <div class="details-title">Name:</div>
          <div class="mt-3 details-title">Surname:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ offer.companyProfile.contactPerson.firstName }}</div>
          <div class="mt-3">{{ offer.companyProfile.contactPerson.lastName }}</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div class="details-title">Phone number:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ `${offer.companyProfile.country.phoneCode}${offer.companyProfile.contactPerson.phoneNumber}` }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="d-flex align-center details-container">
      <p class="chapter-label">Price</p>
      <div class="horizontal-divider-details"></div>
    </v-container>

    <v-container class="details-container">
      <v-row class="text-center mx-10">
        <v-col class="text-left mx-2">
          <div class="details-title">Bid Price:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ offer.bidPrice }}</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div class="details-title">Currency:</div>
        </v-col>
        <v-col class="text-left mx-2">
          <div>{{ `${offer.currency.code} | ${offer.currency.symbol}` }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="details-container">
      <v-item-group class="mx-8">
      <!-- injected documents -->
      <slot name="documents" />
      </v-item-group>
    </v-container>
</template>

<script>
export default {
    props: {
        offer: { type: Object, required: true }
    }
}
</script>