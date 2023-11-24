<template>
  <div class="container">
    <form  name="form" @submit.prevent="handleRegister">
      <div v-if="!successful" class="form-box">
        <div class="input-box">
          <i class="fa-solid fa-user input-box__icon"></i>          
          <input
            v-model="user.username"            
            type="text"
            class="input-field"
            name="username"
            placeholder="Логин"
            required
          />          
        </div>

        <div class="input-box">    
          <i class="fa fa-envelope input-box__icon" aria-hidden="true"></i>      
          <input
            v-model="user.email"
            class="input-field"
            required
            type="email"
            name="email"
            placeholder="Email"
          />          
        </div>
        <div class="input-box">
          <i class="fa-solid fa-unlock input-box__icon"></i>
          <input
            v-model="user.password"
            class="input-field"
            required
            type="password"
            name="password"
            placeholder="Пароль"
          />
        </div>
        <div class="input-box">
          <i class="fa-solid fa-user input-box__icon"></i>
          <input
            v-model="user.name"   
            class="input-field"         
            type="text"
            name="username"
            placeholder="Ваше имя"
          />          
        </div>
        <div class="input-box">
          <i class="fa fa-phone input-box__icon" aria-hidden="true"></i>
          <input
            v-model="user.phone"  
            class="input-field"          
            type="text"
            name="phone"
            placeholder="Телефон"
          />          
        </div>
        <div class="input-box">
          <i class="fa fa-birthday-cake input-box__icon" aria-hidden="true"></i>
          <input
            v-model="user.birthdate"   
            class="input-field"         
            type="date"
            name="birthdate"
            placeholder="Дата рождения"
          />          
        </div>
        
          <button class="button-simple">Зарегистрироваться</button>
        
      </div>
    </form>

    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import User from "../../models/User";

export default {
  name: "RegisterPage",

  data() {
    return {
      user: new User("", "", "", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },

  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        
      
    },
  },
};
</script>

<style lang="scss" scoped>
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
.input-box {
  position: relative;
  &__icon {
    position: absolute;
    font-size: 24px;
    top: calc(($button-height - 24px) / 2);
    left: 20px;
  }  
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
  margin-bottom: 15px;

  &:hover {
    background-color: $color-hover;
    // color: $color-text;
    border: 1px solid $color-text;
  }
}

</style>
