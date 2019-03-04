import http from './fetch.js';

// 礼品列表
export function giftList(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/userPageList',
        method: 'get',
        params:params
    });
}
// 礼品详情
export function giftDetail(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/getGiftHistoryProInfo',
        method: 'get',
        params:params
    });
}
// 礼品链条
export function giftChain(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/getGiftUserLink',
        method: 'get',
        params:params
    });
}
// 转赠
export function giftPresent(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/present',
        method: 'post',
        params:params
    },false);
}

// 用户领取礼品
export function giftReceive(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/draw',
        method: 'post',
        params:params
    },false);
}
// 用户收取礼品
export function giftGather(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/gather',
        method: 'post',
        params:params
    },false);
}

export function existReceive(params = {}) {
    return http({
        url: '/service/app/v1/user/gift/existReceive',
        method: 'get',
        params:params
    },false);
}
