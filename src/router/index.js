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
      redirect: {name: 'main'},
      desc: '上左右整体布局',
      children: [
        { path: '/main', component: _import('main'), name: 'main', desc: '首页' },
        { path: '/ice-screen', component: _import('ice-screen'), name: 'ice-screen', desc: '冰屏' },
        { path: '/vertical-adm', component: _import('vertical-adm'), name: 'vertical-adm', desc: '立式广告机' },
        { path: '/splice-screen', component: _import('splice-screen'), name: 'splice-screen', desc: '拼接屏' },
        { path: '/wall-hanging-adm', component: _import('wall-hanging-adm'), name: 'wall-hanging-adm', desc: '壁挂机' }
      ]
    }
  ]
})
