<template>
  <footer class="footer">
    <div class="border-top">
      <div v-show="isShowFooter" class="container footer-box">
        <router-link to="/main" class="footer-logo"
          ><i class="fa-solid fa-signature foot-logo"></i
        ></router-link>

        <div class="contacts">
          <h3 class="footer__title">Контакты</h3>
          <ul class="footer__list">
            <li>+7 (812) 123-45-67</li>
            <li>+7 (911) 123-45-67</li>
            <li>Новоостровский проспект, дом 36</li>
          </ul>
        </div>
        <div class="regime">
          <h3 class="footer__title">Режим работы</h3>
          <ul class="footer__list">
            <li>C 10:00 до 21:00 (Пн-Пт)</li>
            <li>С 11:00 до 20:00 (Сб-Вс)</li>
          </ul>
        </div>
        <div class="soc">
          <h3 class="footer__title">Мы в социальных сетях</h3>
          <ul class="footer__list footer-soc">
            <li>
              <a href="#" class="footer__link"
                ><i class="fa-brands fa-instagram soc-icon footer-icon"></i
              ></a>
            </li>
            <li>
              <a href="#" class="footer__link"
                ><i class="fa-brands fa-vk footer-icon"></i
              ></a>
            </li>
            <li>
              <a href="#" class="footer__link"
                ><i class="fa-brands fa-twitter soc-icon footer-icon"></i
              ></a>
            </li>
            <li>
              <a href="#" class="footer__link"
                ><i class="fa-brands fa-telegram footer-icon"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-top">
      <div class="container footer-copy">Copyright © 2017 - 2024</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
  props: ["isShowFooter"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.border-top {
  border-top: 1px solid $color-border;
}
.footer {
  &-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 10px;
    box-sizing: border-box;
  }

  &-logo {
    display: block;
    text-decoration: none;
  }
  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: normal;
    margin-bottom: 30px;
  }

  &__list {
    list-style: none;
  }

  &__list > li {
    font-size: 18px;
    line-height: normal;
    margin-bottom: 18px;
  }

  &-soc {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  &-icon {
    font-size: 36px;
    line-height: 36px;
    color: $color-text;
    &:hover {
      color: $color-hover;
    }
  }
  &-copy {
    font-weight: 700;
    font-size: 18px;
    line-height: normal;
    text-align: center;
    padding: 20px;
  }
}

.foot-logo {
  color: $color-text;
  font-size: 65px;
  line-height: 65px;
  transition: all 0.3s;
  &:hover {
    color: $color-hover;
  }
}
</style>
