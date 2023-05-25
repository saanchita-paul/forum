import axios from 'axios';
import router from "../router/index.js";
import {kickOut} from "../services/AuthService.js";

const token = localStorage.getItem('auth_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
}
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        // Do something with response error
        if (error.response.status === 401 && router.currentRoute?.meta?.isProtected) {
            kickOut();
        }
        return Promise.reject(error);
    }
);
