<template>
  <div class="account">
    <div class="container acc-box">
      <h3 class="acc-title">Личный кабинет</h3>
      <div class="account__buttons">
        <a href="#" class="account__link button-simple">Мой профиль</a>
        <a href="#" class="account__link button-simple">Мои записи</a>
        <a href="#" class="account__link button-simple">Записаться</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountPage",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.acc-title {
  margin-bottom: 32px;
  margin-top: 40px;
  text-align: center;
  font-size: 32px;
}

.acc-box {
  width: 50%;
  margin: 0 auto;
}

.account {
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__link {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
      background-color: $color-hover;
      // color: $color-text;
      border: 1px solid $color-text;
    }
  }
  .button-simple {
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
    transition: all 0.3s;
  }
  .button-simple:hover {
    background-color: #ffffff;
    border: 1px solid #cdaa7d;
  }
}
</style>
