const LoginView = () => import('./views/LoginView.vue')
const RegisterUserView = () => import('./views/RegisterUserView.vue')

let authRoutes = [
    {
        path: '/login',
        name: 'Login',
        meta: { headerText: 'Sistema de Avaliações' },
        component: LoginView
    },
    {
        path: '/Register',
        name: 'Register',
        meta: { requiresAuth: true, allowedRoles: ['ADMIN'] },
        component: RegisterUserView
    }
];

export default authRoutes