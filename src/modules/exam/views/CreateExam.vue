<template>
    <v-container class="create-exam">


        <v-text-field v-model="exam.title" label="Título da Avaliação" outlined dense />

        <v-expansion-panels class="mb-6">
            <v-expansion-panel v-for="(question, index) in exam.questions" :key="index">
                <v-expansion-panel-header>
                    {{ question.text || 'Nova Pergunta' }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-text-field v-model="question.text" :label="'Pergunta ' + (index + 1)" outlined dense />

                    <v-row v-for="(option, optIndex) in question.options" :key="optIndex">
                        <v-col cols="10">
                            <v-text-field v-model="question.options[optIndex]" :label="'Opção ' + (optIndex + 1)" outlined
                                dense />
                        </v-col>
                        <v-col cols="2">
                            <v-radio-group v-model="question.correctOption" row>
                                <v-radio :value="optIndex" label="Correta" />
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-btn @click="addQuestion" color="blue darken-2" class="ma-2 white--text">Nova Pergunta</v-btn>
        <v-btn :disabled="!hasAtLeastOneCompletedQuestion" color="green darken-1" @click="createExam"
            class="ma-2 white--text">Criar Avaliação</v-btn>

    </v-container>
</template>
  
<script>
import ExamService from "@/services/examService";

export default {
    data() {
        return {
            exam: {
                title: "",
                questions: [
                    {
                        text: "",
                        options: ["", "", "", "", ""],
                        correctOption: null
                    }
                ]
            }
        };
    },
    computed: {
        hasAtLeastOneCompletedQuestion() {
            return this.exam.questions[0].correctOption !== null
        }
    },
    methods: {
        addQuestion() {
            this.exam.questions.push({
                text: "",
                options: ["", "", "", "", ""],
                correctOption: null
            });
        },
        async createExam() {
            try {
                await ExamService.create(this.exam);
                this.$router.push("/exam-list"); // Redirect or show a success message
            } catch (error) {
                console.error("Error creating exam:", error);
            }
        }
    }
};
</script>
  
<style scoped>
.create-exam {
    max-width: 800px;
    margin: 0 auto;
}
</style>
  