import { login } from '@/services/authService';
import { register } from '@/services/userService';

const state = {
    user: null,
    token: null,
    isAuthenticated: false
};

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
    }
};

const actions = {
    async login({ commit }, credentials) {
        try {
            const { token } = await login(credentials);
            // Assuming the user details are returned in the token or fetched separately
            commit('SET_USER', { registration: credentials.registration }); // Update accordingly
            commit('SET_TOKEN', token);
        } catch (error) {
            console.error('Login Error:', error.message);
            throw error;
        }
    },
    logout({ commit }) {
        commit('CLEAR_USER');
    },
    async register({ commit }, userData) {
        try {
            const user = await register(userData);
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
