import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import MastersPage from '../views/MastersPage.vue'
import AboutMaster from '../views/AboutMaster.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import PricePage from '../views/PricePage.vue'
import PromotionsPage from '../views/PromotionsPage.vue'
import AppointmentPage from '../views/AppointmentPages/AppointmentPage.vue';
import AppointmentMaster from '../views/AppointmentPages/AppointmentMaster.vue';
import AppointmentService from '../views/AppointmentPages/AppointmentService.vue';
import AppointmentMasterServ from '../views/AppointmentPages/AppointmentMasterServ.vue';
import MakeAppointment from '../views/AppointmentPages/MakeAppointment.vue';

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
    path: '/appointment',
    component: AppointmentPage
  },
  {
    path: '/appointment/master',
    component: AppointmentMaster
  },
  {
    path: '/appointment/master/:idMaster',
    component: AppointmentMasterServ
  },
  {
    path: '/appointment/master/:idMaster/:idService',
    component: MakeAppointment
  },
  {
    path: '/appointment/service',
    component: AppointmentService
  },
  {
    path: '/appointment/service/:idService',
    component: MakeAppointment
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
