<template>
  <section class="price pages-margin">
    <div class="container">
      <h2 class="pages__title">Цены на услуги</h2>
      <div class="price__box">
        <div class="price__item" v-for="idGroupService in idOfGroupServices" :key="idGroupService">
          <img
            class="price__img"
            :src="require(`@/assets/img/price${idGroupService}.jpg`)"
            alt="foto"
          />
          <table class="price-table">
            <div
              v-for="service in servicesByGroupService(idGroupService)"              
              :key="service.id"
              class="price__row"
            >
              <tr class="price__row-first">
                <td class="bigger-row">{{ service.title }}</td>
                <td class="price__value">{{ service.price }} руб</td>
              </tr>
              <tr>
                <td colspan="2" class="smaller-row">
                  {{ titleOfGroupService(idGroupService) }}
                </td>
              </tr>
            </div>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: "PricePage",

  computed: {
    ...mapGetters(["SERVICES", "GROUP_SERVICES"]),

    // для группировки услуг в прайсе по группам
    idOfGroupServices() {
      const result = [];
      this.SERVICES.forEach((element) => {
        result.push(element.groupServiceId);
      });
      return [...new Set(result)];
    },
  },
  methods: {
    servicesByGroupService(groupServiceId){
      return this.SERVICES.filter(
                (service) => service.groupServiceId === groupServiceId
              )
    },
    titleOfGroupService(idGroupService){
      return this.GROUP_SERVICES.find((el) => el.id === idGroupService).title
    }
  },
  mounted() {
    this.$store.dispatch('GET_SERVICES');    
  },
};
</script>

<style lang="scss" scoped>
.price {
  &__row {
    border-bottom: 1px solid $color-text;
  }

  &__row-first {
    display: flex;
    justify-content: space-between;
  }
}

.price__box {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.price__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 134px;
}

.price__item:nth-child(2n) {
  flex-direction: row-reverse;
}

.price__img {
  display: block;
  width: 100%;
}

.price-table {
  font-weight: 700;
  font-size: 27px;
  line-height: 130%;
  width: 100%;
  border-collapse: collapse;
}

.bigger-row {
  padding-bottom: 10px;
  padding-top: 30px;
}

.price__value {
  text-align: right;
  padding-bottom: 10px;
  padding-top: 30px;
}

.smaller-row {
  font-weight: 400;
  font-size: 18px;

  padding-bottom: 10px;
}

.pages-margin {
  margin-top: 80px;
  margin-bottom: 100px;
}

.pages__title {
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  text-align: center;
  margin-bottom: 80px;
}
</style>
