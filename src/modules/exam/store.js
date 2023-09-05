import ExamService from '@/services/examService';

const state = {
    exams: [],
};

const mutations = {
    SET_EXAMS(state, payload) {
        state.exams = payload;
    },
};

const actions = {
    async fetchExams({ commit }, findAll) {
        try {
            const examsData = await ExamService.findAll(findAll);
            commit('SET_EXAMS', examsData.data);
        } catch (error) {
            console.error('Fetching Exams Error:', error.message);
            throw error;
        }
    },
};



export default {
    namespaced: true,
    state,
    mutations,
    actions,

};
