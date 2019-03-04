import http from './fetch.js';
// 货源记录=》制作大师详情
export function getSingleMasterRef(params = {}) {
    return http({
        url: '/service/app/v1/master/single',
        method: 'get',
        params:params
    });
}
// position=?产品定位
export function getFactoryLocations(params = {}) {
    return http({
        url: '/service/app/v1/admin/product/factoryLocations',
        method: 'get',
        params:params
    });
}
// 质检证明
export function getQualityCertificate(params = {}) {
    return http({
        url: '/service/app/v1/admin/product/qualityCertificate',
        method: 'get',
        params:params
    });
}
// NFC首页
export function getChainInfo(params = {}) {
    return http({
        url: '/service/app/v1/user/product/getChainInfo',
        method: 'get',
        params:params
    });
}
// 查看现场监控
export function fieldMonitoring(params = {}) {
    return http({
        url: '/service/app/v1/monitor/monitorVideo/queryMonitorVideoUserList',
        method: 'get',
        params:params
    });
}
// 查看溯源记录
export function listNfcHistory(params = {}) {
    return http({
        url: '/service/app/v1/user/product/listNfcHistory',
        method: 'get',
        params:params
    });
}
// 加工场地详情/相关资质详情
export function processingLand(params = {}) {
    return http({
        url: '/service/app/v1/site/single',
        method: 'get',
        params:params
    });
}
// 获取承运人信息
export function driver(params = {}) {
    return http({
        url: '/service/app/v1/driver',
        method: 'get',
        params:params
    });
}
// 商品加工轨迹详情
export function getTracInfo(params = {}) {
    return http({
        url: '/service/app/v1/track/tracInfo',
        method: 'get',
        params:params
    });
}

export function getHeight(params = {}) {
    return http({
        url: '/service/app/v1/user/product/getChainLedgerIndex',
        method: 'get',
        params:params
    });
}


