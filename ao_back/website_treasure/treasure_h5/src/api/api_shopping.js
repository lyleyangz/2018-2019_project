import http from './fetch.js';
// 获取商城商品列表
export function getListgoods(params = {}) {
    return http({
        url: '/service/app/v1/store/list',
        method: 'post',
        params: params
    },false);
}
// 商品详情
export function goodsDetail(params = {}) {
    return http({
        url: '/service/app/v1/store/single',
        method: 'get',
        params: params
    },false);
}
// 商品分类（抽屉）
export function getSorts(params = {}) {
    return http({
        url: '/service/app/v1/user/product/goodsClassList',
        method: 'get',
        params: params
    },false);
}


// 积分


// 可领积分列表
export function getCounts(params = {}) {
    return http({
        url: '/service/app/v1/user/score',
        method: 'get',
        params: params
    },false);
}
// 积分创建记录
export function countsReport(params = {}) {
    return http({
        url: '/service/app/v1/user/score',
        method: 'post',
        params: params
    },false);
}
// 积分领取（待领取）
export function getCount(params = {}) {
    return http({
        url: '/service/app/v1/user/score',
        method: 'patch',
        params: params
    });
}
// 查询用户积分
export function queryCount(params = {}) {
    return http({
        url: '/service/app/v1/user/score/count',
        method: 'get',
        params: params
    });
}
// 查询vaac余额
export function queryVaac(params = {}) {
    return http({
        url: '/service/app/v1/user/account/info/uid',
        method: 'get',
        params: params
    });
}
// 查看所有汇率
export function sysmData(params = {}) {
    return http({
        url: '/service/app/v1/user/sysparam/list',
        method: 'get',
        params: params
    });
}
// vacc价值/￥
export function tokenValue(params = {}) {
    return http({
        url: '/service/app/v1/user/account/getrealtimedata',
        method: 'get',
        params: params
    });
}
// 添加订单
export function addOrder(params = {}) {
    return http({
        url: '/service/app/v1/store/order/add',
        method: 'post',
        params: params
    },false);
}
// 订单支付
export function payOrder(params = {}) {
    return http({
        url: '/service/app/v1/store/order/pay',
        method: 'post',
        params: params
    },false);
}


// 收货地址

// 添加地址
export function addAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/add',
        method: 'post',
        params: params
    },false);
}
// 编辑地址
export function editAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/edit',
        method: 'post',
        params: params
    },false);
}
// 获取地址列表
export function getAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/list',
        method: 'get',
        params: params
    },false);
}
// 设置默认地址
export function defalutAddress(params = {}) {
    return http({
        url: '/service/app/v1/user/address/defalut',
        method: 'post',
        params: params
    },false);
}


// 获取用户评价
export function userSayList(params = {}) {
    return http({
        url: '/service/app/v1/comment/show',
        method: 'post',
        params: params
    },false);
}
export function addSay(params = {}) {
    return http({
        url: '/service/app/v1/comment/accretion',
        method: 'post',
        params: params
    },false);
}
export function replySay(params = {}) {
    return http({
        url: '/service/app/v1/comment',
        method: 'post',
        params: params
    },false);
}

