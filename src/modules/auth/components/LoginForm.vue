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
import { mapActions } from 'vuex';

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
        ...mapActions('auth', {
            login: 'login',
        }
        ), // Note how we're mapping actions here

        async loginUser() {
            if (this.$refs.form.validate()) {
                try {
                    const credentials = {
                        registration: this.registration,
                        password: this.password
                    };
                    await this.login(credentials); // Directly call the mapped action
                    this.$emit('login-success');
                } catch (error) {
                    this.errorMessage = error.message;  // Adjust this to get a more user-friendly message
                }
            }
        }
    }
};
</script>

  