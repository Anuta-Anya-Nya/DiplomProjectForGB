<template>
  <div id="app">
    <div
      :class="!showFooter ? 'background-image background-flex' : ''"
      class="wrapper"
    >
      <HeaderBlock :isShowBanner="showBanner" />
      <main>
        <router-view />
      </main>
      <FooterBlock :isShowFooter="showFooter" />
    </div>
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
  computed: {
    showBanner() {
      const currentPage = this.$route.matched[0].components.default.name;
      switch (currentPage) {
        case "MainPage":
          return true;

        default:
          return false;
      }
    },
    showFooter() {
      const currentPage = this.$route.matched[0].components.default.name;
      switch (currentPage) {
        case "NotFoundPage":
          return false;
        case "AppointmentPage":
          return false;
        case "AppointmentMaster":
          return false;
        default:
          return true;
      }
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
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

.background-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.background-image {
  min-height: 100vh;
  background: url(../src/assets/img/header-bg.jpg) no-repeat center center;
  background-size: cover;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1 0 auto;
}
</style>
