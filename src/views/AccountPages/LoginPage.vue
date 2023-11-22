<template>
  <main class="log-acc">
    <div class="container">
      <form class="form-box" name="form" @submit.prevent="handleLogin">
        <div class="input-box">
          <i class="fa-solid fa-envelope input-box__icon"></i>
          <input
            v-model="user.username"
            class="input-field"
            type="text"
            name="username"
            placeholder="Логин"
          />
          <!-- <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >
            Требуется имя пользователя!
          </div> -->
        </div>
        <div class="input-box">
          <i class="fa-solid fa-unlock input-box__icon"></i>
          <input
            v-model="user.password"
            
            class="input-field"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <!-- <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            Требуется пароль!
          </div> -->
        </div>

        <button class="button-simple" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>Login</span>
        </button>
        <div>
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
      <div class="log-acc__buttons">
        <router-link to="/register" class="button-simple log-acc__buttons_link">
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

.input-box {
  position: relative;

  &__icon {
    position: absolute;
    font-size: 24px;
    top: calc(($button-height - 24px) / 2);
    left: 20px;
  }
}

.log-acc {
  margin-top: 40px;
  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    &_link {
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
  }
}

.forgetPas__title {
  margin-bottom: 32px;
  text-align: center;
  font-size: 32px;
}
</style>
