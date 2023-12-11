<template>
  <div class="container">
    <div class="shedule">
      <div v-if="MASTER_ACCOUNT" class="shedule__title">
        <label for="dateMasterShedule">Выберите дату: </label>
        <input type="date" id="dateMasterShedule" v-model.lazy="selectedDate" />
      </div>
      <div v-if="SHEDULE?.length !== 0">
        <p v-for="item in SHEDULE" :key="item.id">
          {{ item.time }} {{ item.user.name }} на {{ item.service.title }}
        </p>
      </div>
      <div v-if="!MASTER_ACCOUNT">
        Мастера с вашим именем и фамилией не найдено
      </div>
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
      this.$store.dispatch("GET_SHEDULE_BY_DATE_AND_MASTER_FOR_MASTER", {
        date: utils.getDate(new Date()),
        masterId: res.id,
      });
    });
  },

  watch: {
    selectedDate: function () {
      const param = {
        date: this.selectedDate,
        masterId: this.MASTER_ACCOUNT.id,
      };
      this.$store.dispatch("GET_SHEDULE_BY_DATE_AND_MASTER_FOR_MASTER", param);
    },
  },

  computed: {
    ...mapGetters(["SHEDULE"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {},
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
</style>
