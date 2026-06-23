import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ContractorToolbar from '@/components/toolbar/ContractorToolbar.vue'
import ContractorTenderOffersSection from '@/components/tender/ContractorTenderOffersSection.vue'
import ContractorTenderDescription from '@/components/tender/ContractorTenderDescription.vue'
import BidderTenderDetails from '@/components/tender/BidderTenderDetails.vue'
import BidderOfferDetails from '@/components/offer/BidderOfferDetails.vue'
import ContractorTenderSummary from '@/components/tender/ContractorTenderSummary.vue'
import BidderToolbar from '@/components/toolbar/BidderToolbar.vue'
import BidderTenderSummary from '@/components/tender/BidderTenderSummary.vue'
import Tender from '@/components/tender/Tender.vue'
import BidDetails from '@/components/BidDetails.vue'
import Offer from '@/components/offer/Offer.vue'
import OfferList from '@/components/offer/OfferList.vue'
import ContractorOfferSummary from '@/components/offer/ContractorOfferSummary.vue'
import { RouterView } from 'vue-router'
import ContractorOfferDecisionActions from '@/components/offer/ContractorOfferDecisionActions.vue'
import ContractorOfferDetails from '@/components/offer/ContractorOfferDetails.vue'

const routes = [

  { name: 'login', path: '', component: LogIn },

  {
    name: 'contractor-module', path: '/contractors', component: ContractorToolbar,
    children: [
      { name: 'new-tender', path: 'create-new-tender', component: Tender },
      { name: 'contractor-tenders', path: 'tenders', component: ContractorTenderSummary },
      { name: 'contractor-tender-description', path: 'tenders/description/:id', component: ContractorTenderDescription },
      { name: 'contractor-tender-offers-section', path: 'tenders/details/:id', component: ContractorTenderOffersSection },
      { name: 'contractor-offers', path: 'offers', component: ContractorOfferSummary },
      { name: 'contractor-offer-details', path: 'offers/:id', component: ContractorOfferDetails },
      { name: 'contractor-offer-decision-actions', 
        path: 'offers/offer-id/:offerId/decisions/:awardDecisionId/:rejectDecisionId', 
        component: ContractorOfferDecisionActions }
    ]
  },

  {
    name: 'bidder-module', path: '/bidders', component: BidderToolbar,
    children: [
      { name: 'bidder-tenders', path: 'tenders', component: BidderTenderSummary },
      { name: 'bidder-tender-details', path: 'tenders/:tenderId', component: BidderTenderDetails },
      { name: 'new-offer', path: 'offers/send-new-offer/tender-id/:tenderId', component: Offer },
      { name: 'bidder-offers', path: 'offers', component: OfferList },
      { name: 'bidder-offer-details', path: 'offers/:tenderId', component: BidderOfferDetails }
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
