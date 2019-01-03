import Vue from 'vue'
import Router from 'vue-router'
import problemList from '../pages/problem/problemList'
import contests from '../pages/contents/contests'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'problem',
      component: problemList
    },
    {
      path: '/contests',
      name: 'contests',
      component: contests
    }
  ]
})
