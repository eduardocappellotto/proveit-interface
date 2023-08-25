import ExamService from '@/services/examService';

const state = {
    exams: [],
    currentExam: null,
    examCreationStatus: 'idle'
};

const mutations = {
    SET_EXAMS(state, payload) {
        state.exams = payload;
    },
    SET_CURRENT_EXAM(state, payload) {
        state.currentExam = payload;
    },
    CLEAR_CURRENT_EXAM(state) {
        state.currentExam = null;
    },
    SET_EXAM_CREATION_STATUS(state, status) {
        state.examCreationStatus = status;
    }
};

const actions = {
    async fetchExams({ commit }) {
        try {
            const examsData = await ExamService.findAll();
            commit('SET_EXAMS', examsData.data); // Assuming the data is inside a 'data' property
        } catch (error) {
            console.error('Fetching Exams Error:', error.message);
            throw error;
        }
    },
    async startExam({ commit }, examId) {
        try {
            const examData = await ExamService.findById(examId)
            commit('SET_CURRENT_EXAM', examData.data);
        } catch (error) {
            console.error('Starting Exam Error:', error.message);
            throw error;
        }
    },
    finishExam({ commit }) {
        commit('CLEAR_CURRENT_EXAM');
    },
    async createExam({ commit }, examData) {
        commit('SET_EXAM_CREATION_STATUS', 'creating');
        try {
            await ExamService.create(examData);
            commit('SET_EXAM_CREATION_STATUS', 'success');
        } catch (error) {
            commit('SET_EXAM_CREATION_STATUS', 'error');
            console.error('Creating Exam Error:', error.message);
            throw error;
        }
    }
};

const getters = {
    isExamInProgress(state) {
        return Boolean(state.currentExam);
    },
    examById: (state) => (id) => {
        return state.exams.find((exam) => exam._id === id);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
