import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import { masterStore } from './master.module';
import { servicesStore } from './services.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backendUrl: "http://localhost:8080/api",
    quotes: [
      { author: 'Софи Лорен', text: 'Прическа влияет на то, как складывается день, а в итоге и жизнь.' },
      { author: 'Янина Ипохорская', text: 'Даже самую лучшую прическу нужно иногда менять' },
      { author: 'Одри Хепберн', text: 'Я верю в маникюр, в кричащую одежду, в то, что на отдыхе тоже необходимо делать прическу и наносить губную помаду' },
      { author: 'Эвелина Хромченко', text: 'Макияж - это одежда для лица. Не грешите, выходя на улицу голыми' },
      { author: 'Кэльвин Кляйн', text: 'Самое главное в макияже - выглядеть совершенно естественно; но для этого нужно очень много косметики' },
    ],
    actions: [
      { id: 1, text: "Первое посещение - скидка 20%", image: "actions1.jpg" },
      { id: 2, text: "Каждая пятая стрижка бесплатно", image: "actions2.jpg" },
    ],
    groupServices: [
      { id: 1, title: 'Парикмахерские услуги', image: 'serv1.jpg', link: '/main' },
      { id: 2, title: 'Маникюр', image: 'serv2.jpg', link: '/main' },
      { id: 3, title: 'Педикюр', image: 'serv3.jpg', link: '/main' },
      { id: 4, title: 'Косметология', image: 'serv4.jpg', link: '/main' },
      { id: 5, title: 'Эстетист по телу', image: 'serv5.jpg', link: '/main' },
      { id: 6, title: 'Визаж', image: 'serv6.jpg', link: '/main' },
    ],
    worksImage: [
      { id: 1, img: 'work-1.jpg', tagID: 1 },
      { id: 2, img: 'work-2.jpg', tagID: 3 },
      { id: 3, img: 'work-3.jpg', tagID: 2 },
      { id: 4, img: 'work-4.jpg', tagID: 1 },
      { id: 5, img: 'work-5.jpg', tagID: 1 },
      { id: 6, img: 'work-6.jpg', tagID: 3 },
      { id: 7, img: 'work-7.jpg', tagID: 2 },
      { id: 8, img: 'work-8.jpg', tagID: 3 },
      { id: 9, img: 'work-9.jpg', tagID: 3 }
    ],
    // masters: [
    //   // { id: 1, name: 'Елена Васильева', position: 'Визажист', photo: 'master1.jpg', aboutText: 'aaaa',  serviceId: '6'}
    // ],
    // services: [
    //   // {id: 1, title: 'Стрижка', groupServiceId: '1', duration: '60', price: '1000'}
    // ],
    shedule: [
      // { id: 1, dateAppointment: '2023-11-01', timeAppointment: '10:00:00', userId: 1, masterId: 1, serviceId: 20 },      
    ]

  },
  getters: {
    getServerUrl: state => {
      return state.backendUrl
    },
    GET_RANDOM_QUOT(state) {
      const index = Math.floor(Math.random() * state.quotes.length);
      return state.quotes[index];
    },
    GROUP_SERVICES(state) {
      return state.groupServices;
    },
    GET_WORKSIMAGE(state) {
      return state.worksImage;
    },
    GET_ACTIONS(state) {
      return state.actions;
    },
    // GET_MASTERS(state) {
    //   return state.masters;
    // },
    // GET_SERVICES(state) {
    //   return state.services;
    // },
    GET_SHEDULE(state) {
      return state.shedule;
    },
    GET_FREE_SHEDULE_OF_MASTER: state => (date, id) => state.shedule.filter(el => el.dateAppointment === date && el.masterId === id),
    GET_SERVICE_FOR_MASTERID: state => (id) => state.services.find(el => el.masterId === id),
    GET_SERVICE_FOR_ID: state => (id) => state.services.find(el => el.id === id),
    GET_MASTERS_FOR_GROUPServ: state => (groupServID) => state.masters.filter(master => master.serviceId === groupServID),
  },
  mutations: {
    // SET_MASTERS(state, mastersList) {
    //   state.masters = mastersList;
    // },
    // SET_SERVICES(state, servicesList) {
    //   state.services = servicesList;
    // },
    SET_SHEDULE(state, sheduleList) {
      state.shedule = sheduleList;
    },
    ADD_NEW_SHEDULE(state, newShedule) {
      state.shedule.push(newShedule);
    }
  },
  actions: {
  },
  modules: {
    auth,
    masterStore,
    servicesStore
  }
})
