// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
// import QS from 'qs'
Vue.config.productionTip = false
Vue.use(iView)

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.axios = axios
// Vue.prototype.QS = QS
axios.defaults.withCredentials = true // 允许axios请求携带cookie等凭证

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})
