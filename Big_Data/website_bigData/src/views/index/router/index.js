import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 首页
const home = (resolve) => {
    import('../components/home.vue').then((module) => {
        resolve(module)
    })
}
// 大数据新闻
const bigdatanews = (resolve) => {
    import('../components/bigdatanews/index.vue').then((module) => {
        resolve(module)
    })
}
// 国家政策
const nationalpolicy = (resolve) => {
    import('../components/nationalpolicy/index.vue').then((module) => {
        resolve(module)
    })
}
// 公司公告
const companyannouncement = (resolve) => {
    import('../components/companyannouncement/index.vue').then((module) => {
        resolve(module)
    })
}

// 百问百答
const interlocution = (resolve) => {
    import('../components/interlocution/index.vue').then((module) => {
        resolve(module)
    })
}

// 会员名录
const membership = (resolve) => {
    import('../components/membership/list.vue').then((module) => {
        resolve(module)
    })
}

// 会员详情
const membershipDetails = (resolve) => {
    import('../components/membership/details.vue').then((module) => {
        resolve(module)
    })
}

// 大数据-国家政策-行业公告正文详情
const other_details = (resolve) => {
    import('../components/other_details.vue').then((module) => {
        resolve(module)
    })
}

// 关于我们
const aboutUs = (resolve) => {
    import('../components/aboutUs/index.vue').then((module) => {
        resolve(module)
    })
}
// 企业发布
const enterpriseRelease = (resolve) => {
    import('../components/enterpriseRelease/index.vue').then((module) => {
        resolve(module)
    })
}
// 交易中心
const tradingcenter = (resolve) => {
    import('../components/tradingcenter/index.vue').then((module) => {
        resolve(module)
    })
}
// 联系我们
const contactUs = (resolve) => {
    import('../components/contactUs/index.vue').then((module) => {
        resolve(module)
    })
}
// 敬请期待(抽离到公共组建)
// const coming = (resolve) => {
//     import('../components/coming/index.vue').then((module) => {
//         resolve(module)
//     })
// }

const routerGroup = new Router({
        linkActiveClass: "active",
        mode: "hash",
        routes: [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/home',
            name: 'home',
            component: home
        }, {
            path: '/bigdatanews',
            name: 'bigdatanews',
            component: bigdatanews
        }, {
            path: '/nationalpolicy',
            name: 'nationalpolicy',
            component: nationalpolicy
        }, {
            path: '/companyannouncement',
            name: 'companyannouncement',
            component: companyannouncement
        }, {
            path: '/interlocution',
            name: 'interlocution',
            component: interlocution
        }, { 
            path: '/membership',
            name: 'membership',
            component: membership
        }, {
            path: '/aboutUs',
            name: 'aboutUs',
            component: aboutUs
        },{
            path:'/membership/details/:id',
            name:'membershipDetails',
            component:membershipDetails
        },{
            path:'/:type/detail/:id',
            name:'other_details',
            component:other_details 
        },{
            path:'/enterpriseRelease',
            name:'enterpriseRelease',
            component:enterpriseRelease 
        },{
            path:'/tradingcenter',
            name:'tradingcenter',
            component:tradingcenter 
        },{
            path:'/contactUs',
            name:'contactUs',
            component:contactUs 
        }]
        
})

export default routerGroup;