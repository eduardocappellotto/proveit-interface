<template>
    <v-container fluid>
        <v-row class="justify-center">
            <v-col v-for="resolution in resolutions" :key="resolution._id" cols="12" md="10" lg="8"
                :style="{ 'max-width': '480px' }">
                <v-card class="ma-2 elevation-4">
                    <v-card-title>
                        <span class="headline">{{ resolution.examId.title }}</span>
                    </v-card-title>
                    <v-card-subtitle>
                        Resolvido em: {{ new Date(resolution.finishedAt).toLocaleDateString() }}
                    </v-card-subtitle>
                    <v-card-text>
                        Questões: {{ resolution.examId.questions.length }}
                        <br>
                        Nota: {{ resolution.grade.toFixed(2) }}/10.00
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :to="`/exam/${resolution.examId._id}/resolution/${resolution._id}/result`"
                            color="blue darken-1" text>
                            Ver Detalhes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ResolutionService from '@/services/resolutionService';

export default {
    name: 'ResolutionList',
    data() {
        return {
            resolutions: []
        };
    },
    async mounted() {
        try {
            const userId = this.$store.state.auth.user.id;
            const { data } = await ResolutionService.listByUserId(userId);
            this.resolutions = data;
        } catch (error) {
            console.error('Failed to fetch resolutions:', error);
        }
    }
};
</script>
  