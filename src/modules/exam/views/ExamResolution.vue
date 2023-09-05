<template>
    <v-container>
        <div>
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-progress-linear :value="progress" color="primary"></v-progress-linear>
                    <v-card class="px-4 py-6">
                        <v-card-text>
                            Tempo Restante: {{ minutes }}m {{ seconds }}s
                            <div v-for="(question, index) in exam.questions" :key="index">
                                <h2>{{ question.text }}</h2>
                                <v-radio-group v-model="answers[index]" :disabled="isSubmitted">
                                    <v-radio v-for="(option, oIndex) in question.options" :key="oIndex" :label="option"
                                        :value="oIndex">
                                    </v-radio>

                                </v-radio-group>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn v-if="!isSubmitted" color="primary" :disabled="!isExamComplete"
                                @click="submitResolution">Terminar
                                Prova</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
  
<script>
import { mapState } from 'vuex';
import ResolutionService from '@/services/resolutionService';
import ExamService from '@/services/examService';

export default {
    data() {
        return {
            resolutionStarted: false,
            isSubmitted: false,
            startedAt: null,
            exam: null,
            answers: [],
            grade: null,
            timer: null,
            totalTime: 0,
            minutes: 0,
            seconds: 0,
        };
    },
    computed: {
        ...mapState({
            user: (state) => state.auth.user,
        }),
        progress() {
            if (this.exam) {
                return ((this.exam.questions.length * 2 * 60 - this.totalTime) / (this.exam.questions.length * 2 * 60)) * 100;
            } return 0
        },
        correctAnswers() {
            if (!this.exam) return [];
            return this.exam.questions.map(q => q.correctOption);
        },
        isExamComplete() {
            return this.answers.every(answer => answer !== null);
        }
    },
    async created() {
        try {
            const { data } = await ExamService.findById(this.$route.params.examId)
            this.exam = data
            this.answers = new Array(this.exam.questions.length).fill(null);

            const { data: examData } = await ResolutionService.findById(this.$route.params.resolutionId)


            if (examData.finishedAt) {
                this.$router.push(`/exam/${this.$route.params.examId}/resolution/${this.$route.params.resolutionId}/result`)
            }
            this.startedAt = new Date(examData.startedAt);
            this.startTimer();
        } catch (error) {
            // Trata erro
        }

    },
    methods: {

        cancel() {
            this.$router.go(-1);
        },
        startTimer() {
            const currentTime = new Date();
            const timeElapsed = Math.floor((currentTime - this.startedAt) / 1000); // Time elapsed in seconds
            this.totalTime = (this.exam.questions.length * 2 * 60) - timeElapsed;
            this.timer = setInterval(this.countdown, 1000);
        },
        countdown() {
            if (this.totalTime <= 0) {
                clearInterval(this.timer);

                this.submitResolution();
                return;
            }

            this.totalTime--;

            this.minutes = Math.floor(this.totalTime / 60);
            this.seconds = this.totalTime % 60;
        },
        async submitResolution() {
            clearInterval(this.timer);

            try {
                this.answers = this.answers.map((answer, index) => {
                    if (answer === null) {
                        // We'll get a wrong answer for the question
                        return this.getWrongAnswerForQuestion(this.exam.questions[index]);
                    }
                    return answer;
                });
                const payload = this.exam.questions.map((question, index) => {
                    return {
                        questionId: question._id,
                        answer: this.answers[index]
                    };
                });

                const { data } = await ResolutionService.finishResolution(this.$route.params.resolutionId, { answers: payload });

                this.grade = data.grade
                this.isSubmitted = true;
            } catch (error) {
                console.error("Failed to submit resolution:", error);
            }

            this.$router.push(`/exam/${this.$route.params.examId}/resolution/${this.$route.params.resolutionId}/result`)
        },
        getWrongAnswerForQuestion(question) {
            const correctAnswer = question.correctOption;
            for (let i = 0; i < question.options.length; i++) {
                if (i !== correctAnswer) {
                    return i;
                }
            }
            console.error("Couldn't find a wrong answer for question:", question._id);
            return 0;
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
    }
}
</script>
  