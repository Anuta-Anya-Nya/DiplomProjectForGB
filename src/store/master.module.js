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
        MASTER_BY_NAME_AND_PHONE_AND_BIRTH: state => params => {
            return state.masters.find(master => master.name === params.name && master.phone === params.phone && master.birthdate === params.birthdate);
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
        SET_MASTER_ACCOUNT: (state, master) => {
            state.masterAccount = master;
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
                const data = new Master(res.id, res.master_name, res.birthdate, res.phone, res.position, res.photo, res.about_text, res.group_service_id)
                context.commit('SET_CURRENT_MASTER', data);
            })
        },
        GET_MASTER_BY_NAME_AND_PHONE: async (context, params) => {
                return new Promise((resolve)=> {
                    masterService.getMasterByNameAndPhone(params).then((res) => {
                const master = new Master(res.data[0].id, res.data[0].master_name, res.data[0].birthdate, res.data[0].phone, res.data[0].position, res.data[0].photo, res.data[0].about_text, res.data[0].group_service_id)
                context.commit('SET_MASTER_ACCOUNT', master); 
                resolve(master);
                })
                
        })
        },                  
            
            
            
        },

    
}