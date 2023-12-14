import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import { masterStore } from './master.module';
import { servicesStore } from './services.module';
import { sheduleStore } from './shedule.module';
import { userStore } from './user.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quotes: [
      { author: 'Софи Лорен', text: 'Прическа влияет на то, как складывается день, а в итоге и жизнь.' },
      { author: 'Янина Ипохорская', text: 'Даже самую лучшую прическу нужно иногда менять' },
      { author: 'Одри Хепберн', text: 'Я верю в маникюр, в кричащую одежду, в то, что на отдыхе тоже необходимо делать прическу и наносить губную помаду' },
      { author: 'Эвелина Хромченко', text: 'Макияж - это одежда для лица. Не грешите, выходя на улицу голыми' },
      { author: 'Кэльвин Кляйн', text: 'Самое главное в макияже - выглядеть совершенно естественно; но для этого нужно очень много косметики' },
    ],
    groupServices: [
      { id: 1, title: 'Парикмахерские услуги', image: 'serv1.jpg' },
      { id: 2, title: 'Маникюр', image: 'serv2.jpg' },
      { id: 3, title: 'Педикюр', image: 'serv3.jpg' },
      { id: 4, title: 'Косметология', image: 'serv4.jpg' },
      { id: 5, title: 'Эстетист по телу', image: 'serv5.jpg' },
      { id: 6, title: 'Визаж', image: 'serv6.jpg' },
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
  },
  getters: {
    GET_RANDOM_QUOT(state) {
      const index = Math.floor(Math.random() * state.quotes.length);
      return state.quotes[index];
    },
    GROUP_SERVICES(state) {
      return state.groupServices;
    },
    GET_GROUP_SERVICE_FOR_ID: state => (id) => state.groupServices.find(el => el.id === id),
    GET_WORKSIMAGE(state) {
      return state.worksImage;
    },
    GET_ACTIONS(state) {
      return state.actions;
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    masterStore,
    servicesStore,
    sheduleStore,
    userStore
  }
})
