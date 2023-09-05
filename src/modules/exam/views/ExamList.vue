<template>
    <v-container fluid>
        <v-row class="justify-center">
            <v-col v-for="(exam, index) in exams" :key="index" cols="12" md="10" lg="8" :style="{ 'max-width': '480px' }">
                <ExamCard :exam="exam" />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'ExamList',
    components: {
        ExamCard: () => import('../components/ExamCard.vue')
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('exam', ['exams']),
        ...mapState('auth', ['user'])
    },
    created() {
        let fetchPublished = this.user.role === 'ALUNO' ? true : null
        // Fetches all exams when is an ADMIN user, fetches only published when its a ALUNO user.

        this.fetchExams(fetchPublished)
    },
    methods: {
        ...mapActions('exam', ['fetchExams']),
        resolveColor(status) {
            let statusLiteral = {
                'available': 'green'
            }

            return statusLiteral[status] || 'green'
        }
    }
};
</script>
  
<style scoped>
.exam-list {
    padding: 16px;
}
</style>
  