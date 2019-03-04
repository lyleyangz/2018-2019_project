import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 头部
export const Header = {
  path: '/',
  redirect: '/homepage',
  meta: {
      title: 'Header - 权盾头部'
  },
  children:[
    {
      //注册
      path:'/header/registerRouter',
      name: 'registerRouter',
      meta: {
        title: 'registerRouter - 注册'
      },
      component: () => import('@/views/index/register/register.vue')
    },
    {
      // 地址查询内容
      path:'/header/myCopyright',
      name: 'myCopyright',
      meta: {
        title: 'myCopyright - 我的版权查询结果'
      },
      component: () => import('@/views/index/myCopyright/myCopyright.vue')
  },
  {
    //添加原创
    path:'/header/addOriginal',
    name: 'addOriginal',
    meta: {
      title: 'addOriginal - 添加原创'
    },
    component: () => import('@/views/index/addOriginal/addOriginal.vue')
  },
  {
    // 文章详情
    path:'/header/articleDetails',
    name: 'articleDetails',
    meta: {
      title: 'articleDetails - 添加原创'
    },
    component: () => import('@/views/index/articleDetails/articleDetails.vue')
  }
    
  ],
  component: () => import('@/views/index/header/header.vue')
};
// 登录模块
export const loginRouter = {
  path:'/login',
  name: 'login',
  meta: {
    title: 'login - 登录'
  },
  component: () => import('@/views/index/login/login.vue')
}
// 注册footer模块
export const footerRouter = {
  path:'/footer',
  name: 'footer',
  meta: {
    title: 'registerRouter - 注册'
  },
  component: () => import('@/views/index/footer/footer.vue')
}
// explorer公共模块search
export const searchRouter = {
  // 地址查询内容
  path:'/search',
  name: 'search',
  meta: {
    title: 'search - 搜索'
  },
  component: () => import('@/views/index/search/search.vue')
}
// 首页
export const homepageRouter = {
  // 首页
  path:'/homepage',
  name: 'homepage',
  meta: {
    title: 'homepage - 首页'
  },
  component: () => import('@/views/index/homepage/homepage.vue')
}
//   // 文章详情
// export const articleDetails = 
// {
//     // 地址查询内容
//     path:'/articleDetails',
//     name: 'articleDetails',
//     meta: {
//       title: 'articleDetails - 添加原创'
//     },
//     component: () => import('@/views/index/articleDetails/articleDetails.vue')
//   }
export const constantRouterMap = [
  Header,
  // myCopyright,
  loginRouter,
  footerRouter,
  searchRouter,
  homepageRouter,
  // addOriginal,
  // articleDetails
]
export default new Router({
  // mode: 'history',
  routes: constantRouterMap
  // scrollBehavior
})