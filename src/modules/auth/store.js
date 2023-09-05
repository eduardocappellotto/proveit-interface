import AuthService from '@/services/authService';
import UserService from '@/services/userService';
import router from '@/routes'

const lsToken = localStorage.getItem('authToken');

const state = {
    user: null,
    token: lsToken || null,
    isAuthenticated: Boolean(lsToken)

}

const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
        state.isAuthenticated = Boolean(payload);
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
    CLEAR_USER(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
    },

};

const actions = {
    async login({ commit }, credentials) {
        try {
            const { token, role, userId } = await AuthService.login(credentials);

            const newUser = {
                registration: credentials.registration,
                role,
                id: userId
            }

            localStorage.setItem('authToken', token);

            commit('SET_USER', newUser);
            commit('SET_TOKEN', token);
            return token
        } catch (error) {
            console.error('Login Error:', error.message);
            throw error;
        }
    },
    async validateToken({ commit }) {

        if (state.token) {
            try {
                const userData = await AuthService.validateToken(state.token);
                commit('SET_USER', userData);
            } catch (error) {
                console.error('Token validation failed:', error.message);
                localStorage.removeItem('authToken');
                commit('CLEAR_USER');
            }
        }
    },
    logout({ commit }) {
        localStorage.removeItem('authToken'); // Remover o token do localStorage
        commit('CLEAR_USER');
        router.push('/login')
    },
    async register({ commit }, userData) {
        try {
            const user = await UserService.register(userData);
            commit('SET_USER', user);
        } catch (error) {
            console.error('Registration Error:', error.message);
            throw error;
        }
    }
};

const getters = {
    isAdmin(state) {
        return state.user && state.user.role === 'admin';
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
