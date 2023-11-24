<template>
  <div class="container shedule">
    <div class="shedule__box">
      <h3>Записаться:</h3>

      <router-link to="/shedule/master" class="button-simple button-link"
        >Выбрать мастера</router-link
      >
      <router-link to="/shedule/service" class="button-simple button-link"
        >Выбрать услугу</router-link
      >
    </div>
    <div v-if="!currentUser">
      <LoginMessage />
    </div>
  </div>
</template>

<script>
import LoginMessage from "@/components/LoginMessage.vue";
export default {
  name: "AppointmentPage",
  components: {
    LoginMessage,
  },

  data() {
    return {
      content: "",
    };
  },

  mounted() {},

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.shedule {
  padding: 30px;
  font-size: 22px;
  font-family: "Cormorant Garamond";
  &__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
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
}
.button-simple:hover {
  background-color: #ffffff;
  border: 1px solid #cdaa7d;
}
.button-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
}
</style>
