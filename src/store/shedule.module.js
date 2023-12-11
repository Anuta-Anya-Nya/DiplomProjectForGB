import Shedule from "../models/Shedule";
import Master from '../models/Master';
import Service from '../models/Service';
import User from '../models/User';

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
        DELETE_SHEDULE: (state, id) => {
            state.shedule.splice(state.shedule.findIndex(el => el.id === id), 1);
        }
    },
    actions: {
        GET_SHEDULE: async (context) => {
            shedulesService.getAllShedule().then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId));
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
                    data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId));
                });
                context.commit('SET_SHEDULE', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },

        GET_SHEDULE_BY_DATE_AND_MASTER_FOR_MASTER: async (context, params) => {
            shedulesService.getSheduleForMaster(params).then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    const user = new User(element.userId, null, null,element.user.name);
                    const service = new Service(element.serviceId, element.service.title)
                    data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId, null, service, user));
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
        GET_SHEDULE_BY_USER: async (context, userId) => {
            shedulesService.getSheduleByUser(userId).then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    const master = new Master(element.masterId, element.master.master_name);
                    const service = new Service(element.serviceId, element.service.title, null, element.service.duration, element.service.price,)
                    data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId, master, service));
                });
                context.commit('SET_SHEDULE', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        DELETE_SHEDULE: async (context, id) => {
            shedulesService.deleteSheduleById(id).then((res) => {
                console.log(res.data);
                context.commit('DELETE_SHEDULE', id);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        
    },
}