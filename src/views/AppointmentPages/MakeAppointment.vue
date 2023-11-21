<template>
  <div>
    <p>{{ getSelectMasterName }}</p>
    <p>{{ getSelectService.title }}</p>
    <p>Длительность: {{ getSelectService.duration }} мин.</p>
    <p>Цена: {{ getSelectService.price }} руб.</p>
    <div v-if="showSelectMaster">
      <p>Выберите мастера:</p>
      <p
        @click="masterId = master.id"
        v-for="master in getAvailableMasters"
        :key="master.id"
      >
        {{ master.name }}
      </p>
      <div v-if="getAvailableMasters.length === 0">
        <p>Извините, запись на выбранную услугу в данный момент невозможна</p>
        <router-link to="/main" class="subscribeBtn"
          >Вернуться на главную</router-link
        >
      </div>
    </div>
    <div v-if="masterId">
      <p>Выберите дату:</p>
      <input type="date" id="dateAppointment" v-model.lazy="selectedDate" />
    </div>

    <p v-if="selectedDate">Выберите время для записи:</p>

    <div v-if="masterId">
      <p
        v-for="time in getFreeTime"
        :key="time.index"
        @click="selectedTime = time"
      >
        {{ time.getHours() }} : {{ time.getMinutes() < 10 ? 0 : ""
        }}{{ time.getMinutes() }}
      </p>
      <p v-if="getFreeTime?.length === 0">
        Извините, к данному мастеру {{ selectedDate }} запись невозможна.
        Попробуйте выбрать другой день
      </p>
    </div>

    <p v-if="selectedTime">
      Выбранная дата: {{ selectedDate }} Выбранное время:
      {{ selectedTime.getHours() }} :
      {{ selectedTime.getMinutes() < 10 ? 0 : ""
      }}{{ selectedTime.getMinutes() }}
    </p>
    <router-link
      :to="`/appointment/master/${masterId}/${serviceId}/${selectedDate}_${selectedTime.getHours()}:${
        selectedTime.getMinutes() < 10 ? 0 : ''
      }${selectedTime.getMinutes()}`"
      v-if="selectedDate && selectedTime"
    >
      <span @click="addNewShedule()">Записаться</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "MakeAppointment",

  data() {
    return {
      masterId: +this.$route.params.idMaster, //NaN если перейти с вкладки услуги
      serviceId: +this.$route.params.idService,
      selectedDate: null,
      selectedTime: null,
      userId: 1,
      isFreeTime: true,
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
      "GET_MASTERS_FOR_GROUPServ",
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
        let offTimeForSelectServiceDuration = new Date(
          `${el.dateAppointment} ${el.timeAppointment}`
        );
        offTimeForSelectServiceDuration.setMinutes(
          offTimeForSelectServiceDuration.getMinutes() - 30
        );
        for (let i = 0; i < selectServiceDuration; i++) {
          offTimeList.push(offTimeForSelectServiceDuration.getTime());
          offTimeForSelectServiceDuration.setMinutes(
            offTimeForSelectServiceDuration.getMinutes() - 30
          );
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
    getAvailableMasters() {
      return this.GET_MASTERS_FOR_GROUPServ(
        this.getSelectService.groupServiceId
      );
    },
    showSelectMaster() {
      const templatePath = `/appointment/service/${this.serviceId}`;
      return this.$route.path === templatePath;
    },
  },
  methods: {
    ...mapMutations(["SET_MASTERS", "ADD_NEW_SHEDULE", "SET_SHEDULE"]),
    addNewShedule() {
      console.log("add new shedule");
      const newShedule = {
        date: `${this.selectedTime.getFullYear()}-${
          this.selectedTime.getMonth() + 1
        }-${
          this.selectedTime.getDate() < 10 ? 0 : ""
        }${this.selectedTime.getDate()}`,
        time: `${this.selectedTime.getHours()}:${
          this.selectedTime.getMinutes() < 10 ? 0 : ""
        }${this.selectedTime.getMinutes()}:00`,
        user_id: this.userId,
        master_id: this.masterId,
        service_id: this.serviceId,
      };
      console.log(newShedule);
      axios
        .post(`${this.getServerUrl}/shedule`, newShedule)
        .then((e) => console.log(e.data));
      // this.ADD_NEW_SHEDULE(newShedule);
    },
  },

  mounted() {
    axios.get(`${this.getServerUrl}/shedule`).then((res) => {
      const data = [];
      res.data.forEach((element) => {
        data.push({
          id: element.id,
          dateAppointment: element.date,
          timeAppointment: element.time,
          userId: element.user_id,
          masterId: element.master_id,
          serviceId: element.service_id,
        });
      });
      this.SET_SHEDULE(data);
    });
  },
};
</script>

<style lang="scss" scoped>
.subscribeBtn {
  height: 60px;
  background-color: #cdaa7d;
  border-radius: 10px;
  color: #0a1111;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: "Cormorant Garamond";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  box-sizing: border-box;
  text-decoration: none;
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    border: 1px solid #cdaa7d;
  }
}
</style>
