import Master from "../models/Master";
import masterService from "../services/master.service"

export const masterStore = {
    state: {
        masters: [],
        currentMaster: null,
        masterAccount: null,
    },
    getters: {
        MASTERS(state) {
            return state.masters;
        },
        CURRENT_MASTER(state) {
            return state.currentMaster;
        },
        MASTER_ACCOUNT(state) {
            return state.masterAccount;
        },
        MASTER_BY_ID: state => id => {
            return state.masters.find(master => master.id === id);
        },
    },
    mutations: {
        SET_MASTERS(state, mastersList) {
            state.masters = mastersList;
        },
        ADD_MASTER: (state, master) => {
            state.masters.push(master);
        },
        SET_CURRENT_MASTER: (state, master) => {
            state.currentMaster = master;
        },
        SET_MASTER_ACCOUNT: (state, master) => {
            state.masterAccount = master;
        },
        DEL_MASTER: (state, id) => {
            state.masters.splice(state.masters.findIndex(el => el.id === id), 1);
        },

    },
    actions: {
        GET_MASTERS: async (context) => {
            masterService.getAllMasters().then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Master(element.id, element.master_name, element.birthdate, element.phone, element.position, element.photo, element.about_text, element.group_service_id));
                });
                context.commit('SET_MASTERS', data);
            })
        },
        GET_MASTERS_BY_GROUP: async (context, idGroup) => {
            masterService.getMastersByGroup(idGroup).then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Master(element.id, element.master_name, element.birthdate, element.phone, element.position, element.photo, element.about_text, element.group_service_id));
                });
                context.commit('SET_MASTERS', data);
            })
        },
        GET_MASTER_BY_ID: async (context, idMaster) => {
            masterService.GetMasterById(idMaster).then((res) => {
                const data = new Master(res.data.id, res.data.master_name, res.data.birthdate, res.data.phone, res.data.position, res.data.photo, res.data.about_text, res.data.group_service_id)
                context.commit('SET_CURRENT_MASTER', data);
            })
        },
        GET_MASTER_BY_NAME_AND_PHONE: async (context, params) => {
            return new Promise((resolve) => {
                masterService.getMasterByNameAndPhone(params).then((res) => {
                    const master = new Master(res.data.id, res.data.master_name, res.data.birthdate, res.data.phone, res.data.position, res.data.photo, res.data.about_text, res.data.group_service_id)
                    context.commit('SET_MASTER_ACCOUNT', master);
                    resolve(master);
                })

            })
        },
        DELETE_MASTER: async (context, id) => {
            masterService.deleteMasterById(id).then((res) => {
                console.log(res.data);
                context.commit('DEL_MASTER', id);
            })
                .catch((e) => {
                    console.log(e);
                });
        },

        CREATE_MASTER: async (context, data) => {
            masterService.createMaster(data).then((res) => {
                console.log(res.data);
                context.commit('ADD_MASTER', new Master(res.data.id, res.data.master_name, res.data.birthdate, res.data.phone, res.data.position, res.data.photo, res.data.about_text, res.data.group_service_id));
            })
                .catch((e) => {
                    console.log(e);
                });
        },

        UPDATE_MASTER: async (context, data) => {
            return new Promise((resolve) => {
                masterService.updateMaster(data).then((res) => {
                    console.log(res);
                    resolve(res)
                })
            }).catch((e) => {
                console.log(e);
            });
        },
    },
}