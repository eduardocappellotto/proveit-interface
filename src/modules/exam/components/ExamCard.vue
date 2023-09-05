<template>
    <v-card class="ma-2 elevation-4">
        <v-card-title>{{ exam.title }}</v-card-title>
        <v-card-subtitle>{{ exam.questionCount }} questões</v-card-subtitle>
        <v-card-actions>
            <v-btn text @click="showDialog = true" color="primary">Resolução</v-btn>
            <v-btn v-if="isAdmin" text @click="togglePublish" :color="exam.isPublished ? 'red' : 'green'">
                {{ exam.isPublished ? 'Des-publicar' : 'Publicar' }}
            </v-btn>
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
        <v-snackbar v-model="showSuccess" :timeout="5000" color="success">
            {{ successMessage }}
            <v-btn text @click="showSuccess = false">X</v-btn>
        </v-snackbar>
    </v-card>
</template>
  
<script>
import { mapActions } from 'vuex'
import ResolutionService from '@/services/resolutionService';
import ExamService from '@/services/examService';

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

            showSuccess: false,
            successMessage: '',
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.auth.user.role === 'ADMIN';
        }
    },
    methods: {
        ...mapActions('exam', ['fetchExams']),
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
        },
        showSuccessMessage(message) {
            this.successMessage = message;
            this.showSuccess = true;
        },
        async togglePublish() {
            try {
                await ExamService.publishOrUnpublishExam(this.exam._id, !this.exam.isPublished);

                if (!this.exam.isPublished) {
                    this.showSuccessMessage("Avaliação publicada! Agora os alunos podem resolvê-la")
                } else {
                    this.showSuccessMessage("Avaliação des-publicada! Alunos não poderão resolvê-la mais!")
                }
                this.fetchExams()
            } catch (error) {
                this.showErrorMessage('Erro ao alterar o status da prova.');
            }
        }
    }
}
</script>
  
<style scoped></style>
