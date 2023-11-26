import axios from 'axios';
const API_URL = "http://localhost:8080/api/services";

class ServicesService {

    getAllServices() {
        return axios.get(API_URL);
    }
    
    getServicesByGroupId(id) {
        return axios.get(API_URL + `/byGroupService?group_service_id=${id}`);
    }

    getServiceById(id){
        return axios.get(API_URL + `/servicesById/${id}`);
    }

}

export default new ServicesService();