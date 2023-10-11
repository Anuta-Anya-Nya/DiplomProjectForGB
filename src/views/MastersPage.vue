<template>
  <section class="masters pages-margin">
    <div class="container">
      <h2 class="pages__title">Наши мастера</h2>
      <div class="masters__box">
        <router-link
          :to="`/masters/${master.id}`"
          v-for="master in GET_MASTERS"
          :key="master.id"
          class="master__item"
        >
          <img
            :src="require(`@/assets/img/${master.photo}`)"
            alt="our_masters"
            class="master__photo"
          />
          <h3 class="master__name">{{ master.name }}</h3>
          <p class="master__about">{{ master.position }}</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "MastersPage",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["GET_MASTERS", "getServerUrl"]),
  },
  methods: {
    ...mapMutations(["SET_MASTERS"]),
  },
  mounted() {
    axios.get(`${this.getServerUrl}/masters`).then((res) => {
      const data = [];
      res.data._embedded.masters.forEach((element) => {
        data.push({
          id: element.id,
          name: element.masterName,
          position: element.position,
          photo: element.photo,
          aboutText: element.aboutText,
          serviceId: element.groupServiceId,
        });
      });
      this.SET_MASTERS(data);
    });
  },
};
</script>

<style lang="scss" scoped>
// страница мастеров
.pages-margin {
  margin-top: 80px;
  margin-bottom: 100px;
}

.masters__box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

.master__item {
  margin-bottom: 40px;
  position: relative;
  color: $color-text;
  text-decoration: none;
}

.master__item:hover .master__name {
  color: $color-hover;
}

.master__name::before {
  content: "";
  display: block;
  width: 400px;
  height: 477px;
  border: 1px solid $color-hover;
  position: absolute;
  top: -16px;
  left: 16px;
}

.master__name {
  font-weight: 700;
  font-size: 27px;
  line-height: 130%;
  margin-top: 30px;
}

.master__about {
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
  margin-top: 10px;
}
.master__photo {
  position: relative;
  z-index: 10;
}
.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-bottom: 80px;
}
</style>
