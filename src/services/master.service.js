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

}

export default new MasterService();



