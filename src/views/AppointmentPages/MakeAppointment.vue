<template>
  <div class="container shedule">
    
      <div>
        <span class="shedule__title">Мастер: </span
        ><span class="shedule__value">{{ getSelectMasterName }}</span>
      </div>
      <div>
        <span class="shedule__title">Услуга: </span
        ><span class="shedule__value">{{ getSelectService.title }}</span>
      </div>
      <div>
        <span class="shedule__title">Длительность: </span
        ><span class="shedule__value">{{ getSelectService.duration }} мин</span>
      </div>
      <div>
        <span class="shedule__title">Цена: </span
        ><span class="shedule__value">{{ getSelectService.price }} руб.</span>
      </div>

      <div v-if="showSelectMaster" class="shedule__select">
        <div class="shedule__title">Выберите мастера:</div>
        <button
          @click="masterId = master.id"
          v-for="master in getAvailableMasters"
          :key="master.id"
          class="button-simple button-shedule"
          :class="masterId === master.id ? 'active' : ''"
        >
          {{ master.name }}
        </button>
      </div>

      <div v-if="getAvailableMasters.length === 0" class="shedule__box">
        <p class="shedule__message">Извините, запись на выбранную услугу в данный момент невозможна</p>
        <router-link to="/main" class="button-simple button-link"
          >На главную</router-link
        >
      </div>

      <div v-if="masterId">
        <label for="dateAppointment" class="shedule__title"
          >Выберите дату:
        </label>
        <input type="date" id="dateAppointment" v-model.lazy="selectedDate" />
      </div>

      <div v-if="selectedDate" class="shedule__select">
        <div class="shedule__title">Выберите время для записи:</div>
        <div v-if="masterId" class="buttons-time-box">
          <button
            v-for="time in getFreeTime"
            :key="time.index"
            @click="selectedTime = time"
            class="button-simple button-shedule button-time"
            :class="selectedTime === time ? 'active' : ''"
          >
            {{ time.getHours() }} : {{ time.getMinutes() < 10 ? 0 : ""
            }}{{ time.getMinutes() }}
          </button>
        </div>
      </div>

      <div>
        <p v-if="getFreeTime?.length === 0" class="shedule__message">
          Извините, к выбранному мастеру {{ selectedDate }} запись невозможна.
          Попробуйте выбрать другой день
        </p>
      </div>

      
        <div v-if="selectedTime">
        <span class="shedule__title">Выбранная дата: </span
        ><span class="shedule__value">{{ selectedDate }} </span>
        <span class="shedule__title">Выбранное время: </span
        ><span class="shedule__value">{{ selectedTime.getHours() }} :
        {{ selectedTime.getMinutes() < 10 ? 0 : ""
        }}{{ selectedTime.getMinutes() }}</span>
      </div>
         
         
      
      <router-link
      v-if="selectedDate && selectedTime"
        :to="`/shedule/master/${masterId}/${serviceId}/${selectedDate}_${selectedTime.getHours()}:${
          selectedTime.getMinutes() < 10 ? 0 : ''
        }${selectedTime.getMinutes()}`" 
        class="button-simple button-link"       
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
      masterId: +this.$route.params.idMaster,
      serviceId: +this.$route.params.idService,
      selectedDate: null,
      selectedTime: null,
      userId: this.$store.state.auth.user.id,
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
    currentUser() {
      return this.$store.state.auth.user;
    },

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
      const templatePath = `/shedule/service/${this.serviceId}`;
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
@import "../../styles/shedule";
#dateAppointment {
  font-size: 22px;
  font-family: "Cormorant Garamond";
}
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
    background-color: $color-hover;
    border: 1px solid #cdaa7d;
  }
}
.shedule__message{
  margin-bottom: 30px;
  color: $color-hover;
}
.button-shedule {
  height: 40px;
  font-size: 22px;
  padding: 0 15px 0 15px;
}
.buttons-time-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.button-time {
  width: 90px;
}
</style>
