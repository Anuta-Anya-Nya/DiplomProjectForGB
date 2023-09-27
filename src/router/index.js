import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import MastersPage from '../views/MastersPage.vue'
import AboutMaster from '../views/AboutMaster.vue'

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
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
