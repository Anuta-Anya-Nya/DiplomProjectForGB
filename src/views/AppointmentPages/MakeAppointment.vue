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
        @click="setCurrentMaster(master.id)"
        v-for="master in MASTERS"
        :key="master.id"
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
      <p v-if="!validDate" class="shedule__message"> Извините, на выбранную дату запись невозможна </p>
    </div>

    <div v-if="selectedTime">
      <span class="shedule__title">Выбранная дата: </span
      ><span class="shedule__value">{{ selectedDate }} </span>
      <span class="shedule__title">Выбранное время: </span
      ><span class="shedule__value"
        >{{ selectedTime.getHours() }} :
        {{ selectedTime.getMinutes() < 10 ? 0 : ""
        }}{{ selectedTime.getMinutes() }}</span
      >
    </div>

    <button
      v-if="selectedDate && selectedTime"
      :to="`/shedule/master/${CURRENT_MASTER.id}/${
        CURRENT_SERVICE.id
      }/${selectedDate}_${selectedTime.getHours()}:${
        selectedTime.getMinutes() < 10 ? 0 : ''
      }${selectedTime.getMinutes()}`"
      class="button-simple button-link"
      @click="addNewShedule()"
    >
      Записаться
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MakeAppointment",

  data() {
    return {
      selectedDate: null,
      selectedTime: null,      
      isFreeTime: true,
      
    };
  },
  watch: {
    selectedDate: function(){
      if(this.validDate){
        const param = {date: this.selectedDate, id: this.CURRENT_MASTER.id}
    this.$store.dispatch(
      "GET_SHEDULE_BY_DATE_AND_MASTER",
      param
    );
      }
    
    }
  },

  computed: {
    ...mapGetters([ 
      "CURRENT_MASTER",
      "CURRENT_SERVICE",
      "GET_MASTERS_BY_GROUP",
      "MASTERS",
      "SHEDULE",
      "SERVICE_BY_ID",
      "GET_SERVICE_FOR_ID",
    ]),

    currentUser() {
      return this.$store.state.auth.user;
    },
    validDate(){
      if(!this.selectedDate){
        return true;
      }
      let select = new Date(`${this.selectedDate}`).getTime();
      let now = new Date().getTime();
      if(select > now){
        return true;
      } else {
        return false;
      }
    },
    getFreeTime() {
      if (!this.selectedDate) {
        return null;
      }
      // Получаем расписание у мастера на выбранную дату      
      // const param = {date: this.selectedDate, id: this.CURRENT_MASTER.id}
      // const sheduleMasterOfSelectDay = await this.$store.dispatch(
      //   "GET_SHEDULE_BY_DATE_AND_MASTER",
      //   param        
      // );

      //  const sheduleMasterOfSelectDay = this.GET_FREE_SHEDULE_OF_MASTER(
      //   this.selectedDate,
      //   this.masterId
      // );
      const freeTimeList = [];
      const offTimeList = [];

      // Время начала и окончания работы мастеров
      let startTime = new Date(`${this.selectedDate} 10:00`);
      let finishTime = new Date(`${this.selectedDate} 20:00`);
      
      const selectServiceDuration = this.CURRENT_SERVICE.duration / 30 - 1;
      // Формирование списка занятого времени у мастера, с учетом длительности услуг
      
      this.SHEDULE.forEach((el) => {
        let offTime = new Date(`${el.date} ${el.time}`);    
        
        
        // длительность услуги, уже присутствующей в расписании
        
        const findOffTimeForService = this.GET_SERVICE_FOR_ID(el.serviceId).duration / 30;

        for (let i = 0; i < findOffTimeForService; i++) {
          offTimeList.push(offTime.getTime());
          offTime.setMinutes(offTime.getMinutes() + 30);
        }
        
        // необходимо вычеркнуть длительность выбранной для записи услуги перед занятым временем мастера, чтобы не пересекалась новая и старая запись
        let offTimeForSelectServiceDuration = new Date(`${el.date} ${el.time}`);
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
    // проверка, если переход был с выбора услуги, то надо показывать панель мастеров
    showSelectMaster() {
      const templatePath = `/shedule/service/${this.CURRENT_SERVICE.id}`;
      return this.$route.path === templatePath;
    },
    
  },
  methods: {
    ...mapMutations(["SET_MASTERS", "ADD_NEW_SHEDULE", "SET_SHEDULE"]),   
    

    addNewShedule() {
      const newShedule = {
        date: `${this.selectedTime.getFullYear()}-${
          this.selectedTime.getMonth() + 1
        }-${
          this.selectedTime.getDate() < 10 ? 0 : ""
        }${this.selectedTime.getDate()}`,
        time: `${this.selectedTime.getHours()}:${
          this.selectedTime.getMinutes() < 10 ? 0 : ""
        }${this.selectedTime.getMinutes()}:00`,
        user_id: this.currentUser.id,
        master_id: this.CURRENT_MASTER.id,
        service_id: this.CURRENT_SERVICE.id,
      };      
      this.$store.dispatch("CREATE_SHEDULE", newShedule);
      this.$router.push({ path: `/shedule/master/${this.CURRENT_MASTER.id}/${
        this.CURRENT_SERVICE.id
      }/${this.selectedDate}_${this.selectedTime.getHours()}:${
        this.selectedTime.getMinutes() < 10 ? 0 : ''
      }${this.selectedTime.getMinutes()}` });
    },

    setCurrentMaster(idMaster) {
      this.$store.dispatch("GET_MASTER_BY_ID", idMaster);
      this.selectedDate = null;
    },
  },

  mounted() {
    this.$store.dispatch(
      "GET_MASTERS_BY_GROUP",
      this.CURRENT_SERVICE.groupServiceId
    );   
     
  },

  
}
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
