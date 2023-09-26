<template>
  <div id="app">
    <HeaderBlock />

    <main>
      <router-view />
    </main>
    <FooterBlock />
  </div>
</template>

<script>
import HeaderBlock from "@/blocks/HeaderBlock.vue";
import FooterBlock from "@/blocks/FooterBlock.vue";
export default {
  name: "App",
  components: {
    HeaderBlock,
    FooterBlock,
  },
};
</script>

<style lang="scss">
#app {
  font-family: $font-main, sans-serif;
  font-style: normal;
  font-weight: 400;
  color: $color-text;
  background-color: $color-main;
}

* {
  margin: 0;
  padding: 0;
}

.container {
  max-width: $width-site;
  margin: 0 auto;
}
</style>
