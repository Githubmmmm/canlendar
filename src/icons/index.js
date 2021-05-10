/*
 * @Description: Joker desc
 * @Author: Joker
 * @Date: 2020-11-10 17:07:25
 * @LastEditTime: 2021-05-10 10:58:33
 * @LastEditors: zouxm
 */
import Vue from 'vue'
import SvgIcon from '@/components/svgicon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
