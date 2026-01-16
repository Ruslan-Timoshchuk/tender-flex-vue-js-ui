import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import ToolBar from '@/components/ToolBar.vue'
import TendersList from '@/components/tender/TenderList.vue'
import Tender from '@/components/tender/Tender.vue'
import BidDetails from '@/components/BidDetails.vue'
import Offer from '@/components/offer/Offer.vue'
import OfferList from '@/components/offer/OfferList.vue'
import { RouterView } from 'vue-router'

const routes = [

  { name: 'login', path: '', component: LogIn },

  {
    name: 'user-module', path: '/users', component: ToolBar,
    children: [
      {
        path: 'bids', component: RouterView,
        children: [
          { name: 'bid-details', path: 'details', component: BidDetails },
          {
            path: 'tenders', component: RouterView,
            children: [
              { name: 'new-tender', path: 'create-new-tender', component: Tender },
              { name: 'tenders', path: 'list', component: TendersList }
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
