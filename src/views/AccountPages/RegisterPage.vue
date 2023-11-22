<template>
  <div>
    <form name="form" @submit.prevent="handleRegister">
      <div v-if="!successful">
        <div>          
          <input
            v-model="user.username"
            
            type="text"
            name="username"
            placeholder="Логин"
          />
          <!-- <div v-if="submitted && errors.has('username')">
            {{ errors.first("username") }}
          </div> -->
        </div>
        <div>          
          <input
            v-model="user.email"
            
            type="email"
            name="email"
            placeholder="Email"
          />
          <!-- <div v-if="submitted && errors.has('email')">
            {{ errors.first("email") }}
          </div> -->
        </div>
        <div>
          <input
            v-model="user.password"
            
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <!-- <div v-if="submitted && errors.has('password')">
            {{ errors.first("password") }}
          </div> -->
        </div>
        <div>
          <input
            v-model="user.name"            
            type="text"
            name="username"
            placeholder="Ваше имя"
          />          
        </div>
        <div>
          <input
            v-model="user.phone"            
            type="text"
            name="phone"
            placeholder="Телефон"
          />          
        </div>
        <div>
          <input
            v-model="user.birthdate"            
            type="text"
            name="birthdate"
            placeholder="Дата рождения"
          />          
        </div>
        <div>
          <button>Sign Up</button>
        </div>
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

<style lang="scss" scoped></style>
