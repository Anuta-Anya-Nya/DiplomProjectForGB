<template>
  <div class="action-banner">
    <img
      class="action-img"
      :src="require(`@/assets/img/${action.image}`)"
      alt="action"
    />
    <p class="action-text">{{ action.text }}</p>
  </div>
</template>

<script>
export default {
  name: "ActionComponent",
  props: ["action"],

  data() {
    return {};
  },

  mounted() {},

  methods: {},
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
.action-banner {
  max-height: 60vh;
  background-size: cover;
  margin-bottom: 100px;
  font-size: 70px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.action-img {
  width: 100%;
}
.action-text {
  position: absolute;
  bottom: 5%;
}
</style>
