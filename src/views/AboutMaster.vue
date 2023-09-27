<template>
  <section class="aboutMaster container">
    <div class="photo">
      <img :src="require(`@/assets/img/${getMaster.photo}`)" alt="our_master" />
    </div>
    <div class="aboutMaster__content">
      <p class="aboutMaster__text">{{ getMaster.name }}</p>
      <p class="aboutMaster__text">{{ getMaster.position }}</p>
      <p class="aboutMaster__text">
        {{ getMaster.aboutText }}
      </p>
      <button class="subscribeBtn">Записаться к мастеру</button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
// import store from "@/store";
export default {
  name: "AboutMaster",

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["GET_MASTER_FOR_ID"]),
    getMaster() {
      const masterID = +this.$route.params.masterID;
      //   return store.getters.GET_MASTER_FOR_ID(masterID);
      return this.GET_MASTER_FOR_ID(masterID);
    },
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
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    border: 1px solid #cdaa7d;
  }
}
</style>
