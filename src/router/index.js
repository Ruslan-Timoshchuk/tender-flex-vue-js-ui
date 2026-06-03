import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ContractorToolbar from '@/components/toolbar/ContractorToolbar.vue'
import ContractorTenderDetails from '@/components/tender/ContractorTenderDetails.vue'
import BidderTenderDetails from '@/components/tender/BidderTenderDetails.vue'
import ContractorTenderSummary from '@/components/tender/ContractorTenderSummary.vue'
import BidderToolbar from '@/components/toolbar/BidderToolbar.vue'
import BidderTenderSummary from '@/components/tender/BidderTenderSummary.vue'
import Tender from '@/components/tender/Tender.vue'
import BidDetails from '@/components/BidDetails.vue'
import Offer from '@/components/offer/Offer.vue'
import OfferList from '@/components/offer/OfferList.vue'
import { RouterView } from 'vue-router'

const routes = [

  { name: 'login', path: '', component: LogIn },

  {
    name: 'contractor-module', path: '/contractors', component: ContractorToolbar,
    children: [
      { name: 'new-tender', path: 'create-new-tender', component: Tender },
      { name: 'contractor-tenders', path: 'tenders', component: ContractorTenderSummary },
      { name: 'contractor-tender-details', path: 'tenders/:id', component: ContractorTenderDetails },
      { name: 'contractor-offers', path: 'offers', component: OfferList }
    ]
  },

  {
    name: 'bidder-module', path: '/bidders', component: BidderToolbar,
    children: [
      { name: 'new-offer', path: 'send-new-offer', component: Offer },
      { name: 'bidder-tenders', path: 'tenders', component: BidderTenderSummary },
      { name: 'bidder-tender-details', path: 'tenders/:id', component: BidderTenderDetails },
      { name: 'bidder-offers', path: 'offers', component: OfferList }
    ]
  },

  { name: 'administrator-module', path:'/administrators', component: RouterView },

  {
    name: 'user-module', path: '/users', component: RouterView,
    children: [
      {
        path: 'bids', component: RouterView,
        children: [
          { name: 'bid-details', path: 'details', component: BidDetails },
        ]
      }
    ],
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
