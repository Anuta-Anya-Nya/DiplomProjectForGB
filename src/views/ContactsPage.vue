<template>
  <main class="contacts pages-margin">
    <div class="container">
      <h2 class="pages__title">Наши контакты</h2>
      <div class="contacts__map">
        <a
          class="contacts__link"
          href="https://yandex.ru/maps/?um=constructor%3A2ce4631c20907488940aef6b08252d33b512861279e44f5b4fd6a92961273edd&amp;source=constructorStatic"
          target="_blank"
          ><img
            class="contacts__img"
            src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A2ce4631c20907488940aef6b08252d33b512861279e44f5b4fd6a92961273edd&amp;width=500&amp;height=400&amp;lang=ru_RU"
            alt=""
            style="border: 0"
        /></a>
      </div>
      <div class="contacts__info">
        <h3 class="contacts__title">Контакты</h3>
        <ul class="contacts__content">
          <li class="contacts__item">+7 (812) 123-45-67</li>
          <li class="contacts__item">+7 (911) 123-45-67</li>
          <li class="contacts__item">Новоостровский проспект, дом 36</li>
        </ul>
        <h3 class="contacts__title">Режим работы</h3>
        <ul class="contacts__content">
          <li class="contacts__item">C 10:00 до 21:00 (Пн-Пт)</li>
          <li class="contacts__item">С 11:00 до 20:00 (Сб-Вс)</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "ContactsPage",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.contacts {
  &__map {
    filter: grayscale(50%);
    display: flex;
  }
  &__link {
    display: block;
    margin: 0 auto;
  }
  &__img {
    width: 100%;
  }

  &__info {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
  }

  &__title {
    font-weight: 700;
    font-size: 34px;
    line-height: 120%;
    margin-bottom: 34px;
  }

  &__content {
    list-style: none;
    font-size: 24px;
    line-height: 130%;
  }
  &__item{
    margin-bottom: 15px;
  }
}

.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
