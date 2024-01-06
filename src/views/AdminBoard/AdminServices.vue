<template>
  <div class="container">
    <div class="shedule">
      <div class="shedule__title">Услуги</div>

      <table class="shedule-table">
        <thead>
          <tr class="shedule-table__row">
            <th>Услуга</th>
            <th>Длительность</th>
            <th>Цена</th>
            <th>Группа</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="shedule-table__row"
            v-for="item in SERVICES"
            :key="item.id"
          >
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.title }}</div>
              <div v-if="needEdit && editId === item.id">
                <input type="text" id="newTitle" v-model.lazy="service.title" />
              </div>
            </td>
            <td>
              <div>{{ item.duration }} мин</div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.price }}</div>
              <div v-if="needEdit && editId === item.id">
                <input
                  type="text"
                  id="servicePrice"
                  v-model.lazy="service.price"
                />
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">
                {{ GET_GROUP_SERVICE_FOR_ID(item.groupServiceId).title }}
              </div>
              <div v-if="needEdit && editId === item.id">
                <select
                  v-model="service.group_service_id"
                  name="serviceGroup"
                  id="serviceGroup"
                >
                  <option value="">-- Выберите группу услуг --</option>
                  <option
                    v-for="groupServ in GROUP_SERVICES"
                    :key="groupServ.id"
                    v-bind:value="groupServ.id"
                  >
                    {{ groupServ.title }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">
                <i
                  @click="editService(item.id)"
                  class="fa fa-pencil-square-o shedule-lk__actions"
                  aria-hidden="true"
                ></i>
                <i
                  @click="deleteService(item.id)"
                  class="fa fa-trash shedule-lk__actions shedule-lk__actions-del"
                  aria-hidden="true"
                ></i>
              </div>
              <div v-if="needEdit && editId === item.id">
                <i
                  @click="updateService()"
                  class="fa fa-check-square-o"
                  aria-hidden="true"
                ></i>
              </div>
            </td>
          </tr>

          <tr v-if="isShowInput" class="shedule-table__row">
            <td>
              <input
                type="text"
                id="serviceName"
                v-model.lazy="service.title"
              />
            </td>
            <td>
              <input
                type="text"
                id="serviceDuration"
                v-model.lazy="service.duration"
              />
            </td>
            <td>
              <input
                type="text"
                id="servicePrice"
                v-model.lazy="service.price"
              />
            </td>
            <td>
              <select
                v-model="service.group_service_id"
                name="group"
                id="group-select-serv"
              >
                <option value="Выберите группу услуг">
                  -- Выберите группу услуг --
                </option>
                <option
                  v-bind:value="groupService.id"
                  v-for="groupService in GROUP_SERVICES"
                  :key="groupService.id"
                >
                  {{ groupService.title }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="SERVICES?.length === 0">Услуги отсутствуют</div>
      <button
        v-if="!isShowInput && !needEdit"
        @click="isShowInput = true"
        class="subscribeBtn button-margin"
      >
        Добавить новую услугу
      </button>
      <p>{{ message }}</p>
      <button
        v-if="isShowInput"
        @click="createService()"
        class="subscribeBtn button-margin"
      >
        Сохранить услугу
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdminServices",

  data() {
    return {
      isShowInput: false,
      service: {
        title: null,
        duration: null,
        price: null,
        group_service_id: null,
      },
      message: null,
      editId: null,
      needEdit: false,
    };
  },

  mounted() {
    this.$store.dispatch("GET_SERVICES");
  },
  computed: {
    ...mapGetters([
      "SERVICES",
      "GROUP_SERVICES",
      "GET_GROUP_SERVICE_FOR_ID",
      "SERVICE_FOR_ID",
    ]),
  },

  methods: {
    deleteService(id) {
      const answer = confirm("Удалить услугу?");
      if (answer) {
        this.$store.dispatch("DELETE_SERVICE", id);
        alert("Запись удалена");
      }
    },
    editService(id) {
      this.editId = id;
      this.needEdit = true;
      const serviceForEdit = this.SERVICE_FOR_ID(id);
      this.service.title = serviceForEdit.title;
      this.service.duration = serviceForEdit.duration;
      this.service.price = serviceForEdit.price;
      this.service.group_service_id = serviceForEdit.groupServiceId;
    },
    updateService() {
      if (Object.values(this.service).every((value) => !!value)) {
        this.$store
          .dispatch("UPDATE_SERVICE", {
            id: this.editId,
            service: this.service,
          })
          .then(() => this.$store.dispatch("GET_SERVICES"));
        this.needEdit = false;
        this.message = null;
      } else {
        this.message = "Заполнены не все поля!";
      }
    },
    createService() {
      if (Object.values(this.service).every((value) => !!value)) {
        this.$store.dispatch("CREATE_SERVICE", this.service);
        this.isShowInput = false;
        this.message = null;
      } else {
        this.message = "Заполнены не все поля!";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/shedule";

.subscribeBtn {
  height: 60px;
  background-color: #cdaa7d;
  border-radius: 10px;
  color: #0a1111;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: "Cormorant Garamond";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  box-sizing: border-box;
  text-decoration: none;
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    border: 1px solid #cdaa7d;
  }
}
.button-margin {
  margin-top: 30px;
}
</style>
