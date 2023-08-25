import api from './api';

class UserService {

    constructor() { }

    async register(userDto) {
        try {
            const response = await api.post('/users/register', userDto);
            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }
}

export default new UserService();
