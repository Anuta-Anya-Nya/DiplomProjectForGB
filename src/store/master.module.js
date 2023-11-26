import Master from "../models/Master";
import masterService from "../services/master.service"

export const masterStore = {
    state: {
        masters: [],
        currentMaster: null
    },
    getters: {
        MASTERS(state) {
            return state.masters;
        },
        CURRENT_MASTER(state) {
            return state.currentMaster;
        }
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

    },
    actions: {
        GET_MASTERS: async (context) => {
            masterService.getAllMasters().then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Master(element.id, element.master_name, element.position, element.photo, element.about_text, element.group_service_id));
                });
                context.commit('SET_MASTERS', data);
            })
        },
        GET_MASTERS_BY_GROUP: async (context, idGroup) => {
            masterService.getMastersByGroup(idGroup).then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Master(element.id, element.master_name, element.position, element.photo, element.about_text, element.group_service_id));
                });
                context.commit('SET_MASTERS', data);
            })
        },
        GET_MASTER_BY_ID: async (context, idMaster) => {
            masterService.GetMasterById(idMaster).then((res) => {
                const data = new Master(res.data.id, res.data.master_name, res.data.position, res.data.photo, res.data.about_text, res.data.group_service_id)
                               
                context.commit('SET_CURRENT_MASTER', data);
            })
        },

    },
}