import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import AppVue from '../App.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        component: () => import('@/views/My.vue'),
        children: []
    },
    {
        path: '/video',
        component: () => import('../views/Video.vue')
    },
    {
        path: '/find',
        component: () => import('../views/Find.vue')
    },
    {
        path: '/cloud',
        component: () => import('../views/Cloud.vue')
    },
    {
        path: '/musicitem',
        component: () => import('@/views/MusicItem.vue')
    },
    {
        path: '/search',
        component: () => import('@/views/Search.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    }



]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/home') {
        let token = localStorage.getItem('token')
        if (token) next()
        else next('/login')
    }
    next()
})

export default router