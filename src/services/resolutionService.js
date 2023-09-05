import api from './api';

class ResolutionService {

    constructor() { }

    async listByUserId(id) {
        try {
            const response = await api.get(`/resolutions/list/${id}`,);
            return response.data;
        } catch (error) {
            console.error("Error starting resolution:", error);
            throw error;
        }
    }

    async startResolution(resolutionPayload) {
        try {
            const response = await api.post('/resolutions/start', resolutionPayload);
            return response.data;
        } catch (error) {
            console.error("Error starting resolution:", error);
            throw error;
        }
    }

    async finishResolution(resolutionId, finishDto) {
        try {
            const response = await api.put(`/resolutions/finish/${resolutionId}`, finishDto);
            return response.data;
        } catch (error) {
            console.error("Error finishing resolution:", error);
            throw error;
        }
    }

    async findById(resolutionId) {
        try {
            const response = await api.get(`/resolutions/${resolutionId}`, resolutionId);
            return response.data;
        } catch (error) {
            console.error("Error finishing resolution:", error);
            throw error;
        }
    }
}

export default new ResolutionService();
