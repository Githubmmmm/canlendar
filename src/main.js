/*
 * @Description:
 * @Author: zouxm
 * @Date: 2021-05-10 10:48:32
 * @LastEditTime: 2021-05-10 10:59:11
 * @LastEditors: zouxm
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons' // icon
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
