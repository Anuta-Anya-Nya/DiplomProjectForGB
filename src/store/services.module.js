import Service from "../models/Service";
import servicesService from "../services/services.service"

export const servicesStore = {
    state: {
        services: [],
    },
    getters: {
        SERVICES(state) {
            return state.services;
        },
    },
    mutations: {
        SET_SERVICES(state, servicesList) {
            state.services = servicesList;
        },
        ADD_SET_SERVICES: (state, service) => {
            state.services.push(service);
        },
    },
    actions: {
        GET_SERVICES: async (context) => {
            servicesService.getAllServices().then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Service(element.id, element.title, element.group_service_id, element.duration, element.price));
                });
                context.commit('SET_SERVICES', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
}