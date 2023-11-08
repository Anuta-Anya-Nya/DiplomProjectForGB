<template>
  <div>
    <p>{{ getSelectMasterName }}</p>
    <p>{{ getSelectService.title }}</p>
    <p>Длительность: {{ getSelectService.duration }} мин.</p>
    <p>Цена: {{ getSelectService.price }} руб.</p>
    <p>Выберите дату время</p>
    <input type="date" id="dateAppointment" v-model="selectedData" />
    <p>{{ selectedData }}</p>
    
    <button>Записаться</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import axios from "axios";
export default {
  name: "MakeAppointment",

  data() {
    return {
      masterId: +this.$route.params.idMaster,
      serviceId: +this.$route.params.idService,
      selectedData: null,
    };
  },

  // mounted() {
  //   axios.get(`${this.getServerUrl}/services?page=0&size=25`).then((res) => {
  //     const data = [];
  //     res.data._embedded.services.forEach((element) => {
  //       data.push({
  //         id: element.id,
  //         title: element.title,
  //         groupServiceId: element.groupServiceId,
  //         duration: element.duration,
  //         price: element.price,
  //       });
  //     });
  //     this.SET_SERVICES(data);
  //   });
  // },

  computed: {
    ...mapGetters(["GET_MASTERS", "getServerUrl", "GET_SERVICES", "GET_SHEDULE"]),

    getSelectMasterName() {
      if (this.masterId) {
        return this.GET_MASTERS.find((el) => el.id === this.masterId).name;
      } else {
        return "Любой мастер";
      }
    },
    getSelectService() {
      return this.GET_SERVICES.find((el) => el.id === this.serviceId);
    },
    // getFreeTime(){
    //   const freeTime = [];
    //   const sheduleMasterOfSelectDay = this.GET_SHEDULE.filter(el => el.date_appointment.localeCompare(this.selectedData));
      
    //   return freeTime;
    // }
  },
  methods: {
    ...mapMutations(["SET_MASTERS"]),
  },
};
</script>

<style lang="scss" scoped></style>
