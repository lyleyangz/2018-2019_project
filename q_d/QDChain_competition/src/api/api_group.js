import http from './fetch.js';


//登录
// phone 手机号
// password 密码
// imgCode  图片验证码
export function Login(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/login.do',
        method: 'post',
        params:params
    });
}
// 注册
// phone 手机号
// password 登录密码
// captcha 手机验证码
// imgCode 图片验证码
// countryCode 区号，默认“86”
export function Register(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/register.do',
        method: 'post',
        params: params
    });
}
// 获取手机验证码
// phone 手机号
// countryCode 默认“86”
// type 	
// /1:注册, 2:支付, 3-找回登录密码，4-找回支付密码， 5-解绑手机号，6-绑定新手机号
export function getPhoneCode(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/captcha.do',
        method: 'post',
        params:params
    });
}
// 获取图片验证码
export function getImgCode(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/imgCode.do',
        method: 'get',
        params:params
    });
}
//申请为原创者后三部
// accountName 账户名称
// realName 真实姓名
// identityFrontImg 身份证正面照
// identityBackImg 身份证反面照
// identityNum 身份证号码
// companyName 公司名称
// businessLicenseImg 企业营业执照
// businessLicenseNum 工商执照注册号
// platform 平台(1微信,2今日头条,3百度百家,4搜狐,0其他)
// source 来源(1.Android 2.ios3.other)
// weMedia 是否为自媒体(0是1否)
export function RegisterOtherStep(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/useraccountinfo/add.do',
        method: 'post',
        params:params
    });
}
// 我的版权列表
// title 文章标题
// currentPage 页码
// count 每页显示的条数
export function getMyCopyright(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/article/querys.do',
        method: 'post',
        params:params
    });
}
// 查询地址
export function search(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/article/getChainInfo.do',
        method: 'post',
        params:params
    });
}
// 添加原创保护
export function addArticle(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/article/protect/add.do',
        method: 'post',
        params:params
    });
}
// 文章详情
export function articleDetails(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/article/single.do',
        method: 'post',
        params:params
    });
}
// 上传图片
export function uploadImgFile(params = {}) {
    return http({
        url: '/api/json/shuangchuang/user/uploadImg.do',
        method: 'post',
        params:params
    },false);
}