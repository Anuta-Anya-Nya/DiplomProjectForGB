<template>
  <div class="container shedule">
    <h3>Выберите услугу:</h3>
    
      
        <button
          v-for="service in SERVICES"
          :key="service.id"
          @click="selectService(service)"
          class="button-simple button-link"
        >
          {{ service.title }}
        </button>
      
    
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppointmentServiceGroup",

  data() {
    return {};
  },

  mounted() {
    this.$store.dispatch("GET_SERVICES_BY_GROUP", this.selectedGroupId);
  },

  computed: {
    ...mapGetters(["SERVICES"]),

    selectedGroupId(){
      return +this.$route.params.idGroup;
    }
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
