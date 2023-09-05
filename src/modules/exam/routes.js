
const ExamResolution = () => import('./views/ExamResolution')
const ExamList = () => import('./views/ExamList.vue')
const ExamResult = () => import('./views/ExamResult.vue')
const ResolutionList = () => import('./views/ResolutionList.vue')
const CreateExam = () => import('./views/CreateExam.vue')


let examRoutes = [
    {
        path: '/resolution-list',
        name: 'ResolutionList',
        component: ResolutionList,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO', 'ADMIN'], headerText: 'Lista de Resoluções' },
        props: true
    },
    {
        path: '/exam-list',
        name: 'ExamList',
        component: ExamList,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO', 'ADMIN'], headerText: 'Lista de Avaliações' },
        props: true
    },
    {
        path: '/create-exam',
        name: 'CreateExam',
        component: CreateExam,
        meta: { requiresAuth: true, allowedRoles: ['ADMIN'], headerText: 'Criar avaliação' },
        props: true
    },
    {
        path: '/exam/:examId/resolution/:resolutionId?',
        name: 'ExamResolution',
        component: ExamResolution,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO', 'ADMIN'], headerText: 'Resolução de Avaliação' },
        props: true
    },
    {
        path: '/exam/:examId/resolution/:resolutionId/result',
        name: 'ExamResult',
        component: ExamResult,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO', 'ADMIN'], headerText: 'Resultado de Avaliação' },
        props: true
    },
]

export default examRoutes