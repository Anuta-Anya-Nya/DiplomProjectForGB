<template>
  <div class="container shedule">
    <h3>Записаться:</h3>
    <router-link to="/shedule/master" class="button-simple button-link"
      >Выбрать мастера</router-link
    >
    <router-link to="/shedule/service" class="button-simple button-link"
      >Выбрать услугу</router-link
    >
  </div>
</template>

<script>
export default {
  name: "AppointmentPage",
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";
.button-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
}
</style>
