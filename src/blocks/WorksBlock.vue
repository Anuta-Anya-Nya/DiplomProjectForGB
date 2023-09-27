<template>
  <section class="works container">
    <h2 class="pages__title">Наши работы</h2>
    <ul class="works__filter">
      <li
        v-for="tag in tags"
        :key="tag.id"
        @click="changeCurrentTagID(tag.id)"
        class="filter-item"
        :class="tag.id === currentTagID ? 'activeTag' : ''"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="works__box">
      <img
        v-for="image in filterByTag"
        :key="image.id"
        :src="require(`@/assets/img/${image.img}`)"
        alt="our works"
        class="works__foto"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "WorksBlock",

  data() {
    return {
      tags: [
        { id: 0, name: "Показать все" },
        { id: 1, name: "Парикмахерские услуги" },
        { id: 2, name: "Маникюр" },
        { id: 3, name: "Визаж" },
      ],
      currentTagID: 0,
    };
  },

  computed: {
    ...mapGetters(["GET_WORKSIMAGE"]),
    filterByTag() {
      if (this.currentTagID) {
        return this.GET_WORKSIMAGE.filter(
          (el) => el.tagID === this.currentTagID
        );
      } else {
        return this.GET_WORKSIMAGE;
      }
    },
  },
  methods: {
    changeCurrentTagID(id) {
      this.currentTagID = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.works {
  margin-bottom: 100px;
}

.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-bottom: 80px;
}

.works__filter {
  list-style: none;
  display: flex;
  gap: 60px;
  justify-content: center;
  font-size: 24px;
  line-height: 130%;
  margin-bottom: 60px;
}

.filter-item {
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
}

.filter-item:hover {
  color: $color-hover;
  border-bottom: 1px solid $color-hover;
  cursor: pointer;
}
.activeTag {
  color: $color-hover;
}

.works__box {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
</style>
