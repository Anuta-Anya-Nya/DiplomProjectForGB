<template>
  <div>
    <div v-if="currentUser">
      <div>
        Записаться
        <router-link to="/appointment/master">Выбрать мастера</router-link>
        <router-link to="/appointment/service">Выбрать услугу</router-link>
      </div>
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

<style lang="scss" scoped></style>
