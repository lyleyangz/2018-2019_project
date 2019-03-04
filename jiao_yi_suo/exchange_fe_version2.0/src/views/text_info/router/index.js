import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@common/i18n';

let locale = localStorage.getItem('JYS_lang') || 'ZHS';
let mes = i18n.messages[locale].markedWorks;

Vue.use(Router)
// 注册协议
const agreement = (resolve) => {

    import('./../components/agreement/agreement_'+locale+'.vue').then((module) => {
      resolve(module)
    })
}
// 法律声明
const lawDeclare = (resolve) => {
    import('./../components/lawdeclare/lawDeclare_'+locale+'.vue').then((module) => {
      resolve(module)
    })
}
// 常见问题 commonQuestion
const commonQuestion = (resolve) => {
    import('./../components/commonQuestion/commonQuestion_'+locale+'.vue').then((module) => {
      resolve(module)
    })
}
// 关于我们 AboutUs
const AboutUs = (resolve) => {
    import('./../components/AboutUs/AboutUs_'+locale+'.vue').then((module) => {
      resolve(module)
    })
}
// 联系我们 contactUs
const contactUs = (resolve) => {
    import('./../components/contactUs/contactUs_'+locale+'.vue').then((module) => {
      resolve(module)
    })
}
// 费用说明 costDescription
const costDescription = (resolve) => {
    import('./../components/costDescription/costDescription_'+locale+'.vue').then((module) => {
      resolve(module)
    })
}
// 新手指引 noviceGuide
const noviceGuide = (resolve) => {
    import('./../components/noviceGuide/noviceGuide_'+locale+'.vue').then((module) => {
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
        redirect:'/agreement'
      },
    {
      path: "/agreement",
      component: agreement
    },
    {
        path:"/lawDeclare",
        component:lawDeclare
    },
    {
        path:"/commonQuestion",
        component:commonQuestion
    },
    {
        path:"/AboutUs",
        component:AboutUs
    },
    {
        path:"/contactUs",
        component:contactUs
    },
    {
        path:"/costDescription",
        component:costDescription
    },
    {
        path:"/noviceGuide",
        component:noviceGuide
    },
  ]
})
// index
export default routerList; 

