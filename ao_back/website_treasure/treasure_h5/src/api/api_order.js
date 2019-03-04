import http from './fetch.js';

export function orderList(params = {}) {
    return http({
        url: '/service/app/v1/store/order/queryorder',
        method: 'post',
        params:params
    },false);
}

export function orderDetail(params = {}) {
    return http({
        url: '/service/app/v1/store/order/single',
        method: 'get',
        params:params
    });
}
export function logisticsInfo(params = {}) {
    return http({
        url: '/service/app/v1/store/order/checkexpress',
        method: 'get',
        params:params
    });
}

export function confirmCollect(params = {}) {
    return http({
        url: '/service/app/v1/store/order/delivery',
        method: 'post',
        params:params
    },false);
}

export function cancelOrder(params = {}) {
    return http({
        url: '/service/app/v1/store/order/cancelorder',
        method: 'get',
        params:params
    },false);
}
export function addEvaluate(params = {}) {
    return http({
        url: '/service/app/v1/comment/accretion',
        method: 'post',
        params:params
    },false);
}

export function orderSearch(params = {}) {
    return http({
        url: '/service/app/v1/store/order/ordersearch',
        method: 'post',
        params:params
    },false);
}

export function orderAftersale(params = {}) {
    return http({
        url: '/service/app/v1/store/order/aftersale',
        method: 'post',
        params:params
    },false);
}

export function aftersaleList(params = {}) {
    return http({
        url: '/service/app/v1/store/order/queryaftersale',
        method: 'post',
        params:params
    },false);
}

export function aftersaleDetail(params = {}) {
    return http({
        url: '/service/app/v1/store/order/aftersalesingle',
        method: 'get',
        params:params
    },false);
}

