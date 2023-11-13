<template>
  <main class="log-acc">
    <div class="container">
      <form class="form-box" action="#">
        <div class="input-box">
          <i class="fa-solid fa-envelope input-box__icon"></i>
          <input
            class="input-field"
            type="email"
            name="email"
            id="email"
            placeholder="Адрес почты"
          />
        </div>
        <div class="input-box">
          <i class="fa-solid fa-unlock input-box__icon"></i>
          <input
            class="input-field"
            type="password"
            name="pass"
            id="pass"
            placeholder="Пароль"
          />
        </div>

        <button class="button-simple" type="submit">Войти</button>
        <div class="log-acc__buttons">
          <a
            class="button-simple log-acc__buttons_link"
            href="registration.html"
            >Зарегистрироваться</a
          >
          <a class="button-simple log-acc__buttons_link" href="forgetPas.html"
            >Забыли пароль</a
          >
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
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
