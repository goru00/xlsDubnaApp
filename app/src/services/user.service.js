import axios from "axios";

const API_URL = "http://localhost:8080/v1/api/content/";

class UserService {
  getPublicContent(page, limit) {
    return axios.get(API_URL, {
      params: {
        page,
        limit
      }
    });
  }
  getTableById(id) {
    return axios.get(API_URL + id);
  }
}

export default new UserService();
