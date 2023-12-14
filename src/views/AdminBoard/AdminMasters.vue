<template>
  <div class="container">
    <div class="shedule">
      <div class="shedule__title">Мастера</div>

      <table class="shedule-table">
        <thead>
          <tr class="shedule-table__row">
            <th>Имя</th>
            <th>Должность</th>
            <th>Телефон</th>
            <th>Дата рождения</th>
            <th>Фото</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr class="shedule-table__row" v-for="item in MASTERS" :key="item.id">
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.name }}</div>
              <div v-if="needEdit && editId === item.id">
                <input
                  type="text"
                  id="newMasterName"
                  v-model.lazy="master.master_name"
                />
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.position }}</div>
              <div v-if="needEdit && editId === item.id">
                <input
                  type="text"
                  id="masterPosition"
                  v-model.lazy="master.position"
                />
                <select
                  v-model="master.group_service_id"
                  name="group"
                  id="group-select"
                >
                  <option value="Выберите группу услуг">
                    -- Выберите группу услуг --
                  </option>
                  <option
                    v-bind:value="item.id"
                    v-for="item in GROUP_SERVICES"
                    :key="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.phone }}</div>
              <div v-if="needEdit && editId === item.id">
                <input
                  type="text"
                  id="masterPhone"
                  v-model.lazy="master.phone"
                />
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.birthdate }}</div>
              <div v-if="needEdit && editId === item.id">
                <input
                  type="date"
                  id="masterBirth"
                  v-model.lazy="master.birthdate"
                />
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.photo }}</div>
              <div v-if="needEdit && editId === item.id">
                <input
                  type="text"
                  id="masterPhoto"
                  v-model.lazy="master.photo"
                />
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">{{ item.aboutText }}</div>
              <div v-if="needEdit && editId === item.id">
                <textarea
                  v-model.lazy="master.about_text"
                  id="masterAbout"
                  rows="3"
                >
                     Инфо о мастере</textarea
                >
              </div>
            </td>
            <td>
              <div v-if="!needEdit || editId != item.id">
                <i
                  @click="editMaster(item.id)"
                  class="fa fa-pencil-square-o shedule-lk__delete"
                  aria-hidden="true"
                ></i>
                <i
                  @click="deleteMaster(item.id)"
                  class="fa fa-trash shedule-lk__delete"
                  aria-hidden="true"
                ></i>
              </div>
              <div v-if="needEdit && editId === item.id">
                <i
                  @click="updateMaster()"
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
                id="masterName"
                v-model.lazy="master.master_name"
              />
            </td>
            <td>
              <input
                type="text"
                id="masterPosition"
                v-model.lazy="master.position"
              />
            </td>
            <td>
              <input type="text" id="masterPhone" v-model.lazy="master.phone" />
            </td>
            <td>
              <input
                type="date"
                id="masterBirth"
                v-model.lazy="master.birthdate"
              />
            </td>
            <td>
              <input type="text" id="masterPhoto" v-model.lazy="master.photo" />
            </td>
            <td>
              <textarea
                v-model.lazy="master.about_text"
                id="masterAbout"
                rows="3"
              >
                     Инфо о мастере</textarea
              >
            </td>
            <td>
              <select
                v-model="master.group_service_id"
                name="group"
                id="group-select"
              >
                <option value="Выберите группу услуг">
                  -- Выберите группу услуг --
                </option>
                <option
                  v-bind:value="item.id"
                  v-for="item in GROUP_SERVICES"
                  :key="item.id"
                >
                  {{ item.title }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="MASTERS?.length === 0">Мастера отсутсвуют</div>
      <button
        v-if="!isShowInput"
        @click="isShowInput = true"
        class="subscribeBtn button-margin"
      >
        Добавить нового мастера
      </button>
      <p>{{ message }}</p>
      <button
        v-if="isShowInput"
        @click="createMaster()"
        class="subscribeBtn button-margin"
      >
        Сохранить мастера
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdminMasters",

  data() {
    return {
      isShowInput: false,
      master: {
        master_name: null,
        position: null,
        phone: null,
        birthdate: null,
        photo: null,
        about_text: null,
        group_service_id: null,
      },
      message: null,
      editId: null,
      needEdit: false,
    };
  },

  mounted() {
    this.$store.dispatch("GET_MASTERS");
  },
  computed: {
    ...mapGetters(["MASTERS", "GROUP_SERVICES", "MASTER_BY_ID"]),
  },

  methods: {
    deleteMaster(id) {
      const answer = confirm("Удалить аккаунт мастера?");
      if (answer) {
        this.$store.dispatch("DELETE_MASTER", id);
        alert("Запись удалена");
      }
    },
    editMaster(id) {
      console.log("edit", id);
      this.editId = id;
      this.needEdit = true;
      const masterForEdit = this.MASTER_BY_ID(id);

      this.master.master_name = masterForEdit.name;
      this.master.position = masterForEdit.position;
      this.master.phone = masterForEdit.phone;
      this.master.birthdate = masterForEdit.birthdate;
      this.master.photo = masterForEdit.photo;
      this.master.about_text = masterForEdit.aboutText;
      this.master.group_service_id = masterForEdit.groupServiceId;
    },
    updateMaster() {
      if (Object.values(this.master).every((value) => !!value)) {
        this.$store
          .dispatch("UPDATE_MASTER", { id: this.editId, master: this.master })
          .then(() => this.$store.dispatch("GET_MASTERS"));
        this.needEdit = false;
        this.message = null;
      } else {
        this.message = "Заполнены не все поля!";
      }
    },
    createMaster() {
      if (Object.values(this.master).every((value) => !!value)) {
        this.$store.dispatch("CREATE_MASTER", this.master);
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
.shedule-table {
  border-collapse: collapse;
  width: 100%;
  thead {
    color: $color-hover;
  }

  &__row {
    border: 1px solid $color-text;
  }
  th {
    border: 1px solid $color-text;
    padding: 5px 0 5px 0;
  }
  td {
    border: 1px solid $color-text;
    text-align: center;
    vertical-align: middle;
    padding: 5px 0 5px 0;
  }
}
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
