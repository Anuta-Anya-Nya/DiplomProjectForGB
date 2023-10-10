<template>
  <div>
    <QuoteComponent />
    <ServicesBlock />
    <WorksBlock />
  </div>
</template>

<script>
import QuoteComponent from "@/components/QuoteComponent.vue";
import ServicesBlock from "@/blocks/ServicesBlock.vue";
import WorksBlock from "@/blocks/WorksBlock.vue";
export default {
  name: "MainPage",
  components: {
    QuoteComponent,
    ServicesBlock,
    WorksBlock,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
