<template>
    <v-toolbar class="table-header toolbar">
        <v-col class="v-col-3 mx-3">Oficial Name</v-col>
        <v-col class="v-col-1 mx-3">Price</v-col>
        <v-col class="v-col-1 mx-15">Country</v-col>
        <v-col class="v-col-2 ml-4">Received Date</v-col>
        <v-col class="v-col-2">Status</v-col>
    </v-toolbar>
    <v-container 
      id="scroll-target" 
      style="max-height: 25rem" 
      class="overflow-y-auto"
      v-scroll:#scroll-target="(event) => $emit('load-more-on-scroll', event)">
        <v-sheet v-for="offer in offers" :key="offer.id">
            <v-sheet class="table-row">
                <strong 
                  class="cpv-code" 
                  @click="$emit('select-offer', offer)"
                  >{{ offer.bidderOfficialName }}
                </strong>
                <td style="width: 10rem;">{{ `${offer.currencyCode}.${offer.bidPrice}` }}</td>
                <td style="width: 10rem;">{{ offer.countryName }}</td>
                <td style="width: 10rem;">{{ offer.receivedDate }}</td>
                <td style="width: 10rem;"> {{ offer.offerStatusLabel }} </td>
            </v-sheet>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    props: {
        offers: { type: Array, default: () => [] }
    },

    emits: ['load-more-on-scroll', 'select-offer']
}
</script>