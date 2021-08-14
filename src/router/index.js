import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Auth',
        props: true,
        component: () => import('../components/Auth'),
        meta: {
            auth: false
        }
    },
    {
        path: '/main',
        name: 'Main',
        props: true,
        component: () => import('../components/StartStop'),
        meta: {
            auth: true
        }
    },
    {
        path: '/settings',
        namel: 'Settings',
        props: true,
        component: () => import('../components/Settings'),
        meta: {
            auth: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes
})

router.beforeEach((to, from, next) => {
    console.log(from)
    console.log(to)
    next()
})

export default router