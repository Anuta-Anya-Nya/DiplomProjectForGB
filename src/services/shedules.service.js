import axios from "axios";
const API_URL = "http://localhost:8080/api/shedule";

class SheduleService {
  getAllShedule() {
    return axios.get(API_URL);
  }

  getShedulesByDateAndMaster(param) {
    return axios.get(API_URL + `?date=${param.date}&masterId=${param.id}`);
  }

  createShedule(data) {
    return axios.post(API_URL, data);
  }

  getSheduleByUser(userId) {
    return axios.get(API_URL + `/userShedule/list?userId=${userId}`);
  }

  getSheduleForMaster(params) {
    return axios.get(
      API_URL +
        `/masterShedule/list?date=${params.date}&masterId=${params.masterId}`
    );
  }

  getSheduleForAdmin(date) {
    return axios.get(API_URL + `/adminShedule/list?date=${date}`);
  }

  deleteSheduleById(sheduleId) {
    return axios.delete(API_URL + `/userShedule/list/${sheduleId}`);
  }
}

export default new SheduleService();
