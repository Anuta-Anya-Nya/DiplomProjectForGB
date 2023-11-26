<template>
  <footer class="footer">
    <div v-show="isShow" class="container footer-box">
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
    <div class="container footer-copy">Copyright © 2017 - 2023</div>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
  props: ["isShow"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.footer-box {
  border-top: 1px solid $color-border;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 10px;
  box-sizing: border-box;
}

.footer-logo {
  display: block;
  text-decoration: none;
}

.foot-logo {
  color: $color-text;
  font-size: 65px;
  line-height: 65px;
  transition: all 0.3s;
}

.foot-logo:hover {
  color: $color-hover;
}

.footer__title {
  font-weight: 700;
  font-size: 24px;
  line-height: normal;
  margin-bottom: 30px;
}

.footer__list {
  list-style: none;
}

.footer__list > li {
  font-size: 18px;
  line-height: normal;
  margin-bottom: 18px;
}

.footer-soc {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.footer-icon {
  font-size: 36px;
  line-height: 36px;
  color: $color-text;
}

.footer-icon:hover {
  color: $color-hover;
}

.footer-copy {
  border-top: 1px solid $color-border;
  font-weight: 700;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  padding: 20px;
}
</style>
