i
<template>
  <div class="container">
    <div class="shedule">
      <div class="shedule__title">Наши клиенты</div>
      <div>
        <label for="userPhone" class="shedule__title"
          >Поиск по номеру телефона: 
        </label>
        <input type="text" id="userPhone" v-model.lazy="inputPhone" />
        <i  class="fa fa-search button-search" aria-hidden="true"></i>
      </div>
      <table class="shedule-table">
        <thead>
          <tr class="shedule-table__row">
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Дата рождения</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr class="shedule-table__row" v-for="user in USERS" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.birthdate }}</td>
            <td>
              <i @click="makeAppointmentUser(user.id)"
                class="fa fa-pencil-square-o shedule-lk__actions"
                aria-hidden="true"
              ></i>
              <i
                @click="deleteUser(user.id)"
                class="fa fa-trash shedule-lk__actions shedule-lk__actions-del"
                aria-hidden="true"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="USERS?.length === 0">Клиенты отсутсвуют</div>
      <div class="arrows">
        <i
          v-if="start <= 0"
          class="fa fa-circle arrows__item"
          aria-hidden="true"
        ></i>
        <i
          @click="previousList()"
          class="fa fa-chevron-circle-left arrows__item"
          aria-hidden="true"
          v-if="start > 0"
        ></i>

        <i
          @click="nextList()"
          class="fa fa-chevron-circle-right arrows__item"
          aria-hidden="true"
          v-if="remainder > 0"
        ></i>
        <i
          class="fa fa-circle arrows__item"
          aria-hidden="true"
          v-if="remainder <= 0"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AdminUsers",

  data() {
    return {
      start: 0,
      count: 5,
      inputPhone: null,
    };
  },

  mounted() {
    const params = { start: 0, count: this.count };
    this.$store.dispatch("GET_USERS", params);
    this.$store.dispatch("GET_USER_COUNT");
  },
  watch: {
    inputPhone: function () {
      this.start = 0;
      const params = {
        start: this.start,
        count: this.count,
        phone: this.inputPhone,
      };
      console.log(params);
      this.$store.dispatch("GET_USERS", params);
      this.$store.dispatch("GET_USER_COUNT", this.inputPhone);
    },
  },
  computed: {
    ...mapGetters(["USERS", "USERS_COUNT"]),
    remainder() {
      return this.USERS_COUNT - (this.start / this.count + 1) * this.count;
    },
  },

  methods: {
    ...mapMutations(["SET_USER_FOR_SHEDULE"]),
    deleteUser(id) {
      console.log("del");
      const answer = confirm("Удалить аккаунт клиента?");
      if (answer) {
        this.$store.dispatch("DELETE_USER", id);
        alert("Запись удалена");
      }
    },
    nextList() {
      let params;
      if (this.inputPhone) {
        params = {
          start: this.start + this.count,
          count: this.count,
          phone: this.inputPhone,
        };
      } else {
        params = { start: this.start + this.count, count: this.count };
      }
      this.$store.dispatch("GET_USERS", params);
      this.start += this.count;
    },
    previousList() {
      let params;
      if (this.inputPhone) {
        params = {
          start: this.start - this.count,
          count: this.count,
          phone: this.inputPhone,
        };
      } else {
        params = { start: this.start - this.count, count: this.count };
      }
      this.$store.dispatch("GET_USERS", params);
      this.start -= this.count;
    },
    makeAppointmentUser(id){
      this.SET_USER_FOR_SHEDULE(id);
      this.$router.push({ path: `/shedule` });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";

.arrows {
  width: 70px;
  display: flex;
  justify-content: space-between;
  &__item {
    cursor: pointer;
    &:hover {
      color: $color-hover;
    }
  }
}
.button-search{
  cursor: pointer;
  margin-left: 15px;
  &:hover {
      color: $color-hover;
    }
}
</style>
