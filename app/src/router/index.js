import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return {selector: to.hash}
        if (savedPosition) return savedPosition

        return {x: 0, y: 0}
    },
    routes: [
        {path: '/', redirect: '/user'},
        {
            path: '/user',
            component: () => import('@/layouts/user/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'Connection',
                    component: () => import('@/views/connection/Index.vue')
                },
            ],
        },
        {
            path: '/game',
            name: 'Game',
            component: () => import('@/layouts/game/Index.vue'),
        },
        {
            path: '/app',
            component: () => import('@/layouts/app/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'AppConnection',
                    component: () => import('@/views/connection/Index')
                },
                {
                    path: 'game',
                    name: 'AppGame',
                    component: () => import('@/components/app/game/Index.vue')
                }
            ]
        }
    ]
})

export default router