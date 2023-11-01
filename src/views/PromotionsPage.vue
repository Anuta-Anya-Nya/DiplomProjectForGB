<template>
  <main class="actions pages-margin">
    <div class="container">
      <h2 class="pages__title">Наши акции</h2>
      <ActionComponent v-for="action in GET_ACTIONS" :key="action.id" :action="action"/>      
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import ActionComponent from "@/components/ActionComponent.vue";

export default {
  name: "PromotionsPage",
  data() {
    return {      
    };
  },
  mounted() {},
  methods: {},
  components: { ActionComponent },
  computed: {
    ...mapGetters(["GET_ACTIONS"]),
  }
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
