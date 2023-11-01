import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import MastersPage from '../views/MastersPage.vue'
import AboutMaster from '../views/AboutMaster.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import PricePage from '../views/PricePage.vue'
import PromotionsPage from '../views/PromotionsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/main',
    component: MainPage
  },
  {
    path: '/masters',
    component: MastersPage
  },
  {
    path: '/masters/:masterID',
    component: AboutMaster
  },
  {
    path: '/price',
    component: PricePage
  },
  {
    path: '/promo',
    component: PromotionsPage
  },
  {
    path: '*',
    component: NotFoundPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
