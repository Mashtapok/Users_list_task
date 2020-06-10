import axios from "axios";

let token = localStorage.getItem('token');
const instance = axios.create({
    baseURL: 'https://emphasoft-test-assignment.herokuapp.com/',
});

export const AuthAPI = {
    login(username, password) {
        return instance.post('/api-token-auth/', {username, password}).then(response => {
            token = response.data.token;
            return response.data
        })
    }
};
export const UsersAPI = {
  getUsers() {
      return instance.get('/api/v1/users/', {headers: {
              Authorization : `Token ${token}`,
          }} ).then(response => {
          return response.data
      })
  }
};