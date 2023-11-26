<template>
  <div class="container shedule">
    <h3>Выберите мастера:</h3>
    <button
      v-for="master in MASTERS"
      :key="master.id"
      class="button-simple button-link"
      @click="selectMaster(master)"
    >
      {{ master.name }}
    </button>    
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppointmentMaster",

  mounted() {
    this.$store.dispatch("GET_MASTERS");
  },
  computed: {
    ...mapGetters(["MASTERS"]),
  },
  methods: {
    ...mapMutations(["SET_CURRENT_MASTER"]),

    selectMaster(master){
      this.SET_CURRENT_MASTER(master);
      this.$router.push({ path: `/shedule/master/${master.id}` });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
</style>
