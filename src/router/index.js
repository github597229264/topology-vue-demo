import Vue from 'vue'
import Router from 'vue-router'
import RuleChainDemo from '@/components/RuleChainDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RuleChainDemo',
      component: RuleChainDemo
    }
  ]
})
