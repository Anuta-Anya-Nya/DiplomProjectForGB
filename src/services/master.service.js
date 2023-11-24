import axios from 'axios';
const API_URL = "http://localhost:8080/api";



class MasterService{

    getAllMasters(){
        return axios.get(`${API_URL}/masters`);
    }
}

export default new MasterService();



