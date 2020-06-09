import axios from "axios";

const instance = axios.create({
    baseURL: 'https://emphasoft-test-assignment.herokuapp.com/',
    headers: {
        Authorization : "Token 781bd9f1de084f4daa7ba2aa8a71a2eab855354e",
    }
});

export const AuthAPI = {
    login(username, password) {
        return instance.post('/api-token-auth/', {username, password}).then(response => {
            return response.data
        })
    }
};
export const UsersAPI = {
  getUsers() {
      return instance.get('/api/v1/users/', ).then(response => {
          return response.data
      })
  }
};