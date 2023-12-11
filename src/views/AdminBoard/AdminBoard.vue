<template>
  <div class="container">
    <div class="adminBoard">
      <router-link to="/admin/usersList" class="adminBoard__link button-simple"
        >Клиенты</router-link
      >
      <router-link
        to="/admin/mastersList"
        class="adminBoard__link button-simple"
        >Мастера
      </router-link>
      <router-link
        to="/admin/servicesList"
        class="adminBoard__link button-simple"
        >Услуги</router-link
      >
      <router-link
        to="/admin/shedulesList"
        class="adminBoard__link button-simple"
        >Записи</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminBoard",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
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
  &:hover {
    background-color: $color-hover;
    border: 1px solid $color-text;
  }
}
.adminBoard {
  padding: 20px;
  width: 50%;
  margin: 0 auto;

  &__link {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: all 0.3s;
  }
}
</style>
