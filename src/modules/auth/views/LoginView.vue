<template>
    <div>
        <v-container fill-height>

            <v-row class="mt-10" justify="center" align="center">

                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <LoginForm @login-success="handleLoginSuccess" />
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
    components: {
        LoginForm
    },
    methods: {
        handleLoginSuccess() {
            this.$router.push({ name: 'ExamList' });
        }
    }
};
</script>

<style scoped></style>
