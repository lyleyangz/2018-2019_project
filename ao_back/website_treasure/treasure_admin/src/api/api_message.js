import http from './fetch.js';

// 消息列表
export function msgList (params = {}) {
    return http({
        url: '/service/app/v1/admin/pushtemplate/pageList',
        method: 'get',
        params: params
    });
}
// 消息详情
export function msgDetail (params = {}) {
    return http({
        url: '/service/app/v1/admin/pushtemplate/getInfoById',
        method: 'get',
        params: params
    });
}
// 修改模板
export function editMsg(params = {}) {
    return http({
        url: '/service/app/v1/admin/pushtemplate/update',
        method: 'post',
        params: params
    });
}
// 群发消息
export function sendAllMsg (params = {}) {
    return http({
        url: '/service/app/v1/admin/push/sysAdd',
        method: 'post',
        params: params
    });
}

// 更改状态
export function updateStatus (params = {}) {
    return http({
        url: '/service/app/v1/admin/pushtemplate/updateStatus',
        method: 'post',
        params: params
    });
}

