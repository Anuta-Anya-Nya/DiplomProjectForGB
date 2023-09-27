<template>
  <div>
    <QuoteComponent />
    <ServicesBlock />
    <WorksBlock />
    <AboutMaster />
  </div>
</template>

<script>
import QuoteComponent from "@/components/QuoteComponent.vue";
import ServicesBlock from "@/blocks/ServicesBlock.vue";
import WorksBlock from "@/blocks/WorksBlock.vue";
import AboutMaster from "@/views/AboutMaster.vue";
export default {
  name: "MainPage",
  components: {
    QuoteComponent,
    ServicesBlock,
    WorksBlock,
    AboutMaster,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
