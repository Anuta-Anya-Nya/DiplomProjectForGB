<template>
  <div class="account">
    <div class="container acc-box">
      <h3 class="acc-title">Личный кабинет</h3>
      <div class="account__buttons">
        <a href="#" class="account__link button-simple">Мой профиль</a>
        <a href="#" class="account__link button-simple">Мои записи</a>
        <a href="#" class="account__link button-simple">Записаться</a>

        <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{currentUser.username}}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
      </p>
      <p>
        <strong>Id:</strong>
        {{currentUser.id}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
      </ul>
    </div>

        <a class="nav-link" href="#">
          <span @click="logOut()">LogOut</span>
        </a>
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
  computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
  mounted() {
    if (!this.currentUser) {
        this.$router.push('/login');
      }
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
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
