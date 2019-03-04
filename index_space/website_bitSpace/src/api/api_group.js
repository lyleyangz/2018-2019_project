import http from './fetch.js';

// 公告列表
export function getNoticeList(params = {}) {
    return http({
        url: '/api/json/link/user/news/selectNews',
        method: 'post',
        params: params
    });
}

// 根据id获取公告详情
export function getNoticeDetail(params = {}) {
    return http({
        url: '/api/json/link/user/news/selectNewsById',
        method: 'post',
        params: params
    });
}