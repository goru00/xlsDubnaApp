import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/pub/";

class UserService {

  setPublicContent(tablename, data) {
    return axios
      .post(API_URL + "setContent", { headers: authHeader(), tablename })
      .then((response) => {
        return response.data;
      });
  }

  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
