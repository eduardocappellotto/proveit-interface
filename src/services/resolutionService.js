import api from './api';

class ResolutionService {

    constructor() { }

    async startResolution(startDto) {
        try {
            const response = await api.post('/resolutions/start', startDto);
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
}

export default new ResolutionService();
