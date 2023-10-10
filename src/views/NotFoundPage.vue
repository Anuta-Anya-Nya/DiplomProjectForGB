<template>
  <section class="container notFound__flex">
    <h3 class="notFound__title">404</h3>
    <p class="notFound__text">Извините, запрашиваемая страница не найдена</p>
    <router-link to="/main" class="subscribeBtn"
      >Вернуться на главную</router-link
    >
  </section>
</template>

<script>
export default {
  name: "NotFoundPage",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
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
.notFound {
  &__flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
  &__title {
    font-weight: 700;
    font-size: 100px;
    line-height: 100%;
    max-width: 600px;
    color: $color-hover;
  }
  &__text {
    font-size: 50px;
    line-height: 120%;
    margin-top: 30px;
    font-weight: 400;
  }
}
</style>
