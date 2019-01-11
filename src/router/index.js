import Vue from 'vue'
import Router from 'vue-router'
import contests from '../pages/contents/contests'
import problem from '../pages/problem/problem'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'problem',
      component: problem
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
    }
  ]
})
