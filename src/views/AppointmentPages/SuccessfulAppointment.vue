<template>
  <div>
    <div>
      <h3>Спасибо за запись!</h3>
      <p>мастер {{getSelectMasterName}} ждет Вас в нашем салоне</p>
      <p> {{ selectedTime }}</p>
    </div>
    <router-link to="/main" class="subscribeBtn"
      >Вернуться на главную</router-link
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SuccessfulAppointment",
  data() {
    return {
      masterId: +this.$route.params.idMaster, 
      selectedTime: this.$route.params.recDate, //Thu Nov 16 2023 15:00:00 GMT+0300 (Москва, стандартное время)
    };
  },

  computed: {
    ...mapGetters([
      "GET_MASTERS",
      "getServerUrl",
      "GET_SERVICES",
      "GET_SHEDULE",
      "GET_FREE_SHEDULE_OF_MASTER",
      "GET_SERVICE_FOR_ID",
      "GET_MASTERS_FOR_GROUPServ",
    ]),
    getSelectMasterName() {      
        return this.GET_MASTERS.find((el) => el.id === this.masterId).name;
      },
  },
};
</script>

<style lang="scss" scoped>
.subscribeBtn {
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
  line-height: 60px;
  box-sizing: border-box;
  text-decoration: none;
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    border: 1px solid #cdaa7d;
  }
}
</style>
