<template>
  <ToolBarTitle
    title="My Tenders">
  </ToolBarTitle>

 <v-container fluid class="d-flex align-center justify-center mt-n12">
    <v-card elevation="8" width="1000">
      <div v-if="isTenders">
        <TableHeader 
          field="Field" 
          companyName="Oficial Name" 
          tenderStatus="Status" 
          deadline="Deadline"
          offerData="Offers">
        </TableHeader>

        <v-container id="scroll-target" style="max-height: 25rem" class="overflow-y-auto"
          v-scroll:#scroll-target="onScroll">
          <v-sheet v-for="tender in tenderStore.getTenders" :key="tender.id">
            <v-sheet :class="{
              'table-row': tender.tenderStatusName === 'TENDER_IN_PROGRESS',
              'table-row disabled': tender.tenderStatusName === 'TENDER_CLOSED'
            }">
              <td class="v-col-4">
                <div class="cpv-code"><strong @click="$emit('select-tender', tender)">{{ tender.cpv.code }}</strong>
                </div>
                <div class="cpv-text"><strong>{{ tender.cpv.summary }}</strong></div>
              </td>
              <td class="v-col-2 text-center">{{ tender.contractorName }}</td>
              <td class="v-col-2 text-center">{{ tender.tenderStatusLabel }}</td>
              <td class="v-col-2 text-center">{{ tender.offerSubmissionDeadline }}</td>
              <td class="v-col-2 text-center">{{ tender.offersAmount }}</td>
            </v-sheet>
          </v-sheet>
        </v-container>
      </div>
      <EmptyTableTitle 
        v-else message="“There are no published Tenders. Create a Tender.”">
      </EmptyTableTitle>
    </v-card>
  </v-container>

<router-view />
</template>

<script>
import { useTenderStore } from "@/stores/tender.store"
import { navigateToTender } from "@/components/actions"
import ToolBarTitle from "@/components/childs/ToolBarTitle.vue"
import EmptyTableTitle from "@/components/childs/EmptyTableTitle.vue"
import TableHeader from "@/components/tender/childs/TableHeader.vue"

export default {
  components:{
    ToolBarTitle,
    EmptyTableTitle,
    TableHeader,
  },

  data: () => ({
    tenderStore: useTenderStore(),
    loading: false,
    bottom: 285,
    page: 1,
    pageSize: 10,
    pages: 1,
    tenders: 0,
    offers: 0,
    tenders: [],
    navigateToTender
  }),

  methods: {
    onScroll(e) {
      try {
        const currentPage = Math.ceil(e.target.scrollTop / this.bottom);
        if (currentPage === this.page && !this.loading && this.page <= this.pages) {
          this.loading = true
          this.page++;
          this.tenderStore.loadMoreByContractor(this.page, this.pageSize);
          this.loading = false
        }
      } catch (error) {
        console.log('There was an error', error);
      }
    }
  },

  mounted() {
    this.tenderStore.loadByContractor(this.page, this.pageSize);
  },

  computed: {
    isTenders() {
      return this.tenderStore.getTenders.length > 0;
    }
  }
}
</script>
