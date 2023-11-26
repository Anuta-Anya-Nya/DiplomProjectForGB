<template>
  <section class="services">
    <div class="container services__box">
      <router-link
        v-for="item in GROUP_SERVICES"
        :key="item.id"
        :to="`shedule/serviceGroup/${item.id}`"
        class="services__item"
      >
        <img :src="require(`@/assets/img/${item.image}`)" alt="our_services" />
        <h3 class="services__title">{{ item.title }}</h3>
      </router-link>
    </div>
    <div class="container materials-box">
      <img src="@/assets/img/mater1.png" alt="logo" class="materials-img" />
      <img src="@/assets/img/mater2.png" alt="logo" class="materials-img" />
      <img src="@/assets/img/mater3.png" alt="logo" class="materials-img" />
      <img src="@/assets/img/mater4.png" alt="logo" class="materials-img" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServicesBlock",

  computed: {
    ...mapGetters(["GROUP_SERVICES"]),
  },
};
</script>

<style lang="scss" scoped>
.services {
  
  &__box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 44px;
    margin-bottom: 150px;
  }

  &__item {
    margin-bottom: 36px;
    position: relative;
    text-decoration: none;
    color: $color-text;
    z-index: 10;
  }

  &__title::before {
    content: "";
    display: block;
    width: 396px;
    height: 300px;
    border: 1px solid transparent;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -10;
    transition: all 0.3s;
  }

  &__title {
    font-size: 30px;
    line-height: 120%;
    margin-top: 30px;
    font-weight: 400;
    transition: all 0.3s;
  }

  &__item:hover &__title {
    color: $color-hover;
  }

  &__item:hover &__title::before {
    border: 1px solid $color-hover;
    transform: translate(20px, -20px);
  }
}
.materials-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 160px;
}
</style>
