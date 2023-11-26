import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import MainPage from '../views/MainPage.vue'
import MastersPage from '../views/MastersPage.vue'
import AboutMaster from '../views/AboutMaster.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import PricePage from '../views/PricePage.vue'
import PromotionsPage from '../views/PromotionsPage.vue'
import AppointmentPage from '../views/AppointmentPages/AppointmentPage.vue';
import AppointmentMaster from '../views/AppointmentPages/AppointmentMaster.vue';
import AppointmentService from '../views/AppointmentPages/AppointmentService.vue';
import AppointmentServiceGroup from '../views/AppointmentPages/AppointmentServiceGroup.vue';
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
    path: '/shedule',
    component: AppointmentPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shedule/master',
    component: AppointmentMaster,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shedule/master/:idMaster',
    component: AppointmentMasterServ,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/shedule/master/:idMaster/:idService',
    component: MakeAppointment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shedule/service',
    component: AppointmentService,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shedule/service/:idService',
    component: MakeAppointment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shedule/serviceGroup/:idGroup',
    component: AppointmentServiceGroup,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shedule/master/:idMaster/:idService/:recDate',
    component: SuccessfulAppointment,
    meta: {
      requiresAuth: true
    }
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
    component: AdminBoard,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (store.state.auth.user) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
