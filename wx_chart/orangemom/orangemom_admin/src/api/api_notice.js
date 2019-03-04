import http from './fetch.js';


// 新增公告
export function createNotice (params = {}) {
    return http({
        url: '/service/app/v1/admin/notice/addition',
        method: 'post',
        params: params
    });
}

// 查看公告详情
export function checkNotice (params = {}) {
    return http({
        url: '/service/app/v1/admin/notice/single',
        method: 'get',
        params: params
    });
}

// 公告列表
export function getNoticeList (params = {}) {
    return http({
        url: '/service/app/v1/admin/notice/list',
        method: 'post',
        params: params
    });
}

// 批量发布、下架、删除公告
export function updateStatus (params = {}) {
    return http({
        url: '/service/app/v1/admin/notice/transfer',
        method: 'post',
        params: params
    });
}

// 修改公告
export function updateNotice (params = {}) {
    return http({
        url: '/service/app/v1/admin/notice/editor',
        method: 'post',
        params: params
    });
}

// 修改公告
export function setTtop (params = {}) {
    return http({
        url: '/service/app/v1/admin/notice/isTop',
        method: 'get',
        params: params
    });
}
