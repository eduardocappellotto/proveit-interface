import api from './api';

class AuthService {

    constructor() { }

    async login(registration, password) {
        try {
            const response = await api.post('/auth/login', { registration, password });
            return response.data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }
}

export default new AuthService();