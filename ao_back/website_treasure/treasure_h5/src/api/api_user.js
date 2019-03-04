import http from './fetch.js';

// 注册
export function register(params = {}) {
    return http({
        url: '/service/app/v1/user/user',
        method: 'post',
        params:params
    },false);
}
export function getCode(params = {}) {
    return http({
        url: '/service/app/v1/user/user/captcha/phone',
        method: 'get',
        params:params
    });
}

export function login(params = {}) {
    return http({
        url: '/service/app/v1/user/user/login',
        method: 'post',
        params:params
    },false);
}




