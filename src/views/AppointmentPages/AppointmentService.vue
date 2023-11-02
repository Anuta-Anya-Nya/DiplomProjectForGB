<template>
  <div>
    Выберите услугу:
    <details>
      <summary>Группа услуг 1</summary>
      <router-link to="/appointment/service/1">Услугa1</router-link>
      <router-link to="/appointment/service/2">Услуга2</router-link>
    </details>
    <details>
      <summary>Группа услуг 2</summary>
      <router-link to="/appointment/service/3">Услуга3</router-link>
      <router-link to="/appointment/service/4">Услуга4</router-link>
    </details>
  </div>
</template>

<script>
export default {
  name: "AppointmenService",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
