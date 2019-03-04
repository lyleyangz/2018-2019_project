import http from './fetch.js';


export function queryList(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/list',
        method: 'get',
        params: params
    });
}
export function add(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/addQuestion',
        method: 'post',
        params: params
    });
}
export function update(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/update',
        method: 'post',
        params: params
    });
}
export function del(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/delete',
        method: 'post',
        params: params
    });
}

