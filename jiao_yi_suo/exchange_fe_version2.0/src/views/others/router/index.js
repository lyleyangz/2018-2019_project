import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 注册协议
const forgetLoginPassword = (resolve) => {
    import('../components/forgetLoginPassword.vue').then((module) => {
      resolve(module)
    })
}
// 登录页
const login = (resolve) => {
  import('../components/login.vue').then((module) => {
    resolve(module)
  })
}
// 注册页
const register = (resolve) => {
  import('../components/register.vue').then((module) => {
    resolve(module)
  })
}
// const router = new Router
const routerList = new Router({
  linkActiveClass: "active",
  mode: "hash",
  routes: [
      {
        path:'/',
        redirect:'/login'
      },
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
        path: '/forgetLoginPassword',
        name: 'forgetLoginPassword',
        component: forgetLoginPassword
      },
      {
        path: '/register',
        name: 'register',
        component: register
      }
  ]
})
// index
export default routerList; 

