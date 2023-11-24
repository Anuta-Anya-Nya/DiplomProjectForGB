<template>
  <div class="container shedule">
    
      <h3> Выберите услугу: </h3>
      <details
        v-for="groupService in GET_GROUP_SERVICES"
        :key="groupService.id"
      >
        <summary class="summary">{{ groupService.title }}</summary>
        <div class="buttons-time-box details">
<router-link
          :to="`/shedule/service/${service.id}`"
          v-for="service in GET_SERVICES.filter(
            (el) => el.groupServiceId === groupService.id
          )"
          :key="service.id"
          class="button-simple button-shedule button-link-services"
          >{{ service.title }}</router-link
        >
        </div>
        
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
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
.summary{
  text-align: center;
  
}
.details{
  margin-top: 15px;
}
</style>
