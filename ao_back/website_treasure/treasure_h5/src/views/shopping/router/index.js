import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);



// 商品商城


//  商品
const commodity = (resolve) => {
    import('../components/shopping_component/commodity/index.vue').then((module) => {
        resolve(module)
    })
}
// 商品详情
const commodityDetail = (resolve) => {
    import('../components/shopping_component/commodityDetail/index.vue').then((module) => {
        resolve(module)
    })
}
// 填写订单
const fillorder = (resolve) => {
    import('../components/shopping_component/fillorder/index.vue').then((module) => {
        resolve(module)
    })
}
// 支付状态
const pay = (resolve) => {
    import('../components/shopping_component/pay/index.vue').then((module) => {
        resolve(module)
    })
}
// 购物车支付
const payCart = (resolve) => {
    import('../components/shopping_component/payCart/index.vue').then((module) => {
        resolve(module)
    })
}
// 购物车
const shoppingCart = (resolve) => {
    import('../components/shopping_component/shoppingCart/index.vue').then((module) => {
        resolve(module)
    })
}
// 购物车
const shoppingCartOrder = (resolve) => {
    import('../components/shopping_component/shoppingCartOrder/index.vue').then((module) => {
        resolve(module)
    })
}
// ################################
const orderList = (resolve) => {
    import('../components/order/list/index.vue').then((module) => {
        resolve(module)
    })
}
const giftIndex = (resolve) => {
    import('../components/order/gift/index.vue').then((module) => {
        resolve(module)
    })
}
const giftChain = (resolve) => {
    import('../components/order/gift/chain.vue').then((module) => {
        resolve(module)
    })
}


const afterSale = (resolve) => {
    import('../components/order/afterSale/index.vue').then((module) => {
        resolve(module)
    })
}
const afterSaleDetail = (resolve) => {
    import('../components/order/afterSale/detail.vue').then((module) => {
        resolve(module)
    })
}

const logistics = (resolve) => {
    import('../components/order/logistics/index.vue').then((module) => {
        resolve(module)
    })
}
const orderDetail = (resolve) => {
    import('../components/order/detail/index.vue').then((module) => {
        resolve(module)
    })
}
const evaluate = (resolve) => {
    import('../components/order/evaluate/index.vue').then((module) => {
        resolve(module)
    })
}
const search = (resolve) => {
    import('../components/order/search/index.vue').then((module) => {
        resolve(module)
    })
}

// ################################
// 地址管理
const addressManage = (resolve) => {
    import('../components/order/address/index.vue').then((module) => {
        resolve(module)
    })
}
// 新增地址
const addAddress = (resolve) => {
    import('../components/order/address/add.vue').then((module) => {
        resolve(module)
    })
}
// 视频播放
const videoPlay = (resolve) => {
    import('../components/shopping_component/videoPlay/index.vue').then((module) => {
        resolve(module)
    })
}
const routerGroup = new Router({
    linkActiveClass: "active",
    mode: "hash",
    routes: [
        {
            path: '/',
            redirect: '/commodity'
        },
        // 商品商城
        {
            path: '/commodity',
            name:'commodity',
            component: commodity,
            meta: {
                title: '商品首页',
                keepAlive: false
            }
        },
        {
            path: '/commodityDetail/:id',
            name:"commodityDetail",
            component: commodityDetail,
            meta: {
                title: '商品详情',
                keepAlive: false
            }
        },
        {
            path: '/pay/:id',
            name:"pay",
            component: pay,
            meta: {
                title: '支付状态',
                keepAlive: false
            }
        },
        {
            path: '/payCart/:id',
            name:"payCart",
            component: payCart,
            meta: {
                title: '支付状态',
                keepAlive: false
            }
        },
        {
            path: '/commodity/fillorder/:id',
            name:"fillorder",
            component: fillorder,
            meta: {
                title: '商品订单',
                keepAlive: true
            }
        },
        // ##########################
        {
            path: '/order/list',
            name: 'orderList',
            component: orderList,
            meta: {
                title: '我的订单',
                keepAlive: false
            }
        },
        {
            path: '/order/detail/:id',
            name: 'orderDetail',
            component: orderDetail,
            meta: {
                title: '订单详情',
                keepAlive: false
            }
        },
        {
            path: '/order/gift',
            name: 'giftIndex',
            component: giftIndex,
            meta: {
                title: '礼品',
                keepAlive: false
            }
        },
        {
            path: '/shoppingCart',
            name: 'shoppingCart',
            component: shoppingCart,
            meta: {
                title: '购物车',
                keepAlive: false
            }
        },
        {
            path: '/shoppingCartOrder',
            name: 'shoppingCartOrder',
            component: shoppingCartOrder,
            meta: {
                title: '商品订单',
                keepAlive: true
            }
        },
        {
            path: '/gift/chain/:id',
            name: 'giftChain',
            component: giftChain,
            meta: {
                title: '礼品链条',
                keepAlive: false
            }
        },
        
        {
            path: '/order/afterSale',
            name: 'afterSale',
            component: afterSale,
            meta: {
                title: '申请售后',
                keepAlive: false
            }
        },
        
        {
            path: '/order/applyAfterSale',
            name: 'applyAfterSale',
            component: afterSaleDetail,
            meta: {
                title: '售后申请',
                keepAlive: false
            }
        },
        {
            path: '/order/afterSaleDetail',
            name: 'afterSaleDetail',
            component: afterSaleDetail,
            meta: {
                title: '申请售后详情',
                keepAlive: false
            }
        },
        {
            path: '/order/logistics/:id',
            name: 'logistics',
            component: logistics,
            meta: {
                title: '物流信息',
                keepAlive: false
            }
        },
        {
            path: '/order/evaluate/:id',
            name: 'evaluate',
            component: evaluate,
            meta: {
                title: '评价',
                keepAlive: false
            }
        },
        {
            path: '/order/search',
            name: 'search',
            component: search,
            meta: {
                title: '搜索',
                keepAlive: true
            }
        },
        // ###########################
        {
            path: "/address/addressManage",
            name: "addressManage",
            component: addressManage,
            meta: {
                title: '地址管理',
                keepAlive: false
            }
        },
        {
            path: "/address/addAddress",
            name: "addAddress",
            component: addAddress,
            meta: {
                title: '新增地址',
                keepAlive: false
            }
        },
        {
            path: "/address/editAddress/:id",
            name: "editAddress",
            component: addAddress,
            meta: {
                title: '编辑地址',
                keepAlive: false
            }
        },
        {
            path: "/videoPlay/index",
            name:"videoPlay",
            component: videoPlay,
            meta: {
                title: '视频播放',
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
    refreshGroup,
}