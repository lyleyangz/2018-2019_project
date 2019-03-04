import http from './fetch.js';



// 币种列表
export function getCurrencyList(params = {}) {
    return http({
        // url: '/api/json/currency/list.do',
        url: '/api/json/legalTender/currency/list.do',
        method: 'get',
        params: params
    });
}
// 商家列表
export function getSellerList(params = {}) {
    return http({
        url: '/api/json/legalTender/getSellerList.do',
        method: 'get',
        params: params
    });
}
// 商家详情
export function getSellerDetail(params = {}) {
    return http({
        url: '/api/json/legalTender/seller.do',
        method: 'get',
        params: params
    });
}
// 提交订单
export function submitOrder(params = {}) {
    return http({
        url: '/api/json/user/legalTender/order.do',
        method: 'post',
        params: params
    });
}
// 获取当前币种买入价格
export function getPrice(params = {}) {
    return http({
        url: '/api/json/legalTender/getPrice.do',
        method: 'get',
        params: params
    });
}
// 下单后 获取代付款订单数据
export function getDetailBySubmit(params = {}) {
    return http({
        url: '/api/json/user/legalTender/order/oneOrder.do',
        method: 'post',
        params: params
    });
}
// 付款
export function payOrder(params = {}) {
    return http({
        url: '/api/json/user/legalTender/order/pay.do',
        method: 'post',
        params: params
    });
}
// 取消订单
export function cancelOrder(params = {}) {
    return http({
        url: '/api/json/user/legalTender/order/cancel.do',
        method: 'post',
        params: params
    });
}

// 交易记录列表
export function getOrderList(params = {}) {
    return http({
        url: '/api/json/user/legalTender/order/list.do',
        method: 'post',
        params: params
    });
}
// 检测价格是否过期
export function checkPrice(params = {}) {
    return http({
        url: '/api/json/legalTender/isExpiredPrice.do',
        method: 'get',
        params: params
    });
}