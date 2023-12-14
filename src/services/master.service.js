import axios from 'axios';
const API_URL = "http://localhost:8080/api/masters";

class MasterService {
    getAllMasters() {
        return axios.get(API_URL);
    }
    getMastersByGroup(idGroup) {
        return axios.get(API_URL + `?group_service_id=${idGroup}`);
    }
    GetMasterById(idMaster) {
        return axios.get(API_URL + `/${idMaster}`);
    }
    getMasterByNameAndPhone(params) {
        return axios.get(API_URL + `/masterlk/master?name=${params.name}&phone=${params.phone}`);
    }
    deleteMasterById(idMaster) {
        return axios.delete(API_URL + `/${idMaster}`);
    }
    createMaster(data){
        return axios.post(API_URL, data);
    }
    updateMaster(data){
        return axios.put(API_URL + `/${data.id}`, data.master );
    }

}
export default new MasterService();



