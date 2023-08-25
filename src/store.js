import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/auth/store';
import exam from './modules/exam/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        exam
    }
});
