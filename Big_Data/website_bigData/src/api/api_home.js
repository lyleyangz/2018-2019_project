import http from './fetch.js';

export function getData(params = {}) {
    return http({
        url: '/service/app/v1/user/notice/homepage',
        method: 'get',
        params: params
    });
}

export function getCompanyDynamicsData(params = {}) {
    return http({
        url: '/service/app/v1/user/notice/list',
        method: 'get',
        params: params
    });
}