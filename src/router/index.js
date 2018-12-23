import Vue from 'vue'
import Router from 'vue-router'
import problemList from '../pages/problem/problemList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'problem',
      component: problemList
    }
  ]
})
