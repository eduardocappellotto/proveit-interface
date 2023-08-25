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

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const allowedRoles = to.meta.allowedRoles;
    const currentUserRole = store.state.user.user?.role;

    if (requiresAuth && !store.state.user.user) {
        next('/login');
    } else if (requiresAuth && !allowedRoles.includes(currentUserRole)) {
        next('/unauthorized'); // Redirect to an unauthorized page or dashboard, as appropriate
    } else if (to.path === '/login' && store.state.user.user) {
        next('/');
    } else {
        next();
    }
});

export default router;
