// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCookie from 'vue-cookie'
import router from './router'
import VueResource from 'vue-resource'
import '@/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/iconfont.css'

Vue.use(VueCookie)
Vue.use(VueResource)
Vue.http.options.headers = {
  'Content-Type': 'application/text; charset=UTF-8'
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
