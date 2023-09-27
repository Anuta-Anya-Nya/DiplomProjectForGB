<template>
  <header class="header background-image">
    <nav class="header-menu container">
      <a href="#" class="menu-link"
        ><i class="fa-brands fa-instagram soc-icon head-icon"></i>
      </a>
      <router-link to="/main" class="menu-link menu-border"
        >Главная</router-link
      >
      <router-link to="/masters" class="menu-link menu-border"
        >Мастера</router-link
      >
      <a href="price.html" class="menu-link menu-border">Стоимость</a>
      <a href="index.html" class="menu-link"
        ><i class="fa-solid fa-signature head-icon"></i
      ></a>
      <a href="actions.html" class="menu-link menu-border">Акции</a>
      <a href="log-acc.html" class="menu-link menu-border">Записаться</a>
      <a href="contacts.html" class="menu-link menu-border">Контакты</a>
      <a href="account.html" class="menu-link"
        ><i class="fa-solid fa-user head-icon"></i
      ></a>
    </nav>
    <h1 class="header__title">Салон красоты "Штаб бессовестно красивых"</h1>
  </header>
</template>

<script>
export default {
  name: "HeaderBlock",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.background-image {
  min-height: 100vh;
  background: url(@/assets/img/header-bg.jpg) no-repeat center center;
  background-size: cover;
}

.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $color-border;
  padding: 30px;
  box-sizing: border-box;
}

.menu-link {
  text-decoration: none;
  color: $color-text;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.head-icon {
  font-size: 40px;
  line-height: 40px;
}

.menu-link:hover {
  color: $color-hover;
}

.menu-border:hover.menu-link {
  border-bottom: 1px solid $color-hover;
}

.header__title {
  font-weight: 700;
  font-size: 72px;
  line-height: 100%;
  max-width: 600px;
  text-align: center;
  margin: 15vh auto;
}
</style>
