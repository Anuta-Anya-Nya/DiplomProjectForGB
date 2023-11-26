import axios from 'axios';
const API_URL = "http://localhost:8080/api/shedule";

class SheduleService {

    getAllShedule() {
        return axios.get(API_URL);
    }
    
    getShedulesByDateAndMaster(param) {
        return axios.get(API_URL + `?date=${param.date}&master_id=${param.id}`);
    }

    createShedule(data) {
        return axios.post(API_URL, data);
    }
}

export default new SheduleService();