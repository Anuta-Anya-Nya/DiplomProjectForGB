<template>
  <div class="container">
    <h2 class="pages__title">Мои записи</h2>
    <div class="shedule-lk">
      <ul>
        <li
          v-for="shedule in separationShedule.future"
          :key="shedule.id"
          class="shedule-lk__list"
        >
          <div>
            {{ printDate(shedule.date) }}
            в
            {{ shedule.time }}
            к мастеру:
            {{ shedule.master.name }}
            на
            {{ shedule.service.title }} - стоимость:
            {{ shedule.service.price }} руб.
          </div>
          <div @click="deleteShedule(shedule.id)" class="shedule-lk__delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </div>
        </li>
      </ul>
      <div v-if="separationShedule.future.length === 0">
        <router-link to="/shedule" class="shedule-lk__link button-simple"
          >Записаться</router-link
        >
      </div>
      <h3 class="shedule-lk__title">Последние записи:</h3>
      <ul>
        <li
          v-for="shedule in separationShedule.past"
          :key="shedule.id"
          class="shedule-lk__list shedule-lk__list-past"
        >
          {{ printDate(shedule.date) }}
          в
          {{ shedule.time }}
          к мастеру:
          {{ shedule.master.name }}
          на
          {{ shedule.service.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import utils from "../../services/utils";

export default {
  name: "SheduleUser",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["SHEDULE"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
    dateNow() {
      return new Date().getTime();
    },
    separationShedule() {
      const separation = { past: [], future: [] };
      const countPastShedules = 5;

      this.SHEDULE.forEach((shedule) => {
        const dateShedule = new Date(
          `${shedule.date} ${shedule.time}`
        ).getTime();

        if (dateShedule > this.dateNow) {
          separation.future.push(shedule);
        } else {
          separation.past.push(shedule);
        }
      });
      separation.future.sort((a, b) => {
        const date1 = new Date(`${a.date} ${a.time}`).getTime();
        const date2 = new Date(`${b.date} ${b.time}`).getTime();
        return date1 - date2;
      });
      separation.past.sort((a, b) => {
        const date1 = new Date(`${a.date} ${a.time}`).getTime();
        const date2 = new Date(`${b.date} ${b.time}`).getTime();
        return date2 - date1;
      });
      separation.past.splice(
        countPastShedules - 1,
        separation.past.length - countPastShedules
      );

      return separation;
    },
  },

  mounted() {
    this.$store.dispatch("GET_SHEDULE_BY_USER", this.currentUser.id);
  },

  methods: {
    deleteShedule(id) {
      const answer = confirm("Удалить запись?");
      if (answer) {
        this.$store.dispatch("DELETE_SHEDULE", id);
        alert("Запись удалена");
      }
    },

    printDate(dateStr) {
      return utils.printDate(dateStr);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

.button-simple {
  height: 60px;
  background-color: #cdaa7d;
  border-radius: 10px;
  color: #0a1111;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: "Cormorant Garamond";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  box-sizing: border-box;
  transition: all 0.3s;
  &:hover {
    background-color: #ffffff;
    border: 1px solid #cdaa7d;
  }
}
</style>
