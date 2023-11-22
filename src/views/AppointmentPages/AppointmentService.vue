<template>
  <div>
    <div v-if="currentUser">
      Выберите услугу:
      <details
        v-for="groupService in GET_GROUP_SERVICES"
        :key="groupService.id"
      >
        <summary>{{ groupService.title }}</summary>
        <router-link
          :to="`/appointment/service/${service.id}`"
          v-for="service in GET_SERVICES.filter(
            (el) => el.groupServiceId === groupService.id
          )"
          :key="service.id"
          >{{ service.title }}</router-link
        >
      </details>
    </div>
    <div v-if="!currentUser">
      <LoginMessage />
    </div>
  </div>
</template>

<script>
import LoginMessage from "@/components/LoginMessage.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppointmenService",
  components: {
    LoginMessage,
  },

  data() {
    return {};
  },

  mounted() {},

  computed: {
    ...mapGetters(["GET_SERVICES", "GET_GROUP_SERVICES"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style lang="scss" scoped></style>
