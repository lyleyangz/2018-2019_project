import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 首页
const home = (resolve) => {
    import('../components/NFC_components/home/index.vue').then((module) => {
        resolve(module)
    })
}
// 近距离通信模块
const NFC = (resolve) => {
    import('../components/NFC_components/NFC/index.vue').then((module) => {
        resolve(module)
    })
}
// 海关报告
const CustomsReport = (resolve) => {
    import('../components/NFC_components/CustomsReport/index.vue').then((module) => {
        resolve(module)
    })
}
// 货源记录
const SourceRecord = (resolve) => {
    import('../components/NFC_components/SourceRecord/index.vue').then((module) => {
        resolve(module)
    })
}
// 货源记录=> 制作人模块
const ProcessingLand = (resolve) => {
    import('../components/NFC_components/ProcessingLand/index.vue').then((module) => {
        resolve(module)
    })
}
// 现场监控
const FieldMonitoring = (resolve) => {
    import('../components/NFC_components/FieldMonitoring/index.vue').then((module) => {
        resolve(module)
    })
}
// 查看检测证明
const TestProof = (resolve) => {
    import('../components/NFC_components/TestProof/index.vue').then((module) => {
        resolve(module)
    })
}
// 加工成品地
const FinishedProduct = (resolve) => {
    import('../components/NFC_components/FinishedProduct/index.vue').then((module) => {
        resolve(module)
    })
}
// 资质证明
const Prove = (resolve) => {
    import('../components/NFC_components/Prove/index.vue').then((module) => {
        resolve(module)
    })
}
// 资质证明
const watchProve = (resolve) => {
    import('../components/NFC_components/watchProve/index.vue').then((module) => {
        resolve(module)
    })
}
// 场地位置存放现场图片
const fieldposition = (resolve) => {
    import('../components/NFC_components/fieldposition/index.vue').then((module) => {
        resolve(module)
    })
}


const routerGroup = new Router({
    linkActiveClass: "active",
    mode: "hash",
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home,
            meta: {
                title: '首页',
                keepAlive: false
            }
        },
        {
            path: '/NFC',
            name: 'NFC',
            component: NFC,
            meta: {
                title: 'NFC',
                keepAlive: true
            }
        },
        {
            path: '/NFC/CustomsReport',
            name: 'CustomsReport',
            component: CustomsReport,
            meta: {
                title: 'CustomsReport',
                keepAlive: false
            }
        },
        {
            path: '/NFC/SourceRecord',
            name: 'SourceRecord',
            component: SourceRecord,
            meta: {
                title: 'SourceRecord',
                keepAlive: false
            }
        },
        {
            path: '/NFC/FieldMonitoring',
            name: 'FieldMonitoring',
            component: FieldMonitoring,
            meta: {
                title: 'FieldMonitoring',
                keepAlive: false
            }
        },
        {
            path: '/NFC/TestProof',
            name: 'TestProof',
            component: TestProof,
            meta: {
                title: 'TestProof',
                keepAlive: false
            }
        },
        {
            path: '/NFC/FinishedProduct',
            name: 'FinishedProduct',
            component: FinishedProduct,
            meta: {
                title: 'FinishedProduct',
                keepAlive: false
            }
        },
        {
            path: '/NFC/SourceRecord/ProcessingLand/fieldposition',
            name: 'fieldposition',
            component: fieldposition,
            meta: {
                title: 'fieldposition',
                keepAlive: false
            }
        },
        {
            path: '/NFC/SourceRecord/MiningInformation/Prove',
            name: 'Prove',
            component: Prove,
            meta: {
                title: 'Prove',
                keepAlive: false
            }
        },
        {
            path: '/NFC/SourceRecord/MiningInformation/watchProve',
            name: 'watchProve',
            component: watchProve,
            meta: {
                title: 'watchProve',
                keepAlive: false
            }
        },
        {
            path: '/NFC/SourceRecord/ProcessingLand',
            name: 'ProcessingLand',
            component: ProcessingLand,
            meta: {
                title: 'ProcessingLand',
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