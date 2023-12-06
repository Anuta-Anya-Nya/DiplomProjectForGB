<template>
  <header class="header" :class="isShow ? 'background-image' : ''">
    <nav class="header-menu container">
      <a href="#" class="menu-link"
        ><i class="fa-brands fa-instagram soc-icon head-icon"></i>
      </a>
      <li class="menu-item">
        <router-link to="/main" class="menu-link menu-border"
        
          >Главная</router-link
        >
      </li>
      <li class="menu-item">
        <router-link to="/masters" class="menu-link menu-border"
        :class="currentPath==='/masters'? 'menu-active' : ''"
          >Мастера</router-link
        >
      </li>
      <li class="menu-item">
        <router-link to="/price" class="menu-link menu-border"
        :class="currentPath==='/price'? 'menu-active' : ''"
          >Стоимость</router-link
        >
      </li>
      <li class="menu-item">
        <router-link to="/main" class="menu-link"
          ><i class="fa-solid fa-signature head-icon"></i
        ></router-link>
      </li>
      <li class="menu-item">
        <router-link to="/promo" class="menu-link menu-border"
        :class="currentPath==='/promo'? 'menu-active' : ''"
          >Акции</router-link
        >
      </li>
      <li class="menu-item">
        <router-link to="/shedule" class="menu-link menu-border"
        :class="currentPath==='/shedule'? 'menu-active' : ''"
          >Записаться</router-link
        >
      </li>

      <li v-if="showAdminBoard" class="menu-item">
        <router-link to="/admin" class="menu-link menu-border"
        :class="currentPath==='/admin'? 'menu-active' : ''"
          >Администратор</router-link
        >
      </li>
      <li v-if="showModeratorBoard" class="menu-item">
        <router-link to="/master" class="menu-link menu-border"
        :class="currentPath==='/master'? 'menu-active' : ''"
          >Записи ко мне</router-link
        >
      </li>
      <li v-if="!showAdminBoard && !showModeratorBoard" class="menu-item">
        <router-link to="/contacts" class="menu-link menu-border"
        :class="currentPath==='/contacts'? 'menu-active' : ''"
          >Контакты</router-link
        >
      </li>
      <li v-if="currentUser" class="menu-item">
        <router-link to="/profile" class="menu-link" 
        :class="currentPath==='/profile'? 'menu-active' : ''" >          
          <i class="fa-solid fa-user head-icon"></i>
        </router-link>
      </li>
      <li v-if="!currentUser" class="menu-item">
        <router-link to="/login" class="menu-link"
        :class="currentPath==='/login'? 'menu-active' : ''" >
          <i class="fa-solid fa-user-plus head-icon"></i>
        </router-link>
      </li>
    </nav>
    <h1 v-show="isShow" class="header__title">
      Салон красоты "Штаб бессовестно красивых"
    </h1>
  </header>
</template>

<script>
export default {
  name: "HeaderBlock",
  props: ["isShow"],
  data() {
    return {};
  },

  mounted() {},

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
    currentPath() {     
      const currentMenu =  this.$route.path.split("/");
      return `/${currentMenu[1]}`;
    },
  },
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
.menu-item {
  list-style-type: none;
}
.menu-link {
  text-decoration: none;
  color: $color-text;
  font-weight: 600;
  font-size: 22px;
  line-height: 23px;
  border: 1px solid transparent;
  transition: all 0.3s;
}
.menu-active {
  color: $color-hover;
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
