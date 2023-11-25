import axios from 'axios';
const API_URL = "http://localhost:8080/api/services";

class ServicesService {

    getAllServices() {
        return axios.get(API_URL);
    }
}

export default new ServicesService();