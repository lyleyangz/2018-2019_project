import http from './fetch.js';

// 用户管理列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/user/list',
        method: 'get',
        params: params
    });
}

// 启用禁用
export function forbidden (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/user/forbidden',
        method: 'post',
        params: params
    });
}

export function userDetail (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/user/infoByUid',
        method: 'get',
        params: params
    });
}

export function history (params = {}) {
    return http({
        url: '/service/app/v1/user/account/pageListMoneyHistory',
        method: 'get',
        params: params
    });
}

export function resetPwd (params = {}) {
    return http({
        url: '/service/app/v1/user/admin//user/resetPwd',
        method: 'post',
        params: params
    });
}

export function orderCount (params = {}) {
    return http({
        url: '/service/app/v1/admin/order/count',
        method: 'get',
        params: params
    });
}

export function userOrder (params = {}) {
    return http({
        url: '/service/app/v1/admin/order/queryorderusers',
        method: 'post',
        params: params
    });
}

