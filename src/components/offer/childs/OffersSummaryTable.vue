<template>
  <v-toolbar class="table-header toolbar">
    <v-col class="v-col-2 ml-2">{{ companyName }}</v-col>
    <v-col class="v-col-3 ml-6">{{ field }}</v-col>
    <v-col class="v-col-1 ml-1">{{ price }}</v-col>
    <v-col class="v-col-1 ml-11">{{ country }}</v-col>
    <v-col class="v-col-1 ml-11">{{ date }}</v-col>
    <v-col class="v-col-2 ml-11">{{ status }}</v-col>
  </v-toolbar>
  <v-container
        id="scroll-target"
        style="max-height: 25rem"
        class="overflow-y-auto"
        v-scroll:#scroll-target="(event) => $emit('load-more-on-scroll', event)">
  <v-sheet v-for="offer in offers" :key="offer.id">
    <v-sheet class="table-row">
      <strong class="cpv-code" @click="$emit('select-offer', offer)"
        >{{ offer.companyProfile.officialName }}</strong>
      <td style="width: 20rem;">{{ offer.cpvOfTheTender.summary }}</td>
      <td style="width: 10rem;">{{ `${offer.currency.code}.${offer.bidPrice}` }}</td>
      <td style="width: 10rem;">{{ offer.companyProfile.country.name }}</td>
      <td style="width: 10rem;">{{ offer.submissionDate }}</td>
      <td style="width: 10rem;"> {{ offer.offerStatusLabel }} </td>
    </v-sheet>
  </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: {
    companyName: { type: String, default: '' },
    field: { type: String, default: '' },
    price: { type: String, default: '' },
    country: { type: String, default: '' },
    date: { type: String, default: '' },
    status: { type: String, default: '' },
    offers: { type: Array, default: () => [] }
  },

  emits: ['load-more-on-scroll', 'select-offer']
}
</script>
