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
    createService(data){
        return axios.post(API_URL, data);
    }
    updateService(data){
        return axios.put(API_URL + `/${data.id}`, data.service );
    }
    deleteServiceById(id) {
        return axios.delete(API_URL + `/${id}`);
    }

}

export default new ServicesService();