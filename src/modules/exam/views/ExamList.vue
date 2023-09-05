<template>
    <v-container>
        <div v-for="(exam, index) in exams" :key="index">
            <ExamCard :exam="exam" />
        </div>
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
        this.fetchExams(null)
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
  