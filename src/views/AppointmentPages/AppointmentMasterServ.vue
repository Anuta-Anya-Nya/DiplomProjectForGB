<template>
  <div class="container shedule">
    <h3>Выберите услугу:</h3>
    <button
      v-for="service in SERVICES"
      :key="service.id"
      class="button-simple button-link"
      @click="selectService(service)"
    >
      {{ service.title }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppointmentMasterServ",
  mounted() {
    this.$store.dispatch(
      "GET_SERVICES_BY_GROUP",
      this.CURRENT_MASTER.groupServiceId
    );
  },
  computed: {
    ...mapGetters(["SERVICES", "CURRENT_MASTER"]),
  },
  methods: {
    ...mapMutations(["SET_CURRENT_SERVICE"]),
    selectService(service) {
      this.SET_CURRENT_SERVICE(service);
      this.$router.push({
        path: `/shedule/master/${this.CURRENT_MASTER.id}/${service.id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
</style>
