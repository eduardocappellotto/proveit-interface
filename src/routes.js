import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store'; // Ensure you adjust this import path to point to your Vuex store

import authRoutes from '@/modules/auth/routes';
import examRoutes from '@/modules/exam/routes';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        ...authRoutes,
        ...examRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const allowedRoles = to.meta.allowedRoles;
    let currentUserRole = store.state.auth.user?.role;

    const lsToken = localStorage.getItem('authToken');
    if (lsToken && !currentUserRole) {
        await store.dispatch('auth/validateToken');
        currentUserRole = store.state.auth.user?.role;
    }

    if (requiresAuth && !store.state.auth.user) {
        next('/login');
    } else if (requiresAuth && !allowedRoles.includes(currentUserRole)) {
        return
    } else if (to.path === '/login' && store.state.auth.user) {
        next('/');
    } else {

        next();
    }
});

export default router;
