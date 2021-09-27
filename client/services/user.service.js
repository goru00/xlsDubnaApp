import axios from 'axios';
import AuthHeader from './auth.header';

const API_URL = "http://localhost:8080/api/pub/";

class UserService {
    getPublicContent() {
        return axios.get(API_URL + "all");
    }
    getUserBoard() {
        return axios.get(API_URL + "user", { headers: AuthHeader() });
    }
    getModeratorBoard() {
        return axios.get(API_URL + "mod", { headers: AuthHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + "admin", { headers: AuthHeader() });
    }
}

export default UserService;