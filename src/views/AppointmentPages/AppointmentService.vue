<template>
  <div class="container shedule">
    <h3>Выберите услугу:</h3>
    <details v-for="groupService in GROUP_SERVICES" :key="groupService.id">
      <summary class="summary">{{ groupService.title }}</summary>
      <div class="buttons-time-box details">
        <button
          v-for="service in SERVICES.filter(
            (el) => el.groupServiceId === groupService.id
          )"
          :key="service.id"
          @click="selectService(service)"
          class="button-simple button-shedule button-link-services"
        >
          {{ service.title }}
        </button>
      </div>
    </details>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppointmenService",

  mounted() {
    this.$store.dispatch("GET_SERVICES");
  },
  computed: {
    ...mapGetters(["SERVICES", "GROUP_SERVICES"]),
  },
  methods: {
    ...mapMutations(["SET_CURRENT_SERVICE", "SET_CURRENT_MASTER"]),

    selectService(service) {
      this.SET_CURRENT_SERVICE(service);
      this.SET_CURRENT_MASTER(null);
      this.$router.push({ path: `/shedule/service/${service.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
.summary {
  text-align: center;
}
.details {
  margin-top: 15px;
}
</style>
