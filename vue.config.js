/*
 * @Description:
 * @Author: zouxm
 * @Date: 2021-05-10 10:54:39
 * @LastEditTime: 2021-05-10 10:57:06
 * @LastEditors: zouxm
 */
'use strict'
const path = require('path') //node.js内置的package，用来处理路径的
const resolve = dir => path.join(__dirname, dir) //处理路径的
module.exports = {
    chainWebpack: config => {
        //别名设置
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
        // set svg-sprite-loader
        // 第一步：让其他svg loader不要对src/icons进行操作
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        // 第二步：使用svg-sprite-loader 对 src/icons下的svg进行操作
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
