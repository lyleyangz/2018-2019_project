import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const missive = () => import('../components/missive.vue');

// const router = new Router
const router = new Router({
  linkActiveClass: "active",
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/missive'
    },
    {
      path: "/missive",
      component: missive
    },
  ]
})



// index
export default router; 

