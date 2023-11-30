<template>
  <div class="container">
    <h2 class="pages__title">Мои записи</h2>
    
    <ul>
      <li v-for="shedule in separationShedule.future.sort((a,b)=>{
        const date1 = new Date(`${a.date} ${a.time}`).getTime();
        const date2 = new Date(`${b.date} ${b.time}`).getTime();
        return date1 - date2;
      })" :key="shedule.id" class="shedule-list">
        <div>
          {{ shedule.id }} - 
          {{
          shedule.date
        }}
        в
        {{
          shedule.time
        }}
        к мастеру:
        {{
          shedule.masterId
        }}
        на
        {{
          shedule.serviceId
        }}</div>
        <div @click="deleteShedule(shedule.id)"><i class="fa fa-trash" aria-hidden="true"></i></div>
        
      </li>
    </ul>
    Прошедшие записи:
    <ul>
      <li v-for="shedule in separationShedule.past.sort((a,b)=>{
        const date1 = new Date(`${a.date} ${a.time}`).getTime();
        const date2 = new Date(`${b.date} ${b.time}`).getTime();
        return date1 - date2;
      })" :key="shedule.id">
        <div>
          {{
          shedule.date
        }}
        в
        {{
          shedule.time
        }}
        к мастеру:
        {{
          shedule.masterId
        }}
        на
        {{
          shedule.serviceId
        }}
        </div>
        <div></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SheduleUser",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["MASTERS", "SHEDULE"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
    dateNow() {
      return new Date().getTime();
    },
    separationShedule(){
      const separation = {past: [], future: []};
      this.SHEDULE.forEach(shedule => {
        const dateShedule = new Date(`${shedule.date} ${shedule.time}`).getTime();

        if (dateShedule > this.dateNow){
          separation.future.push(shedule);
        } else {
          separation.past.push(shedule);
        }
      });
      return separation;
    },
    futureShedule(){
      return null;
    }
  },

  mounted() {
    this.$store.dispatch("GET_SHEDULE_BY_USER", this.currentUser.id);
    this.$store.dispatch("GET_MASTERS");
  },

  methods: {
    deleteShedule(id){
      this.$store.dispatch("DELETE_SHEDULE", id);      
    }
  },
};
</script>

<style lang="scss" scoped>
.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 80px;
}
.shedule-list {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  width: 30%;
}
</style>
