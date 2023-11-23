<template>
    <div class="container">
        <h2 class="pages__title">Мои записи</h2>
        
        <ul>
            <ol></ol>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SheduleUser',

    data() {
        return {
            
        };
    },
    computed: {
      currentUser() {        
        return this.$store.state.auth.user;
      }
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 80px;
}
</style>