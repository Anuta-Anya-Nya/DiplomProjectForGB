import Master from "../models/Master";
import masterService from "../services/master.service"

export const masterStore = {
    state: {
        masters: [],
    },
    getters: {
        MASTERS(state) {
            return state.masters;
        },
    },
    mutations: {
        SET_MASTERS(state, mastersList) {
            state.masters = mastersList;
        },
        ADD_SET_MASTERS: (state, master) => {
            state.masters.push(master);
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
    },
}