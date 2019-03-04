import http from './fetch.js';



// 退出登录
export function logout(params = {}) {
    return http({
        url: '/api/json/user/logout.do',
        method: 'post',
        params: params
    });
}
// 添加用户自选
export function addOptional(params = {}) {
    return http({
        url: '/api/json/user/selfSelection/add.do',
        method: 'post',
        params: params
    });
}
// 删除用户自选
export function deleteOptional(params = {}) {
    return http({
        url: '/api/json/user/selfSelection/delete.do',
        method: 'post',
        params: params
    });
}
// 获取contractType
export function getContractList(params = {}) {
    return http({
        url: '/api/json/contract/list.do',
        method: 'get',
        params: params
    });
}
//获取所有币种列表
export function getCurrencyList(params = {}) {
    return http({
        url: '/api/json/currency/list.do',
        method: 'get',
        params: params
    });
}
//获取所有币种充值地址
export function getCurrencyAddress(params = {}) {
    return http({
        url: '/api/json/currency/getNewAddress.do',
        method: 'post',
        params: params
    });
}
// 获取VAAC和ripple公共充值地址
export function getCommonaddr(params = {}) {
    return http({
        url: '/api/json/user/common/addr.do',
        method: 'get',
        params: params
    });
}
// 获取BTC公共地址
export function getBTCrechargeAddr(params) {
    return http({
        url: '/api/json/user/btc/addr.do',
        method: 'get',
        params: params
    });
}
// 获取ETH公共地址
export function getETHrechargeAddr(params) {
    return http({
        url: '/api/json/user/eth/addr.do',
        method: 'get',
        params: params
    });
}
// 获取瑞波币充值地址标签
export function getRippleAddr(params = {}) {
    return http({
        url: '/api/json/user/ripple/addr.do',
        method: 'get',
        params: params
    });
}
// 获取VAAC币充值地址标签
export function getVacAddr(params = {}) {
    return http({
        url: '/api/json/user/vac/addr.do',
        method: 'get',
        params: params
    });
}
export function getDeposit(params = {}) {
    return http({
        url: '/api/json/user/coin/deposit.do',
        method: 'post',
        params:params
    });
}
// 获取充值记录
export function getDepositHistory(params = {}) {
    return http({
        url: '/api/json/user/list/deposit.do',
        method: 'get',
        params: params
    });
}
// 虚拟币的提现
export function withdraw(params = {}) {
    return http({
        url: '/api/json/user/coin/withdraw.do',
        method: 'post',
        params: params
    });
}
// 获取提现记录
export function getWithdrawHistory(params = {}) {
    return http({
        url: '/api/json/user/coin/withdraw/history.do',
        method: 'get',
        params: params
    });
}
// 获取k线数据(取各类型最新数据，用以首页和一些列表信息的显示)
export function getKinfoList(params = {}) {
    return http({
        url: '/api/json/kinfo/latest.do',
        method: 'get',
        params: params
    });
}
// 获取特定的k线数据（按类型，按时间）
export function getSpecKinfo(params = {}) {
    return http({
        url: '/api/json/kinfo.do',
        method: 'get',
        params: params
    });
}
// 获取公告
export function getNotice(params = {}) {
    return http({
        url: '/api/json/announcement/type.do',
        method: 'get',
        params: params
    });
};
// 获取验证码
export function getPINimg() {
    return http({
        url: '/api/json/user/getValidateCode.do',
        method: 'get'
    });
}
// 获取手机验证码
export function getCode(params = {}) {
    return http({
        url: '/api/json/user/captcha.do',
        method: 'post',
        params:params
    });
}
// 绑定邮箱
export function getEmail(params = {}) {
    return http({
        url: '/api/json/user/email/bind.do',
        method: 'post',
        params:params
    });
}
// 注册
export function register(params = {}) {
    return http({
        url: '/api/json/user/register.do',
        method: 'post',
        params: params
    });
}
//绑定邮箱
export function bindEmail(params = {}) {
    return http({
        url: '/api/json/user/email/verified.do',
        method: 'post',
        params: params
    });
}
//设置支付密码
export function setPayPassword(params = {}) {
    return http({
        url: '/api/json/user/pwd/payment.do',
        method: 'post',
        params: params
    });
}
//校验验证码
export function verifyCode(params = {}) {
    return http({
        url: '/api/json/user/captcha/check.do',
        method: 'post',
        params: params
    });
}
//修改支付密码
export function updatePayPassword(params = {}) {
    return http({
        url: '/api/json/user/pwd/payment/modify.do',
        method: 'post',
        params: params
    });
}
//修改登录密码
export function updateLoginPassword(params = {}) {
    return http({
        url: '/api/json/user/pwd/login/modify.do',
        method: 'post',
        params: params
    });
}
//修改手机号
export function updatePhone(params = {}) {
    return http({
        url: '/api/json/user/phone/bind.do',
        method: 'post',
        params: params
    });
}
//修改电子邮箱
export function updateEmail(params = {}) {
    return http({
        url: '/api/json/user/email/bind/new.do',
        method: 'post',
        params: params
    });
}
//忘记 支付/登录 密码
export function forgetPassword(params = {}) {
    return http({
        url: '/api/json/user/pwd/forget/set.do',
        method: 'post',
        params: params
    });
}
//获取用户详情
export function getUserDetail(params = {}) {
    return http({
        url: '/api/json/user/detail.do',
        method: 'get',
        params: params
    });
}
//获取用户登录记录
export function getLoginList(params = {}) {
    return http({
        url: '/api/json/user/login/history.do',
        method: 'get',
        params: params
    });
}
//绑定身份证信息
export function bindCard(params = {}) {
    return http({
        url: '/api/json/user/verify/bind.do',
        method: 'post',
        params: params
    });
}
//绑定身份证照片
export function bindCardImg(params = {}) {
    return http({
        url: '/api/json/user/verify/upload.do',
        method: 'post',
        params: params
    }, false);
}
//获取用户账户流水（账单明细）
export function userHistory(params = {}) {
    return http({
        url: '/api/json/user/account/history.do',
        method: 'get',
        params: params,
    });
}
// 登录
export function toLogin(params = {}) {
    return http({
        url: '/api/json/user/login.do',
        method: 'post',
        params: params
    });
}
// 获取账户余额
export function getbalance(params = {}) {
    return http({
        url: '/api/json/user/account/getbalance.do',
        method: 'get',
        params: params
    });
}
// 获取买卖委托列表
export function getEntrustInfo(params = {}) {
    return http({
        url: '/api/json/quot/orders.do',
        method: 'get',
        params: params
    });
}
// 获取用户当前的委托列表
export function getUserEntrustList(params = {}) {
    return http({
        url: '/api/json/user/order/list.do',
        method: 'get',
        params: params
    });
}
// 发起委托请求
export function setOrder(params = {}) {
    return http({
        url: '/api/json/user/order.do',
        method: 'post',
        params: params
    });
}
// 取消委托请求
export function cancelOrder(params = {}) {
    return http({
        url: '/api/json/user/order/cancel.do',
        method: 'post',
        params: params
    });
}
// 获取交易配置
export function getExConfig(params = {}) {
    return http({
        url: '	/api/json/user/config.do',
        method: 'get',
        params: params
    });
}
// 获取平台的成交记录
export function getTradeRecord(params = {}) {
    return http({
        url: '/api/json/quot/matches.do',
        method: 'get',
        params: params
    });
}
// 获取验证码图片
export function getValidateCode(params = {}) {
    return http({
        url: '/api/json/user/imgCode.do',
        method: 'get',
        params: params
    });
}

// ############################
// 开启手机验证
export function openPhoneVerify(params = {}) {
    return http({
        url: '/api/json/user/phone/verify.do',
        method: 'get',
        params: params
    });
}
// 取消手机验证
export function cancelPhoneVerify(params = {}) {
    return http({
        url: '/api/json/user/phone/cancelVerify.do',
        method: 'post',
        params: params
    });
}
// 开启邮箱验证
export function openMailVerify(params = {}) {
    return http({
        url: '/api/json/user/email/verify.do',
        method: 'get',
        params: params
    });
}
// 取消邮箱验证
export function cancelMailVerify(params = {}) {
    return http({
        url: '/api/json/user/email/cancelVerify.do',
        method: 'post',
        params: params
    });
}

// 登录时手机验证
export function loginVerify(params = {}) {
    return http({
        url: '/api/json/user/phone/login.do',
        method: 'post',
        params: params
    });
}
// 获取手机验证码
export function getCodeByPhone(params = {}) {
    return http({
        url: '/api/json/user/captcha/phone.do',
        method: 'get',
        params:params
    });
}
// 获取手机验证码 仅限登录重新发送验证码使用
export function getLoginCodeByPhone(params = {}) {
    return http({
        url: '/api/json/user/captcha/phone/login.do',
        method: 'get',
        params:params
    });
}

// 获取邮箱验证码
export function getCodeByEmail(params = {}) {
    return http({
        url: '/api/json/user/captcha/email.do',
        method: 'get',
        params:params
    });
}
// 绑定邮箱时发生验证码
export function sendEmailByBind(params = {}) {
    return http({
        url: '/api/json/user/email/bind/captcha.do',
        method: 'get',
        params:params
    });
}
// 绑定邮箱
export function bindEmailNew(params = {}) {
    return http({
        url: '/api/json/user/email/bind.do',
        method: 'post',
        params:params
    });
}

// 短信验证码登录
export function loginByCode(params = {}) {
    return http({
        url: '/api/json/user/phone/login.do',
        method: 'post',
        params:params
    });
}

// 获取用户开启验证的状态
export function userVerify(params = {}) {
    return http({
        url: '/api/json/user/verify.do',
        method: 'get',
        params:params
    });
}


// 返利记录
export function rebateList(params = {}) {
    return http({
        url: '/api/json/user/invitingRebate.do',
        method: 'get',
        params:params
    });
}

// 币种介绍
export function currencyIntro(params = {}) {
    return http({
        url: '/api/json/common/currency/introduction/one.do',
        method: 'get',
        params:params
    });
}

// 充值地址列表
export function withdrawAddressList(params = {}) {
    return http({
        url: '/api/json/user/withdraw/address/list.do',
        method: 'get',
        params:params
    });
}
// 删除充值地址
export function delWithdrawAddress(params = {}) {
    return http({
        url: '/api/json/user/withdraw/address/delete.do',
        method: 'post',
        params:params
    });
}