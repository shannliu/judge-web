import Vue from 'vue'
import Router from 'vue-router'
import contests from '../pages/contents/contests'
import problem from '../pages/problem/problem'
import contestDetail from '../pages/contents/contestsDetail'
import iView from 'iview'
import problemList from "../pages/problem/problemList";
import ranking from "../pages/user/ranking";
Vue.use(Router)
Vue.use(iView)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/problems',
      name: 'problem',
      component: problemList
    },
    {
      path: '/contests',
      name: 'contests',
      component: contests
    },
    {
      name: 'problemDetail',
      path: '/problem/:problemID',
      component: problem
    },
    {
      name: 'contestsDetail',
      path: '/contests/:contestID',
      component: contestDetail
    },
    {
      name: 'ranking',
      path: '/ranking',
      component: ranking
    }
  ]
})
// 注册全局消息提示
Vue.prototype.$Message.config({
  duration: 2
})
Vue.prototype.$error = (s) => Vue.prototype.$Message.error(s)
Vue.prototype.$info = (s) => Vue.prototype.$Message.info(s)
Vue.prototype.$success = (s) => Vue.prototype.$Message.success(s)
