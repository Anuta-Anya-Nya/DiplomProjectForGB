<template>
  <section class="container">
    <div v-if="loading">loading</div>
    <div v-if="getMaster" class="aboutMaster">
      <div class="photo">
        <img
          :src="require(`@/assets/img/${getMaster.photo}`)"
          alt="our_master"
        />
      </div>
      <div class="aboutMaster__content">
        <p class="aboutMaster__text">{{ getMaster.masterName }}</p>
        <p class="aboutMaster__text">{{ getMaster.position }}</p>
        <p class="aboutMaster__text">
          {{ getMaster.aboutText }}
        </p>
        <router-link
          :to="`/appointment/master/${getMaster.id}`"
          class="subscribeBtn"
          >Записаться к мастеру</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import store from "@/store";
export default {
  name: "AboutMaster",

  data() {
    return {
      masterID: +this.$route.params.masterID,
      loading: true,
      getMaster: null,
    };
  },

  computed: {
    ...mapGetters(["getServerUrl"]),
  },
  created() {
    axios
      .get(
        `${this.getServerUrl}/masters/search/getMasterById?id=${this.masterID}`
      )
      .then((res) => {
        this.getMaster = res.data;
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.aboutMaster {
  display: flex;
  gap: 100px;
  margin-bottom: 150px;
  margin-top: 150px;

  &__content {
    font-size: 24px;
    line-height: 130%;
  }

  &__text {
    margin-bottom: 50px;
  }

  &__text:first-of-type {
    font-weight: 700;
    font-size: 48px;
    line-height: 120%;
    margin-bottom: 0px;
  }
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
  line-height: normal;
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px 30px;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    border: 1px solid #cdaa7d;
  }
}
</style>
