<template>
  <div class="container">
    <div v-if="MASTER_ACCOUNT">
      <label for="dateAppointment" class="shedule__title"
        >Выберите дату:
      </label>
      <input type="date" id="dateMasterShedule" v-model.lazy="selectedDate" />
    </div>
    <div>
      <p v-for="item in SHEDULE" :key="item.id">
        {{ item.time }} {{ item.userId }} на {{ item.serviceId }}
      </p>
    </div>
    <div v-if="!MASTER_ACCOUNT">
      Мастера с вашим именем и фамилией не найдено
    </div>
    <div v-if="SHEDULE?.length === 0">Записи на выбранную дату отсутствуют</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import utils from "../../services/utils";
export default {
  name: "MasterBoard",

  data() {
    return {
      selectedDate: utils.getDate(new Date()),
    };
  },

  mounted() {
    const currentUser = this.$store.state.auth.user;
    const param = { name: currentUser.name, phone: currentUser.phone };
    this.$store.dispatch("GET_MASTER_BY_NAME_AND_PHONE", param).then((res) => {
      console.log(res);
      this.$store.dispatch("GET_SHEDULE_BY_DATE_AND_MASTER", {
        date: utils.getDate(new Date()),        
        id: res.id,
      });
    });
  },

  watch: {
    // при изменении даты, у сервера запрашивается расписание у выбранного мастера на выбранную дату
    selectedDate: function () {
      const param = { date: this.selectedDate, id: this.MASTER_ACCOUNT.id };
      this.$store.dispatch("GET_SHEDULE_BY_DATE_AND_MASTER", param);
    },
  },
  computed: {
    ...mapGetters(["MASTER_ACCOUNT", "SHEDULE"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.form-box {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  align-items: center;
}
</style>
