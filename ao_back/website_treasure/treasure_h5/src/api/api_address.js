import http from './fetch.js';
// 收货地址
export function getList(params = {}) {
    return http({
        url: '/service/app/v1/user/address/list',
        method: 'get',
        params:params
    });
}
// 添加
export function addAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/add',
        method: 'post',
        params:params
    },false);
}
// 编辑
export function editAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/edit',
        method: 'post',
        params:params
    },false);
}
// 设置默认地址
export function defalutAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/defalut',
        method: 'get',
        params:params
    },false);
}
// 地址详情
export function detailAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/single',
        method: 'post',
        params:params
    },false);
}