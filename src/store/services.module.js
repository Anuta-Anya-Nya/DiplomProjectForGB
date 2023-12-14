import Service from "../models/Service";
import servicesService from "../services/services.service"

export const servicesStore = {
    state: {
        services: [],
        currentService: null,
        serviceById: null,
    },
    getters: {
        SERVICES(state) {
            return state.services;
        },
        CURRENT_SERVICE(state) {
            return state.currentService;
        },
        SERVICE_BY_ID(state) {
            return state.serviceById;
        },
        SERVICE_FOR_ID: state => id =>{
           return state.services.find(el => el.id === id) 
        },
        
    },
    mutations: {
        SET_SERVICES(state, servicesList) {
            state.services = servicesList;
        },
        ADD_SERVICE: (state, service) => {
            state.services.push(service);
        },
        SET_CURRENT_SERVICE: (state, service) => {
            state.currentService = service;
        },
        SET_SERVICE_BY_ID: (state, service) => {
            state.serviceById = service;
        },
        DEL_SERVICE: (state, id) => {
            state.services.splice(state.services.findIndex(el => el.id === id), 1);
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
        GET_SERVICES_BY_GROUP: async (context, id) => {
            servicesService.getServicesByGroupId(id).then((res) => {
                const data = [];
                res.data.forEach((element) => {
                    data.push(new Service(element.id, element.title, element.group_service_id, element.duration, element.price));
                });
                return context.commit('SET_SERVICES', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        GET_SERVICE_BY_ID: async (context, id) => {
            servicesService.getServiceById(id).then((res) => {
                const data = new Service(res.data.id, res.data.title, res.data.group_service_id, res.data.duration, res.data.price)
                               
                context.commit('SET_SERVICE_BY_ID', data);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        CREATE_SERVICE: async (context, data) => {
            servicesService.createService(data).then((res) => {                
                context.commit('ADD_SERVICE', new Service(res.data.id, res.data.title, res.data.group_service_id, res.data.duration, res.data.price));
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        UPDATE_SERVICE: async (context, data) => {
            return new Promise((resolve) => {
                servicesService.updateService(data).then((res) => {
                    console.log(res);
                    resolve(res)
                })
            }).catch((e) => {
                console.log(e);
            });
        },
        DELETE_SERVICE: async (context, id) => {
            servicesService.deleteServiceById(id).then((res) => {
                console.log(res.data);
                context.commit('DEL_SERVICE', id);
            })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
}