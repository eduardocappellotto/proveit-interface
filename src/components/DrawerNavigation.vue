<template>
    <v-navigation-drawer v-model="drawer" v-if="isAuthenticated" app>
        <v-list class="d-flex flex-column justify-space-between mt-10" dense>
            <v-list-item-group>
                <v-list-item to="/exam-list">
                    <v-list-item-content>
                        <v-list-item-title>Avaliações</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/resolution-list">
                    <v-list-item-content>
                        <v-list-item-title>Resoluções</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="isAdmin" to="/create-exam">
                    <v-list-item-content>
                        <v-list-item-title>
                            Criar exame
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                    <v-list-item-content>
                        <v-list-item-title>
                            Sair
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

    </v-navigation-drawer>
</template>
  
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'DrawerNavigation',

    computed: {
        ...mapState('auth', ['isAuthenticated', 'user']),
        ...mapState(['drawer']),

        isAdmin() {
            return this.user && this.user.role === 'ADMIN';
        },

    },

    methods: {
        ...mapActions('auth', ['logout'])
    }
};
</script>
 