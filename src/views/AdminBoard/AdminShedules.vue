<template>
  <div class="container">
    <div class="shedule">
      <div class="shedule__title">
        <label for="dateAdminShedule">Выберите дату: </label>
        <input type="date" id="dateAdminShedule" v-model.lazy="selectedDate" />
      </div>

      <table class="shedule-table">
        <thead>
          <tr class="shedule-table__row">
            <th rowspan="2">Время</th>
            <th colspan="2">Мастер</th>
            <th colspan="3">Услуга</th>
            <th colspan="2">Клиент</th>
            <th rowspan="2">Действие</th>
          </tr>
          <tr class="shedule-table__row">
            <td>Имя</td>
            <td>Должность</td>
            <td>Услуга</td>
            <td>Длительность</td>
            <td>Цена</td>
            <td>Имя</td>
            <td>Телефон</td>
          </tr>
        </thead>
        <tbody>
          <tr class="shedule-table__row" v-for="shedule in SHEDULE" :key="shedule.id">
            <td>{{ shedule.time }}</td>
            <td>{{ shedule.master.name }}</td>
            <td>{{ shedule.master.position }}</td>
            <td>{{ shedule.service.title }}</td>
            <td>{{ shedule.service.duration }}мин</td>
            <td>{{ shedule.service.price }} руб.</td>
            <td>{{ shedule.user.name }}</td>
            <td>{{ shedule.user.phone }}</td>
            <td @click="deleteShedule(shedule.id)" class="shedule-lk__delete"><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
      <div v-if="SHEDULE?.length === 0">
        Записи на выбранную дату отсутствуют
      </div>      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import utils from "../../services/utils";
export default {
  name: "AdminShedules",

  data() {
    return {
      selectedDate: utils.getDate(new Date()),
    };
  },

  mounted() {
    this.$store.dispatch(
      "GET_SHEDULE_BY_DATE_FOR_ADMIN",
      utils.getDate(new Date())
    );
  },

  watch: {
    selectedDate: function () {
      this.$store.dispatch("GET_SHEDULE_BY_DATE_FOR_ADMIN", this.selectedDate);
    },
  },

  computed: {
    ...mapGetters(["SHEDULE"]),    
  },

  methods: {
    deleteShedule(id) {
      const answer = confirm("Удалить запись?");
      if (answer) {
        this.$store.dispatch("DELETE_SHEDULE", id);
        alert("Запись удалена");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";

.shedule-table {
  border-collapse: collapse;
  width: 100%;
    thead{
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
</style>
