import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const main = () => import('../components/main.vue');

// const router = new Router
const router = new Router({
  linkActiveClass: "active",
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: "/main",
      component: main
    },
  ]
})



// index
export default router; 

