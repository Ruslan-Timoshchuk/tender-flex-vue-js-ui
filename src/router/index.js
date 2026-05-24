import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ContractorToolbar from '@/components/toolbar/ContractorToolbar.vue'
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
      { name: 'contractor-offers', path: 'offers', component: RouterView }
    ]
  },

  {
    name: 'bidder-module', path: '/bidders', component: BidderToolbar,
    children: [
      {
        name: 'bidder-tenders', path: 'tenders', component: BidderTenderSummary,
      },
      {
        name: 'bidder-offers', path: 'offers', component: RouterView,
      }
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
          {
            path: 'tenders', component: RouterView,
            children: [
              
              
            ]
          },
          {
            path: 'offers', component: RouterView,
            children: [
              { name: 'new-offer', path: 'send-new-offer', component: Offer },
              { name: 'offers', path: 'list', component: OfferList },
            ]
          },
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
