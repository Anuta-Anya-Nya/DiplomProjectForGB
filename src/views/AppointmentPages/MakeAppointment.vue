<template>
  <div>
    <p>{{ getSelectMasterName }}</p>
    <p>{{ getSelectService.title }}</p>
    <p>Длительность: {{ getSelectService.duration }} мин.</p>
    <p>Цена: {{ getSelectService.price }} руб.</p>
    <p>Выберите дату:</p>
    <input type="date" id="dateAppointment" v-model.lazy="selectedDate" />
    <p v-if="selectedDate">Выберите время для записи:</p>
    <p
      v-for="time in getFreeTime"
      :key="time.index"
      @click="selectedTime = time"
    >
      {{ time.getHours() }} : {{ time.getMinutes() < 10 ? 0 : ""
      }}{{ time.getMinutes() }}
    </p>
    <p v-if="selectedTime">
      Выбранная дата: {{ selectedDate }} Выбранное время:
      {{ selectedTime.getHours() }} :
      {{ selectedTime.getMinutes() < 10 ? 0 : ""
      }}{{ selectedTime.getMinutes() }}
    </p>
    <button v-if="selectedDate && selectedTime" @click="addNewShedule()">
      Записаться
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "MakeAppointment",

  data() {
    return {
      masterId: +this.$route.params.idMaster,
      serviceId: +this.$route.params.idService,
      selectedDate: null,
      selectedTime: null,
      userId: 1,
    };
  },

  computed: {
    ...mapGetters([
      "GET_MASTERS",
      "getServerUrl",
      "GET_SERVICES",
      "GET_SHEDULE",
      "GET_FREE_SHEDULE_OF_MASTER",
      "GET_SERVICE_FOR_ID",
    ]),

    getFreeTime() {
      if (!this.selectedDate) {
        return null;
      }
      // Получаем свободное время у мастера
      const sheduleMasterOfSelectDay = this.GET_FREE_SHEDULE_OF_MASTER(
        this.selectedDate,
        this.masterId
      );
      const freeTimeList = [];
      const offTimeList = [];

      // Время начала и окончания работы мастеров
      let startTime = new Date(`${this.selectedDate} 10:00`);
      let finishTime = new Date(`${this.selectedDate} 20:00`);      
      
      const selectServiceDuration = this.getSelectService.duration / 30 - 1;  
      // Формирование списка занятого времени у мастера, с учетом длительности услуг
      sheduleMasterOfSelectDay.forEach((el) => {
        let offTime = new Date(`${el.dateAppointment} ${el.timeAppointment}`);
        const findOffTimeForService =
          this.GET_SERVICE_FOR_ID(el.serviceId).duration / 30; 
        for (let i = 0; i < findOffTimeForService; i++) {
          offTimeList.push(offTime.getTime());
          offTime.setMinutes(offTime.getMinutes() + 30);
        }
        // необходимо вычеркнуть длительность выбранной для записи услуги перед занятым временем мастера, чтобы не пересекалась новая и старая запись 
        let offTimeForSelectServiceDuration = new Date(`${el.dateAppointment} ${el.timeAppointment}`);
        offTimeForSelectServiceDuration.setMinutes(offTimeForSelectServiceDuration.getMinutes() - 30);
        for (let i = 0; i < selectServiceDuration; i++) {        
        offTimeList.push(offTimeForSelectServiceDuration.getTime());
        offTimeForSelectServiceDuration.setMinutes(offTimeForSelectServiceDuration.getMinutes() - 30);
      }

      });

      // Формирование списка времени для возможной записи
      while (startTime.getTime() < finishTime.getTime()) {
        freeTimeList.push(new Date(startTime.getTime()));
        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      // Выбранная заказчиком услуга не должна заканчиваться после времени окончания работы салона      
      finishTime.setMinutes(finishTime.getMinutes() - 30);
      for (let i = 0; i < selectServiceDuration; i++) {        
        offTimeList.push(finishTime.getTime());
        finishTime.setMinutes(finishTime.getMinutes() - 30);
      }
      
      return freeTimeList.filter((el) => !offTimeList.includes(el.getTime()));
    },

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
  },
  methods: {
    ...mapMutations(["SET_MASTERS", "ADD_NEW_SHEDULE", "SET_SHEDULE"]),
    addNewShedule() {
      const newShedule = {
        dateAppointment: `${this.selectedTime.getFullYear()}-${
          this.selectedTime.getMonth() + 1
        }-${
          this.selectedTime.getDate() < 10 ? 0 : ""
        }${this.selectedTime.getDate()}`,
        timeAppointment: `${this.selectedTime.getHours()}:${
          this.selectedTime.getMinutes() < 10 ? 0 : ""
        }${this.selectedTime.getMinutes()}:00`,
        userId: this.userId,
        masterId: this.masterId,
        serviceId: this.serviceId,
      };
      axios
        .post(`${this.getServerUrl}/appointments`, newShedule)
        .then((e) => console.log(e.data));
      // this.ADD_NEW_SHEDULE(newShedule);
    },
  },
  mounted() {
    axios.get(`${this.getServerUrl}/appointments`).then((res) => {
      const data = [];
      res.data._embedded.appointments.forEach((element) => {
        data.push({
          id: element.id,
          dateAppointment: element.dateAppointment,
          timeAppointment: element.timeAppointment,
          userId: element.userId,
          masterId: element.masterId,
          serviceId: element.serviceId,
        });
      });
      this.SET_SHEDULE(data);
    });
  },
};
</script>

<style lang="scss" scoped></style>
