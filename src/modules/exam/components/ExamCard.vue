<template>
    <v-card class="mb-4">

        <v-card-title>{{ exam.title }}</v-card-title>
        <v-card-subtitle>{{ exam.questionCount }} questões</v-card-subtitle>
        <v-card-actions>
            <v-btn text @click="showDialog = true" color="primary">Resolução</v-btn>
        </v-card-actions>

        <v-dialog v-model="showDialog" max-width="500">
            <v-card>
                <v-card-title>Confirmar</v-card-title>
                <v-card-text>Deseja iniciar a avalição?</v-card-text>
                <v-card-actions>
                    <v-btn text @click="showDialog = false">Cancelar</v-btn>
                    <v-btn color="primary" text @click="startExam">Iniciar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="showError" :timeout="5000" color="error">
            {{ errorMessage }}
            <v-btn text @click="showError = false">X</v-btn>
        </v-snackbar>
    </v-card>
</template>
  
<script>
import ResolutionService from '@/services/resolutionService';

export default {
    name: 'ExamCard',
    props: {
        exam: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showDialog: false,
            showError: false,
            errorMessage: '',
        }
    },
    methods: {
        goToExam(resId) {
            this.$router.push(`/exam/${this.exam._id}/resolution/${resId}`)
        },
        async startExam() {
            this.showDialog = false;
            try {

                const payload = {
                    examId: this.exam._id,
                    userId: this.$store.state.auth.user.id
                };

                const { data } = await ResolutionService.startResolution(payload)

                this.goToExam(data._id)

            } catch (error) {

                if (error.response && error.response.status === 400) {
                    this.showErrorMessage(error.response.data.message);
                }
            }
        },
        showErrorMessage(message) {
            this.errorMessage = message;
            this.showError = true;
        }
    }
}
</script>
  
<style scoped></style>
  