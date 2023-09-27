import Vue from 'vue'
import Vuex from 'vuex'

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
    services: [
      { id: 111, title: 'Парикмахерские услуги', image: 'serv1.jpg', link: '/main' },
      { id: 222, title: 'Маникюр', image: 'serv2.jpg', link: '/main' },
      { id: 333, title: 'Педикюр', image: 'serv3.jpg', link: '/main' },
      { id: 444, title: 'Косметология', image: 'serv4.jpg', link: '/main' },
      { id: 555, title: 'Эстетист по телу', image: 'serv5.jpg', link: '/main' },
      { id: 666, title: 'Визаж', image: 'serv6.jpg', link: '/main' },
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
    masters: [
      { id: 111, name: 'Елена Васильева', position: 'Визажист', photo: 'master1.jpg', aboutText: 'Очень любит свою работу. Обучалась у лучших мастеров города, края и России. Имеет большой опыт в своей сфере. Любит делать людей счастливыми', serviceID: 666 },
      { id: 112, name: 'Ирина Иванова', position: 'Парикмахер', photo: 'master2.jpg', aboutText: 'Очень любит свою работу. Обучалась у лучших мастеров города, края и России. Имеет большой опыт в своей сфере. Любит делать людей счастливыми', serviceID: 111 },
      { id: 113, name: 'Мария Петрова', position: 'Массажист', photo: 'master3.jpg', aboutText: 'Очень любит свою работу. Обучалась у лучших мастеров города, края и России. Имеет большой опыт в своей сфере. Любит делать людей счастливыми', serviceID: 555 },
      { id: 114, name: 'Виктория Попова', position: 'Мастер маникюра', photo: 'master4.jpg', aboutText: 'Очень любит свою работу. Обучалась у лучших мастеров города, края и России. Имеет большой опыт в своей сфере. Любит делать людей счастливыми', serviceID: 222 },
      { id: 115, name: 'Елена Васильева', position: 'Парикмахер', photo: 'master1.jpg', aboutText: 'Очень любит свою работу. Обучалась у лучших мастеров города, края и России. Имеет большой опыт в своей сфере. Любит делать людей счастливыми', serviceID: 111 },
      { id: 116, name: 'Ирина Сергеева', position: 'Косметолог', photo: 'master5.jpg', aboutText: 'Очень любит свою работу. Обучалась у лучших мастеров города, края и России. Имеет большой опыт в своей сфере. Любит делать людей счастливыми', serviceID: 444 },
    ]
  },
  getters: {
    GET_RANDOM_QUOT(state) {
      const index = Math.floor(Math.random() * state.quotes.length);
      return state.quotes[index];
    },
    GET_SERVICES(state) {
      return state.services;
    },
    GET_WORKSIMAGE(state) {
      return state.worksImage;
    },
    GET_MASTERS(state) {
      return state.masters;
    },
    GET_MASTER_FOR_ID: state => id => state.masters.find(el => el.id === +id),

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
