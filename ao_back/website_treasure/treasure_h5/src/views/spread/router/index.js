import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const register = (resolve) => {
    import('../components/register/index.vue').then((module) => {
        resolve(module)
    })
}
const registerLoad = (resolve) => {
    import('../components/register/load.vue').then((module) => {
        resolve(module)
    })
}
const login = (resolve) => {
    import('../components/login/index.vue').then((module) => {
        resolve(module)
    })
}
const registerGift = (resolve) => {
    import('../components/registerGift/index.vue').then((module) => {
        resolve(module)
    })
}
const success = (resolve) => {
    import('../components/success/index.vue').then((module) => {
        resolve(module)
    })
}
const give = (resolve) => {
    import('../components/give/index.vue').then((module) => {
        resolve(module)
    })
}



const routerGroup = new Router({
    linkActiveClass: "active",
    mode: "hash",
    routes: [
        {
            path: '/register',
            component: register,
            meta: {
                title: '注册',
                keepAlive: false
            }
        },
        {
            path: '/register/load',
            component: registerLoad,
            meta: {
                title: '下载',
                keepAlive: false
            }
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录',
                keepAlive: false
            }
        },
        {
            path: '/registerGift',
            component: registerGift,
            meta: {
                title: '注册',
                keepAlive: false
            }
        },
        {
            path: '/success',
            component: success,
            meta: {
                title: '成功',
                keepAlive: false
            }
        },
        {
            path: '/give/:id/:type',
            component: give,
            meta: {
                title: '礼品',
                keepAlive: false
            }
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