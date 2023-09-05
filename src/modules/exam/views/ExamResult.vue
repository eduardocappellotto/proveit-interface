<template>
    <v-container v-if="exam && exam.questions && resolution && resolution.answers">
        <v-card class="elevation-12">
            <v-card-title class="headline blue darken-1 white--text">
                {{ exam.title }} - {{ new Date(resolution.finishedAt).toLocaleDateString() }}
            </v-card-title>
            <v-card-text>
                <v-list flat>
                    <v-list-item-group v-for="question in exam.questions" :key="question._id">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="text--darken-2 mb-3"> <strong>{{ question.text
                                }}</strong></v-list-item-title>

                                <v-list-item-subtitle v-for="(option, index) in question.options" :key="index">
                                    <v-chip
                                        v-if="getAnswerIndex(question._id) === index && question.correctOption === index"
                                        color="green lighten-1" outlined>
                                        ✅ {{ option }}
                                    </v-chip>

                                    <v-chip
                                        v-else-if="getAnswerIndex(question._id) === index && question.correctOption !== index"
                                        color="red lighten-1" outlined>
                                        ❌ {{ option }}
                                    </v-chip>

                                    <v-chip v-else class="grey lighten-2 black--text">
                                        {{ option }}
                                    </v-chip>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <v-divider class="my-5"></v-divider>
                <v-row justify="center" class="my-2">
                    <v-chip color="primary darken-1" text-color="white" x-large>
                        Nota Final: {{ resolution.grade.toFixed(2) }}/10.00
                    </v-chip>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script>
import ExamService from '@/services/examService';
import ResolutionService from '@/services/resolutionService';

export default {
    name: 'ExamResult',
    data() {
        return {
            exam: {},
            resolution: {}
        };
    },
    async mounted() {
        try {
            const { data: examData } = await ExamService.findById(this.$route.params.examId);
            this.exam = examData;

            const { data: resolutionData } = await ResolutionService.findById(this.$route.params.resolutionId);
            this.resolution = resolutionData;
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    },
    methods: {
        getAnswerIndex(questionId) {
            const answerObj = this.resolution.answers.find(ans => ans.questionId === questionId);
            return answerObj ? answerObj.answer : null;
        },
        getAnswerValue(questionId) {
            const questionObj = this.exam.questions.find(quest => quest._id === questionId);
            return questionObj.options[questionObj.correctOption]
        },

    }
};
</script>
  
 