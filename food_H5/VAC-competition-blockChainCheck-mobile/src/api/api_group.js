import http from './fetch.js';


// 注册
export function register(params = {}) {
    return http({
        url: '/api/json/user/register.do',
        method: 'post',
        params: params
    });
}
// 获取手机验证码
export function getValCode(params = {}) {
    return http({
        url: '/api/json/user/captcha.do',
        method: 'post',
        params:params
    });
}
// 获取区块浏览器首页
export function getBlockMsg(params = {}) {
    return http({
        url: '/api/json/food/admin/goods/getBlockHeight',
        method: 'post',
        params:params
    });
}
//获取最新流通记录
export function getCirculationMsg(params = {}) {
    return http({
        url: '/api/json/food/admin/goods/circulateHistoryNew',
        method: 'post',
        params:params
    });
}