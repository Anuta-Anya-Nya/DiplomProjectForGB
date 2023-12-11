// import Shedule from "../models/Shedule";
// import Master from '../models/Master';
// import Service from '../models/Service';
import User from '../models/User';

import userService from "../services/user.service"

export const userStore = {
    state: {
        users: [],
    },
    getters: {
        USERS(state) {
            return state.users;
        },

    },
    mutations: {
        SET_USERS(state, usersList) {
            state.users = usersList;
        },
        ADD_USER: (state, user) => {
            state.users.push(user);
        },
        DELETE_USER: (state, id) => {
            state.users.splice(state.users.findIndex(el => el.id === id), 1);
        }
    },
    actions: {
        GET_USERS: async (context, params) => {
            userService.getAllUsersForAdmin(params).then((res) => {
                const data = [];
                res.data.forEach((user) => {
                    data.push(new User(user.id, null, user.email, null, user.name, user.phone, user.birthdate));
                });
                context.commit('SET_USERS', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        // GET_SHEDULE_BY_DATE_AND_MASTER: async (context, param) => {
        //     shedulesService.getShedulesByDateAndMaster(param).then((res) => {
        //         const data = [];
        //         res.data.forEach((element) => {
        //             data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId));
        //         });
        //         context.commit('SET_SHEDULE', data);
        //     })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },

        // GET_SHEDULE_BY_DATE_AND_MASTER_FOR_MASTER: async (context, params) => {
        //     shedulesService.getSheduleForMaster(params).then((res) => {
        //         const data = [];
        //         res.data.forEach((element) => {
        //             const user = new User(element.userId, null, null,element.user.name);
        //             const service = new Service(element.serviceId, element.service.title)
        //             data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId, null, service, user));
        //         });
        //         context.commit('SET_SHEDULE', data);
        //     })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },

        // GET_SHEDULE_BY_DATE_FOR_ADMIN: async (context, date) => {
        //     shedulesService.getSheduleForAdmin(date).then((res) => {
        //         const data = [];
        //         res.data.forEach((element) => {
        //             const user = new User(element.userId, null, null,element.user.name, element.user.phone);
        //             const master = new Master(element.masterId, element.master.master_name, null, null, element.master.position);
        //             const service = new Service(element.serviceId, element.service.title, null, element.service.duration, element.service.price,);
        //             data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId, master, service, user));
        //         });
        //         context.commit('SET_SHEDULE', data);
        //     })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },

        // CREATE_SHEDULE: async (context, data) => {
        //     shedulesService.createShedule(data).then((res) => {
        //         console.log(res.data);
        //     })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },
        // GET_SHEDULE_BY_USER: async (context, userId) => {
        //     shedulesService.getSheduleByUser(userId).then((res) => {
        //         const data = [];
        //         res.data.forEach((element) => {
        //             const master = new Master(element.masterId, element.master.master_name);
        //             const service = new Service(element.serviceId, element.service.title, null, element.service.duration, element.service.price,)
        //             data.push(new Shedule(element.id, element.date, element.time, element.userId, element.masterId, element.serviceId, master, service));
        //         });
        //         context.commit('SET_SHEDULE', data);
        //     })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },
        DELETE_USER: async (context, id) => {
            userService.deleteUser(id).then((res) => {
                console.log(res.data);
                context.commit('DELETE_USER', id);
            })
                .catch((e) => {
                    console.log(e);
                });
        },

    },
}