<template>
  <main class="log-acc">
    <div class="container">
      <form class="form-box" name="form" @submit.prevent="handleLogin">
        <div class="input-box">
          <i class="fa-solid fa-user input-box__icon"></i>
          <input
            v-model="user.username"
            class="input-field"
            type="text"
            name="username"
            placeholder="Логин"
            required
          />
        </div>
        <div class="input-box">
          <i class="fa-solid fa-unlock input-box__icon"></i>
          <input
            v-model="user.password"
            class="input-field"
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
        </div>

        <button class="button-simple">Войти</button>

        <div class="error-message">
          <div v-if="message" role="alert">
            {{ message.message }}
          </div>
        </div>
      </form>

      <div class="button-simple button-reg">
        <router-link to="/register" class="button-reg__link">
          Зарегистрироваться
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import User from "../../models/User";
export default {
  name: "LoginPage",

  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },

  methods: {
    handleLogin() {
      this.loading = true;

      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.background-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-box {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.input-field {
  height: $button-height;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px 20px 15px 60px;
  box-sizing: border-box;
  border: none;
  color: $color-hover;
  font-family: $font-main;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
}

.button-simple {
  height: $button-height;
  background-color: $color-text;
  border-radius: 10px;
  color: $color-main;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: $font-main;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  box-sizing: border-box;
  transition: all 0.3s;

  &:hover {
    background-color: $color-hover;
    // color: $color-text;
    border: 1px solid $color-text;
  }
}
.button-reg {
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  &__link {
    color: $color-main;
    text-decoration: none;
  }
}

.input-box {
  position: relative;

  &__icon {
    position: absolute;
    font-size: 24px;
    top: calc(($button-height - 24px) / 2);
    left: 20px;
  }
}

.error-message {
  margin: 0 auto;
  height: $button-height;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-family: "Cormorant Garamond";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
