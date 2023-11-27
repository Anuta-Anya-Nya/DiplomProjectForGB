<template>
  <div class="container shedule">
    <div>
      <span class="shedule__title">Мастер: </span
      ><span class="shedule__value">{{
        CURRENT_MASTER ? CURRENT_MASTER.name : "Любой мастер"
      }}</span>
    </div>
    <div>
      <span class="shedule__title">Услуга: </span
      ><span class="shedule__value">{{ CURRENT_SERVICE.title }}</span>
    </div>
    <div>
      <span class="shedule__title">Длительность: </span
      ><span class="shedule__value">{{ CURRENT_SERVICE.duration }} мин</span>
    </div>
    <div>
      <span class="shedule__title">Цена: </span
      ><span class="shedule__value">{{ CURRENT_SERVICE.price }} руб.</span>
    </div>

    <div v-if="showSelectMaster" class="shedule__select">
      <div class="shedule__title">Выберите мастера:</div>
      <button
        v-for="master in MASTERS"
        :key="master.id"
        @click="setCurrentMaster(master.id)"
        class="button-simple button-shedule"
        :class="CURRENT_MASTER?.id === master.id ? 'active' : ''"
      >
        {{ master.name }}
      </button>
    </div>

    <div v-if="MASTERS.length === 0" class="shedule__box">
      <p class="shedule__message">
        Извините, запись на выбранную услугу в данный момент невозможна
      </p>
      <router-link to="/shedule/service" class="button-simple button-link"
        >К выбору услуг</router-link
      >
    </div>

    <div v-if="CURRENT_MASTER">
      <label for="dateAppointment" class="shedule__title"
        >Выберите дату:
      </label>
      <input type="date" id="dateAppointment" v-model.lazy="selectedDate" />
    </div>

    <div v-if="selectedDate && validDate" class="shedule__select">
      <div class="shedule__title">Выберите время для записи:</div>
      <div v-if="CURRENT_MASTER" class="buttons-time-box">
        <button
          v-for="time in getFreeTime"
          :key="time.index"
          @click="selectedTime = time"
          class="button-simple button-shedule button-time"
          :class="selectedTime === time ? 'active' : ''"
        >
          {{ printTime(time) }}
        </button>
      </div>
    </div>

    <div>
      <p v-if="getFreeTime?.length === 0" class="shedule__message">
        Извините, к выбранному мастеру {{ selectedDate }} запись невозможна.
        Попробуйте выбрать другой день
      </p>
      <p v-if="!validDate" class="shedule__message">
        Извините, на выбранную дату запись невозможна
      </p>
    </div>

    <div v-if="selectedTime">
      <span class="shedule__title">Выбранная дата: </span
      ><span class="shedule__value">{{ printDate(selectedDate) }}. </span>
      <span class="shedule__title">Выбранное время: </span
      ><span class="shedule__value">{{ printTime(selectedTime) }} </span>
    </div>

    <button
      v-if="selectedDate && selectedTime"
      :to="`/shedule/master/${CURRENT_MASTER.id}/${
        CURRENT_SERVICE.id
      }/${selectedDate}_${printTime(selectedTime)}`"
      class="button-simple button-link"
      @click="addNewShedule()"
    >
      Записаться
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import utils from "../../services/utils";

export default {
  name: "MakeAppointment",

  data() {
    return {
      selectedDate: null,
      selectedTime: null,
    };
  },

  mounted() {
    // выборка мастеров, которые могут оказать выбранную услугу, если мастер не выбран ранее
    if (!this.CURRENT_MASTER) {
      this.$store.dispatch(
        "GET_MASTERS_BY_GROUP",
        this.CURRENT_SERVICE.groupServiceId
      );
    }
  },

  watch: {
    // при изменении даты, у сервера запрашивается расписание у выбранного мастера на выбранную дату
    selectedDate: function () {
      if (this.validDate) {
        const param = { date: this.selectedDate, id: this.CURRENT_MASTER.id };
        this.$store.dispatch("GET_SHEDULE_BY_DATE_AND_MASTER", param);
      }
    },
  },

  computed: {
    ...mapGetters([
      "CURRENT_MASTER",
      "CURRENT_SERVICE",
      "MASTERS",
      "SHEDULE",
      "GET_SERVICE_FOR_ID",
    ]),

    currentUser() {
      return this.$store.state.auth.user;
    },

    validDate() {
      if (!this.selectedDate) {
        return true;
      }
      let select = new Date(`${this.selectedDate}`).getTime();
      let now = new Date().getTime();
      if (select > now) {
        return true;
      } else {
        return false;
      }
    },

    getFreeTime() {
      if (!this.selectedDate) {
        return null;
      }

      const freeTimeList = [];
      const busyTimeList = [];

      // Время начала и окончания работы мастеров
      let startTime = new Date(`${this.selectedDate} 10:00`);
      let finishTime = new Date(`${this.selectedDate} 20:00`);

      const selectServiceDuration = this.CURRENT_SERVICE.duration / 30 - 1;

      // Формирование списка занятого времени у мастера, с учетом длительности услуг
      this.SHEDULE.forEach((el) => {
        let busyTime = new Date(`${el.date} ${el.time}`);

        // длительность услуги, уже присутствующей в расписании (шагами в 30 минут)
        const findBusyTimeForService =
          this.GET_SERVICE_FOR_ID(el.serviceId).duration / 30;
        for (let i = 0; i < findBusyTimeForService; i++) {
          busyTimeList.push(busyTime.getTime());
          busyTime.setMinutes(busyTime.getMinutes() + 30);
        }

        // необходимо вычеркнуть длительность выбранной для записи услуги перед занятым временем мастера, чтобы не пересекалась новая и старая запись
        let busyTimeOfSelectServ = new Date(`${el.date} ${el.time}`);
        busyTimeOfSelectServ.setMinutes(
          busyTimeOfSelectServ.getMinutes() - 30
        );
        for (let i = 0; i < selectServiceDuration; i++) {
          busyTimeList.push(busyTimeOfSelectServ.getTime());
          busyTimeOfSelectServ.setMinutes(
            busyTimeOfSelectServ.getMinutes() - 30
          );
        }
      });

      // Формирование списка свободного времени для возможной записи
      while (startTime.getTime() < finishTime.getTime()) {
        freeTimeList.push(new Date(startTime.getTime()));
        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      // Выбранная заказчиком услуга не должна заканчиваться после времени окончания работы салона
      finishTime.setMinutes(finishTime.getMinutes() - 30);
      for (let i = 0; i < selectServiceDuration; i++) {
        busyTimeList.push(finishTime.getTime());
        finishTime.setMinutes(finishTime.getMinutes() - 30);
      }

      // из времени работы салона freeTimeList вычеркиваются занятые слоты времени, полученные из busyTimeList
      return freeTimeList.filter((el) => !busyTimeList.includes(el.getTime()));
    },

    // проверка, если переход был с выбора услуги, то надо показывать панель выбора мастеров
    showSelectMaster() {
      const templatePath = `/shedule/service/${this.CURRENT_SERVICE.id}`;
      return this.$route.path === templatePath;
    },
  },
  methods: {
    ...mapMutations(["SET_MASTERS", "ADD_NEW_SHEDULE"]),

    printTime(time) {
      return utils.printTime(time);
    },

    printDate(dateStr) {
      return utils.printDate(dateStr);
    },

    getDate(date) {
      return utils.getDate(date);
    },

    addNewShedule() {
      const newShedule = {
        date: this.getDate(this.selectedTime),
        time: this.printTime(this.selectedTime),
        user_id: this.currentUser.id,
        master_id: this.CURRENT_MASTER.id,
        service_id: this.CURRENT_SERVICE.id,
      };

      this.$store.dispatch("CREATE_SHEDULE", newShedule);

      this.$router.push({
        path: `/shedule/master/${this.CURRENT_MASTER.id}/${
          this.CURRENT_SERVICE.id
        }/${this.selectedDate}_${this.printTime(this.selectedTime)}`,
      });
    },

    setCurrentMaster(idMaster) {
      this.$store.dispatch("GET_MASTER_BY_ID", idMaster);
      this.selectedDate = null;
    },
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
.shedule__message {
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
