<template>
  <div class="container shedule">
    <h3>Спасибо за запись!</h3>
    <p>
      Наш мастер
      <span class="shedule__value">{{ CURRENT_MASTER.name }}</span> ждет Вас в
      нашем салоне
    </p>
    <p class="shedule__value shedule__title">
      {{ printDate(selectedDate) }} в {{ selectedTime }}
    </p>
    <button @click="cleanCurrentValue()" class="subscribeBtn button-margin">
      Вернуться на главную
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import utils from "../../services/utils";

export default {
  name: "SuccessfulAppointment",
  computed: {
    ...mapGetters([
      "CURRENT_MASTER",
    ]),    

    selectedDate() {
      return this.$route.params.recDate.slice(0, 10);
    },
    
    selectedTime() {
      return this.$route.params.recDate.slice(11, 16);
    },
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_SERVICE",
      "SET_CURRENT_MASTER",
      "SET_SHEDULE",
      "SET_USER_FOR_SHEDULE"
    ]),

    printDate(date){
      return utils.printDate(date);
    },

    cleanCurrentValue() {
      this.SET_CURRENT_MASTER(null);
      this.SET_CURRENT_SERVICE(null);
      this.SET_SHEDULE(null);
      this.SET_USER_FOR_SHEDULE(null);
      this.$router.push({ path: `/main` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
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
.button-margin {
  margin-top: 30px;
}
</style>
