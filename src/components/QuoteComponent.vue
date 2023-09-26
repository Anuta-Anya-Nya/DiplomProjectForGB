<template>
  <section class="quote">
    <div class="container quote__box">
      <img src="@/img/quote.png" alt="quote" />
      <blockquote class="quote__text">
        <p>
          {{ GET_RANDOM_QUOT.text }}
        </p>
        <cite class="quote__author"> {{ GET_RANDOM_QUOT.author }}</cite>
      </blockquote>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuoteComponent",

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["GET_RANDOM_QUOT"]),
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.quote {
  margin-bottom: 95px;
  margin-top: 120px;

  &__box {
    max-width: 856px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }

  &__text {
    font-weight: 700;
    font-size: 27px;
    line-height: 130%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__author {
    align-self: end;
    color: $color-hover;
  }
}
</style>
