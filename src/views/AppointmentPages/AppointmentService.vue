<template>
  <div>
    Выберите услугу:
    <details v-for="groupService in GET_GROUP_SERVICES" :key="groupService.id">
      <summary>{{ groupService.title }}</summary>
      <router-link
        to="/appointment/service/1"
        v-for="service in GET_SERVICES.filter(
          (el) => el.groupServiceId === groupService.id
        )"
        :key="service.id"
        >{{ service.title }}</router-link
      >
    </details>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppointmenService",

  data() {
    return {};
  },

  mounted() {},

  computed: {
    ...mapGetters(["GET_SERVICES", "GET_GROUP_SERVICES"]),
  },
};
</script>

<style lang="scss" scoped></style>
