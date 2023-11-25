import axios from 'axios';
const API_URL = "http://localhost:8080/api/masters";



class MasterService{

    getAllMasters(){
        return axios.get(API_URL);
    }
}

export default new MasterService();



