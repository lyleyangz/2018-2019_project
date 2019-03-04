import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const list = () => import('../components/list.vue');
const noticeDetail = () => import('../components/noticeDetail.vue');

// const router = new Router
const router = new Router({
  linkActiveClass: "active",
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: "/list",
      component: list
    },
    {
      path: '/noticeDetail/:id',
      component: noticeDetail,
      name: 'noticeDetail'
    }
  ]
})



// index
export default router; 

