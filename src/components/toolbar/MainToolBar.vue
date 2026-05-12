<template>
 <v-toolbar 
   color="blue">
    <v-row>
      <v-img 
        class="ml-10" 
        max-width="140" 
        src="@/assets/tender-flex-Logo.svg" />
      <v-chip
        class="my-2 ml-12"
        variant="flat"
        color="blue-darken-3"
        text-color="white"
        prepend-icon="mdi-pulse"
        :to="{ name: 'tenders' }">
        Tenders {{ tenders }}
      </v-chip>
      <v-chip
        class="my-2 ml-10"
        variant="flat"
        color="blue-darken-3"
        text-color="white"
        prepend-icon="mdi-message-processing-outline"
        :to="{ name: 'offers' }">
        Offers {{ offers }}
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

      <!-- injected actions -->
      <slot name="actions" />

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
      <v-btn 
        icon class="mr-6" 
        to="/">
        <v-icon
          >mdi-export
        </v-icon>
      </v-btn>
      <v-divider 
        class="mt-1" 
        color="black">
      </v-divider>
    </v-row>
  </v-toolbar>
  <router-view></router-view>
 </template>

<script>
import { successAlert, exceptionAlert } from "@/components/alerts";

export default {

  props: {
    tenders: { type: Number },
    offers: { type: Number },
    authorities: { type: Array }
  },

  data: () => ({
    successAlert,
    exceptionAlert
  })

}
</script>