<template>
  <v-app>
    <DrawerNavigation />
    <v-app-bar app>
      <v-app-bar-nav-icon @click="updateDrawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        {{ $route.meta.headerText }}
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DrawerNavigation from '@/components/DrawerNavigation.vue';
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    DrawerNavigation
  },

  data: () => ({
  }),
  methods: {
    ...mapActions(['updateDrawer'])
  }
};
</script>
<style>
.v-app-bar-title__content {
  text-overflow: clip;
}
</style>