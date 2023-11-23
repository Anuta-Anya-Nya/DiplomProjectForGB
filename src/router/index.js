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
import SuccessfulAppointment from '../views/AppointmentPages/SuccessfulAppointment.vue';
import ContactsPage from '../views/ContactsPage.vue'
import AccountPage from '../views/AccountPages/AccountPage.vue';
import LoginPage from '../views/AccountPages/LoginPage.vue';
import RegisterPage from '../views/AccountPages/RegisterPage.vue';
import AdminBoard from '../views/AdminBoard/AdminBoard.vue';
import SheduleUser from '../views/AccountPages/SheduleUser.vue';

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
    component: AppointmentMasterServ,

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
    path: '/appointment/master/:idMaster/:idService/:recDate',
    component: SuccessfulAppointment
  },
  {
    path: '/contacts',
    component: ContactsPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/profile',
    component: AccountPage
  },
  {
    path: '/admin',
    component: AdminBoard
  },
  {
    path: '/userShedule',
    component: SheduleUser
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
