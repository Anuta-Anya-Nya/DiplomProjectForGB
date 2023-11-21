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
    axios.get(`${this.getServerUrl}/services`).then((res) => {
      const data = [];
      res.data.forEach((element) => {
        data.push({
          id: element.id,
          title: element.title,
          groupServiceId: element.group_service_id,
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
      //   axios.get(`${this.getServerUrl}/services/byGroupService?group_service_id=${this.getServerUrl}`).then((res) => {
      //   const data = [];
      //   res.data.forEach((element) => {
      //     data.push({
      //       id: element.id,
      //       title: element.title,
      //       group_service_id: element.group_service_id,
      //       duration: element.duration,
      //       price: element.price,
      //     });
      //   });
      //   this.SET_SERVICES(data);
      // });
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
