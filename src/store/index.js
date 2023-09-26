import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quotes: [
      {author: 'Софи Лорен', text: 'Прическа влияет на то, как складывается день, а в итоге и жизнь.'},
      {author: 'Янина Ипохорская', text: 'Даже самую лучшую прическу нужно иногда менять'},
      {author: 'Одри Хепберн', text: 'Я верю в маникюр, в кричащую одежду, в то, что на отдыхе тоже необходимо делать прическу и наносить губную помаду'},
      {author: 'Эвелина Хромченко', text: 'Макияж - это одежда для лица. Не грешите, выходя на улицу голыми'},
      {author: 'Кэльвин Кляйн', text: 'Самое главное в макияже - выглядеть совершенно естественно; но для этого нужно очень много косметики'},
    ],
    services: [
      {title: '', image: '', link: ''}
    ]
  },
  getters: {
    GET_RANDOM_QUOT(state) {
      const index = Math.floor(Math.random() * state.quotes.length);
      return state.quotes[index];
    },
    GET_SERVICES(state){
      return state.services;
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
