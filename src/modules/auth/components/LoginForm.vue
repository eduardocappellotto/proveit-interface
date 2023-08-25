<template>
    <v-form v-model="valid" ref="form" @submit.prevent="loginUser">
        <label for="password">Matrícula</label>
        <v-text-field dense outlined v-model="registration" required></v-text-field>

        <label for="password">Senha</label>
        <v-text-field dense outlined v-model="password" type="password" required></v-text-field>

        <v-btn type="submit" color="primary">Login</v-btn>
        <v-alert class="mt-6" v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
    </v-form>
</template>
  
<script>
import AuthService from '@/services/authService';

export default {
    data() {
        return {
            registration: '',
            password: '',
            valid: true,
            errorMessage: ''
        };
    },
    methods: {
        async loginUser() {
            if (this.$refs.form.validate()) {
                try {
                    const response = await AuthService.login(this.registration, this.password);
                    // Here you can store the token wherever you prefer (e.g., Vuex store, cookies, etc.)
                    this.$emit('login-success', response.token);  // Notify parent component of successful login
                } catch (error) {
                    this.errorMessage = "Error logging in. Please try again.";
                }
            }
        }
    }
};
</script>
  