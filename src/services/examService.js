import api from './api';

class ExamService {

    constructor() { }

    async findAll(isPublished) {
        try {
            const response = await api.get('/exams', { params: { isPublished } });
            return response.data;
        } catch (error) {
            console.error("Error fetching all exams:", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const response = await api.get(`/exams/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching exam with ID ${id}:`, error);
            throw error;
        }
    }

    async create(exam) {
        try {
            const response = await api.post('/exams', exam);
            return response.data;
        } catch (error) {
            console.error("Error creating exam:", error);
            throw error;
        }
    }


    async publishOrUnpublishExam(id, shouldPublish) {
        try {
            const response = await api.put(`/exams/${id}/publish`, { shouldPublish });
            return response.data;
        } catch (error) {
            console.error(`Error updating publish status for exam with ID ${id}:`, error);
            throw error;
        }
    }


    async softDelete(id) {
        try {
            const response = await api.delete(`/exams/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error soft deleting exam with ID ${id}:`, error);
            throw error;
        }
    }
}

export default new ExamService();
