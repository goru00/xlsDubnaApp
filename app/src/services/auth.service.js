import axios from "axios";


class AuthService {
  login(username, password) {
    return axios
      .post("http://localhost:8080/v1/api/auth/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post("http://localhost:8080/v1/api/auth/signup", {
      username,
      password,
    });
  }
}

export default new AuthService();
