import axios from 'axios';
import store from '@/store'
import router from '@/routes'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use((config) => {
    // Obtendo o token do Vuex store ou localStorage
    const token = store.state.auth.token || localStorage.getItem('authToken');

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {  // Unauthorized
        store.dispatch('auth/logout');
        router.push({ name: 'Login' });
    }
    return Promise.reject(error);
});



export default instance;