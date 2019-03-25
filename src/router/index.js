import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./import-' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: _import('login'), name: 'login', desc: '登陆' },
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: {name: 'home'},
      desc: '上左右整体布局',
      children: [
        { path: '/home', component: _import('home'), name: 'home', desc: '首页', meta: {auth: true} },
        { path: '/ice-screen', component: _import('ice-screen'), name: 'ice-screen', desc: '冰屏', meta: {auth: true} },
        { path: '/vertical-adm', component: _import('vertical-adm'), name: 'vertical-adm', desc: '立式广告机', meta: {auth: true} },
        { path: '/splice-screen', component: _import('splice-screen'), name: 'splice-screen', desc: '拼接屏', meta: {auth: true} },
        { path: '/protrait', component: _import('protrait'), name: 'protrait', desc: '画像屏', meta: {auth: true} },
        { path: '/wall-hanging-adm', component: _import('wall-hanging-adm'), name: 'wall-hanging-adm', desc: '壁挂机', meta: {auth: true} }
      ],
      beforeEnter (to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
          next({ name: 'login' })
        }
        next()
      }
    }
  ]
})
