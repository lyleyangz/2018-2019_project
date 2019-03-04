import http from './fetch.js';
// 收货地址
export function addCar(params = {}) {
    return http({
        url: '/service/app/v1/cart/accretion',
        method: 'post',
        params:params
    },false);
}
// 添加
export function carList(params = {}) {
    return http({
        url: '/service/app/v1/cart/show',
        method: 'get',
        params:params
    },false);
}
// 编辑
export function delectCar(params = {}) {
    return http({
        url: '/service/app/v1/cart/del',
        method: 'get',
        params:params
    },false);
}

// 下订单
export function orderCart(params = {}) {
    return http({
        url: '/service/app/v1/store/order/addbatch',
        method: 'post',
        params:params
    },false);
}

// 支付
export function payCart(params = {}) {
    return http({
        url: '/service/app/v1/store/order/paymore',
        method: 'post',
        params:params
    },false);
}
