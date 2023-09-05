import api from './api';

class AuthService {

    constructor() { }

    async login(credentials) {
        try {
            const { data } = await api.post('/auth/login', credentials);

            return data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async validateToken(token) {
        try {
            const { data } = await api.post('/auth/validate', { token: token });
            return data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }
}

export default new AuthService();