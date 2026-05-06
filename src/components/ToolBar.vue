<template>
 <v-toolbar color="blue">
    <v-row>
      <v-img class="ml-10" max-width="140" src="@/assets/tender-flex-Logo.svg" />
      <v-chip
        class="my-2 ml-12"
        variant="flat"
        color="blue-darken-3"
        text-color="white"
        prepend-icon="mdi-pulse"
        router-link :to="{ name: 'tenders' }">
        Tenders {{ totalStore.tenders }}
      </v-chip>
      <v-chip
        class="my-2 ml-10"
        variant="flat"
        color="blue-darken-3"
        text-color="white"
        prepend-icon="mdi-message-processing-outline"
        router-link :to="{ name: 'offers' }">
        Offers {{ totalStore.offers }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-chip
        v-model="successAlert.isActivated"
        class="my-2 mr-6"
        closable
        variant="elevated"
        type="success"
        color="green">
        {{ successAlert.message }}
      </v-chip>
      <v-chip
        v-model="exceptionAlert.isActivated"
        class="my-2 mr-6"
        closable
        variant="elevated"
        type="error"
        color="red">
        {{ exceptionAlert.message }}
      </v-chip>
      <v-chip
        v-if="isContractorTenderList"
        router-link :to="{ name: 'new-tender' }"
        variant="flat"
        color="indigo-darken-4"
        class="my-2 mr-6"
        >
        + Create new Tender
      </v-chip>
      <v-chip 
        v-for="authority in authorities" 
        :key="authority"
        class="mt-2 mx-5"
        variant="flat"
        color="blue-darken-3"
        prepend-icon="mdi-account-check-outline"
      > 
        {{ authority.label }}
      </v-chip>
      <v-btn icon class="mr-6" router-link to="/">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-divider class="mt-1" color="black"></v-divider>
    </v-row>
  </v-toolbar>
  <router-view></router-view>
 </template>

<script>
import { totalStore } from "@/stores/bids.counter.store";
import { successAlert, exceptionAlert } from "@/components/alerts";
import { useUserStore } from "@/stores/user.store";

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  data: () => ({
    authorities: [],
    totalStore,
    successAlert,
    exceptionAlert
  }),

  mounted() {
    this.authorities = this.userStore.authorities
    this.totalStore.refreshTotalCounts(this.userStore.id)
  },

  computed: {
    isContractorTenderList() {
      return this.$route.name === 'tenders' && this.authorities === 'contractor';
    }
  }
}
</script>
