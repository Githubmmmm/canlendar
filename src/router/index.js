/*
 * @Description:
 * @Author: zouxm
 * @Date: 2021-05-10 10:48:32
 * @LastEditTime: 2021-05-10 10:51:09
 * @LastEditors: zouxm
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/rl/index.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
