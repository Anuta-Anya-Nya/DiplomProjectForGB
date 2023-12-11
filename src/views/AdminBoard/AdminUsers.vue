<template>
  <div class="container">
    <div class="shedule">
      <div class="shedule__title">Наши клиенты</div>

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
              <i
                class="fa fa-pencil-square-o shedule-lk__delete"
                aria-hidden="true"
              ></i>
              <i
                @click="deleteUser(user.id)"
                class="fa fa-trash shedule-lk__delete"
                aria-hidden="true"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="USERS?.length === 0">Клиенты отсутсвуют</div>
      <div class="arrows">
        <i
          class="fa fa-chevron-circle-left arrows__item"
          aria-hidden="true"
        ></i>
        <i class="fa fa-chevron-circle-right arrows__item" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdminUsers",

  data() {
    return {
      start: 0,
      count: 5
    };
  },

  mounted() {
    const params = { start: 0, count: 4 };
    this.$store.dispatch("GET_USERS", params);
  },
  computed: {
    ...mapGetters(["USERS"]),
  },

  methods: {
    deleteUser(id) {
      console.log("del");
      const answer = confirm("Удалить аккаунт клиента?");
      if (answer) {
        this.$store.dispatch("DELETE_USER", id);
        alert("Запись удалена");
      }
    },
    nextList(){
      
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";

.shedule-table {
  border-collapse: collapse;
  width: 100%;
  thead {
    color: $color-hover;
  }

  &__row {
    border: 1px solid $color-text;
  }
  th {
    border: 1px solid $color-text;
    padding: 5px 0 5px 0;
  }
  td {
    border: 1px solid $color-text;
    text-align: center;
    vertical-align: middle;
    padding: 5px 0 5px 0;
  }
}
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
</style>
