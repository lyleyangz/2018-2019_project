import http from './fetch.js';


// 新增公告
export function getMemberList (params = {}) {
    return http({
        url: '/json/smallProgram/admin/getListUser',
        method: 'post',
        params: params
    });
}
