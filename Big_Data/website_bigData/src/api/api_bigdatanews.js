import http from './fetch.js';

// 获取三种类型新闻接口（大数据新闻，国家政策，行业公告）
export function getThreeTypesOfNews(params = {}) {
    return http({
        url: '/service/app/v1/user/notice/list',
        method: 'get',
        params: params
    });
}
// 查询新闻详情
export function getNewsDetails(params = {}) {
    return http({
        url: '/service/app/v1/user/notice/info',
        method: 'get',
        params: params
    });
}