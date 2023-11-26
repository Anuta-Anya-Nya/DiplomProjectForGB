import Shedule from "../models/Shedule";
import shedulesService from "../services/shedules.service"

export const sheduleStore = {
    state: {
        shedule: [],        
    },
    getters: {
        SHEDULE(state) {
            return state.shedule;
        },
                
    },
    mutations: {
        SET_SHEDULE(state, sheduleList) {
            state.shedule = sheduleList;
        },
        ADD_SHEDULE: (state, shedule) => {
            state.shedule.push(shedule);
        },        
    },
    actions: {
        GET_SHEDULE: async (context) => {
            shedulesService.getAllShedule().then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Shedule(element.id, element.date, element.time, element.user_id, element.master_id, element.service_id));
                });
                context.commit('SET_SHEDULE', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        GET_SHEDULE_BY_DATE_AND_MASTER: async (context, param) => {            
            shedulesService.getShedulesByDateAndMaster(param).then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Shedule(element.id, element.date, element.time, element.user_id, element.master_id, element.service_id));
                });
                context.commit('SET_SHEDULE', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        CREATE_SHEDULE: async (context, data) => {            
            shedulesService.createShedule(data).then((res) => {
                console.log(res.data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
}