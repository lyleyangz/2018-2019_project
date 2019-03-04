import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const cardView = (resolve) => {
  import('../components/other/cardView.vue').then((module) => {
    resolve(module)
  })
}

const routerGroup = new Router({
  linkActiveClass: "active",
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/cardView'
    },
    // ============================================= other ===================================================
    // 注册
    {
      path: '/cardView',
      component: cardView,
      meta: {
        title: '卡片',
        keepAlive: false
      },
    }
  ]
})

// 需要缓存的页面有两个设置
// 1、path添加至keepAliveGroup中
// 2、routes中对应的位置将keepAlive设为true
const keepAliveGroup = ['index'];

// 需要每次返回都刷新的页面
const refreshGroup = ['/systemUpgrade'];

// index
export default {
  routerGroup,
  keepAliveGroup,
  refreshGroup
}