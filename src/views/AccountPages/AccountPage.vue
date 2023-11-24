<template>
  <div class="account">
    <div class="container acc-box">
      <h3 class="acc-title">
        Здравствуйте, {{ currentUser.name || currentUser.username }}!
      </h3>
      <ul class="account__profile">
        <li class="account__list">Номер телефона: {{ currentUser.phone }}</li>
        <li class="account__list">Email: {{ currentUser.email }}</li>
      </ul>

      <div class="account__buttons">
        <router-link to="/userShedule" class="account__link button-simple"
          >Мои записи</router-link
        >
        <router-link to="/appointment" class="account__link button-simple"
          >Записаться</router-link
        >
      </div>
      <a @click="logOut" class="account__link button-simple" href="#">
        <span>Выйти</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountPage",

  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
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
  &__profile {
    list-style-type: none;
    font-family: "Cormorant Garamond";
    font-size: 24px;
    font-style: normal;
  }
  &__list {
    margin-bottom: 15px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 15px;
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
