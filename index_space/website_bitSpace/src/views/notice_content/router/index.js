import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const szyw_news_1 = () => import('../components/szyw/news_1.vue');
const szyw_news_2 = () => import('../components/szyw/news_2.vue');
const szyw_news_3 = () => import('../components/szyw/news_3.vue');
const szyw_news_4 = () => import('../components/szyw/news_4.vue');
const szyw_news_5 = () => import('../components/szyw/news_5.vue');
const szyw_news_6 = () => import('../components/szyw/news_6.vue');
const szyw_news_7 = () => import('../components/szyw/news_7.vue');
const szyw_news_8 = () => import('../components/szyw/news_8.vue');
const szyw_news_9 = () => import('../components/szyw/news_9.vue');
const szyw_news_10 = () => import('../components/szyw/news_10.vue');
const szyw_news_11 = () => import('../components/szyw/news_11.vue');
const szyw_news_12 = () => import('../components/szyw/news_12.vue');
const szyw_news_13 = () => import('../components/szyw/news_13.vue');
const szyw_news_14 = () => import('../components/szyw/news_14.vue');
const szyw_news_15 = () => import('../components/szyw/news_15.vue');
const szyw_news_16 = () => import('../components/szyw/news_16.vue');

const gjzc_news_1 = () => import('../components/gjzc/news_1.vue');
const gjzc_news_2 = () => import('../components/gjzc/news_2.vue');
const gjzc_news_3 = () => import('../components/gjzc/news_3.vue');
const gjzc_news_4 = () => import('../components/gjzc/news_4.vue');
const gjzc_news_5 = () => import('../components/gjzc/news_5.vue');
const gjzc_news_6 = () => import('../components/gjzc/news_6.vue');
const gjzc_news_7 = () => import('../components/gjzc/news_7.vue');
const gjzc_news_8 = () => import('../components/gjzc/news_8.vue');
const gjzc_news_9 = () => import('../components/gjzc/news_9.vue');
const gjzc_news_10 = () => import('../components/gjzc/news_10.vue');
const gjzc_news_11 = () => import('../components/gjzc/news_11.vue');
const gjzc_news_12 = () => import('../components/gjzc/news_12.vue');
const gjzc_news_13 = () => import('../components/gjzc/news_13.vue');

// const router = new Router
const router = new Router({
  linkActiveClass: "active",
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/szyw_news_1'
    },
    {
      path: "/szyw_news_1",
      component: szyw_news_1
    },
    {
      path: "/szyw_news_2",
      component: szyw_news_2
    },
    {
      path: "/szyw_news_3",
      component: szyw_news_3
    },
    {
      path: "/szyw_news_4",
      component: szyw_news_4
    },
    {
      path: "/szyw_news_5",
      component: szyw_news_5
    },
    {
      path: "/szyw_news_6",
      component: szyw_news_6
    },
    {
      path: "/szyw_news_7",
      component: szyw_news_7
    },
    {
      path: "/szyw_news_8",
      component: szyw_news_8
    },
    {
      path: "/szyw_news_9",
      component: szyw_news_9
    },
    {
      path: "/szyw_news_10",
      component: szyw_news_10
    },
    {
        path: "/szyw_news_11",
        component: szyw_news_11
      },
      {
        path: "/szyw_news_12",
        component: szyw_news_12
      },
      {
        path: "/szyw_news_13",
        component: szyw_news_13
      },
      {
        path: "/szyw_news_14",
        component: szyw_news_14
      },
      {
        path: "/szyw_news_15",
        component: szyw_news_15
      },
      {
        path: "/szyw_news_16",
        component: szyw_news_16
      },

    {
      path: "/gjzc_news_1",
      component: gjzc_news_1
    },
    {
      path: "/gjzc_news_2",
      component: gjzc_news_2
    },
    {
      path: "/gjzc_news_3",
      component: gjzc_news_3
    },
    {
      path: "/gjzc_news_4",
      component: gjzc_news_4
    },
    {
      path: "/gjzc_news_5",
      component: gjzc_news_5
    },
    {
      path: "/gjzc_news_6",
      component: gjzc_news_6
    },
    {
      path: "/gjzc_news_7",
      component: gjzc_news_7
    },
    {
      path: "/gjzc_news_8",
      component: gjzc_news_8
    },
    {
      path: "/gjzc_news_9",
      component: gjzc_news_9
    },
    {
      path: "/gjzc_news_10",
      component: gjzc_news_10
    },
    {
        path: "/gjzc_news_11",
        component: gjzc_news_11
    },
    {
      path: "/gjzc_news_12",
      component: gjzc_news_12
    },
    {
      path: "/gjzc_news_13",
      component: gjzc_news_13
    },


  ]
})



// index
export default router; 

