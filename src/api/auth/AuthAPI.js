import axios from 'axios'
import User from "../../modules/User.js";


export default {
    register: async form =>{
        const res = (await axios.post('http://127.0.0.1:8000/api/auth/register',form)).data;
        console.log('dd', res);
    },
    login: async form => {
        const token = (await axios.post('http://127.0.0.1:8000/api/auth/login', form)).data.token;
        localStorage.setItem('auth_token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
    },
    logout: () => {
        axios.post('http://127.0.0.1:8000/api/auth/logout');
    },
    getAuthUser: async () =>  {
        const res = (await axios.get('http://127.0.0.1:8000/api/auth/user')).data;
        console.log('dd', res);
        return new User({
            id: res?.id,
            name: res?.name,
            email: res?.email,
        });
    },

}
