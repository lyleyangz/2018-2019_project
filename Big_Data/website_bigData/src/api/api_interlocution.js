import http from './fetch.js';

// 百问百答
export function getInterlocutionType(params = {}) {
    return http({
        url: '/service/app/v1/user/question/typeList',
        method: 'get',
        params: params
    });
}
export function getInterlocutionTitle(params = {}) {
    return http({
        url: '/service/app/v1/user/question/titleList',
        method: 'get',
        params: params
    });
}
export function getInterlocutionInfo(params = {}) {
    return http({
        url: '/service/app/v1/user/question/info',
        method: 'get',
        params: params
    });
}