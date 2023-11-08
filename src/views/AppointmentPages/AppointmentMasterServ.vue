<template>
  <div>
    Выберите услугу:

    <router-link
      :to="`/appointment/master/${masterId}/${service.id}`"
      v-for="service in servicesOfMaster"
      :key="service.id"
      >{{ service.title }}</router-link
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "AppointmentMasterServ",

  data() {
    return {
      masterId: +this.$route.params.idMaster,
    };
  },

  mounted() {
    axios.get(`${this.getServerUrl}/services?page=0&size=25`).then((res) => {
      const data = [];
      res.data._embedded.services.forEach((element) => {
        data.push({
          id: element.id,
          title: element.title,
          groupServiceId: element.groupServiceId,
          duration: element.duration,
          price: element.price,
        });
      });
      this.SET_SERVICES(data);
    });
  },

  computed: {
    ...mapGetters([
      "GET_SERVICES",
      "getServerUrl",
      "GET_GROUP_SERVICES",
      "GET_MASTERS",
    ]),

    servicesOfMaster() {
      const selectMasterId = this.GET_MASTERS.find(
        (item) => item.id === this.masterId
      );
      const servicesOfMaster = this.GET_SERVICES.filter(
        (item) => item.groupServiceId === selectMasterId.serviceId
      );
      return servicesOfMaster;
    },
  },
  methods: {
    ...mapMutations(["SET_SERVICES"]),
  },
};
</script>

<style lang="scss" scoped></style>
