import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/store.js';
import exam from './modules/exam/store.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        drawer: false
    },
    mutations: {
        SET_USER(state) {
            state.drawer = !state.drawer
        }
    },
    actions: {
        updateDrawer({ commit }) {
            commit('SET_USER');
        }
    },

    modules: {
        auth,
        exam
    }
});

export default store;
