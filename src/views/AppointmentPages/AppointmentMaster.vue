<template>
  <div class="container">
    <div v-if="currentUser">
      Выберите мастера:

      <router-link
        :to="`/appointment/master/${master.id}`"
        v-for="master in GET_MASTERS"
        :key="master.id"
        >{{ master.name }}</router-link
      >
    </div>
    <div v-if="!currentUser">
      <LoginMessage />
    </div>
  </div>
</template>

<script>
import LoginMessage from "@/components/LoginMessage.vue";
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "AppointmentMaster",
  components: {
    LoginMessage,
  },

  mounted() {
    axios.get(`${this.getServerUrl}/masters`).then((res) => {
      const data = [];
      res.data.forEach((element) => {
        data.push({
          id: element.id,
          name: element.master_name,
          position: element.position,
          photo: element.photo,
          aboutText: element.aboutText,
          serviceId: element.group_service_id,
        });
      });
      this.SET_MASTERS(data);
    });
  },
  computed: {
    ...mapGetters(["GET_MASTERS", "getServerUrl"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: { ...mapMutations(["SET_MASTERS"]) },
};
</script>

<style lang="scss" scoped></style>
