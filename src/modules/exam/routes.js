const ExamDetails = () => import('./views/ExamDetail')
const ExamResolution = () => import('./views/ExamResolution')
const ExamList = () => import('./views/ExamList.vue')
const ExamResult = () => import('./views/ExamResult.vue')

let examRoutes = [
    {
        path: '/exam-list',
        name: 'ExamList',
        component: ExamList,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO', 'ADMIN'] },
        props: true
    },
    {
        path: '/exam/:examId',
        name: 'ExamDetails',
        component: ExamDetails,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO'] },
        props: true
    },
    {
        path: '/exam/:examId/resolution/:resolutionId',
        name: 'ExamResolution',
        component: ExamResolution,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO'] },
        props: true
    },
    {
        path: '/exam/:examId/resolution/:resolutionId/result',
        name: 'ExamResult',
        component: ExamResult,
        meta: { requiresAuth: true, allowedRoles: ['ALUNO', 'ADMIN'] },
        props: true
    },
]

export default examRoutes