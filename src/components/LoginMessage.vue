<template>
  <div class="shedule__box">
    <p>Запись на процедуры доступна только зарегистрированным пользователям.</p>
    <router-link to="/login" class="button-simple button-link"
      >Регистрация / Авторизация</router-link
    >
  </div>
</template>

<script>
export default {
  name: "LoginMessage",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.shedule {
  
  &__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
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
.button-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
}</style>
