import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getAllUsers() {
    return axios.get(API_URL + 'test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'test/user', { headers: authHeader() });
  }

  getMasterBoard() {
    return axios.get(API_URL + 'test/master', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'test/admin', { headers: authHeader() });
  }
  
  getAllUsersForAdmin(params) {
    return axios.get(API_URL + `users?start=${params.start}&count=${params.count}`, { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
  }

}

export default new UserService();