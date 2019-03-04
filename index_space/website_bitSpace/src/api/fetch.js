import axios from "axios"
import qs from "qs"
import iview from 'iview'

// 提示框设置
iview.Message.config({
    top: 400,
    duration: 3
});

// 根据域名判断请求的接口
const baseUrl = location.href.includes('localhost')? '': '/link';

// 允许带上cookie
axios.defaults.withCredentials = true;

const instance = axios.create({
    timeout: 1000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials:true
});


// 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法
    if (!res.data.success && res.data.errCode) {
        iview.Message.error(returnErrorStr(res.data.errCode));
        return {
            success: false,
            data: res.data.data
        };
    }
    return res.data;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.setItem('YJS_UID', '');
            localStorage.setItem('YJS_isLogin', 'false');
            return {
                success: false,
                notLogin: true
            };
        } else {
            iview.Message.error('系统繁忙');
            return {
                success: false
            };
        }
    } else {
        iview.Message.error('连接失败');
        return {
            success: false
        };
    }
    
    // 对响应错误做处理
    // return Promise.reject(error);
});
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function http(data = {url: '', method: '', params: {}, withQs: true} ) {
    if (data.method === "post") {
        data.withQs = data.withQs? data.withQs: true;
        const fParams = data.withQs? qs.stringify(data.params):data.params;
        return axios.post(baseUrl + data.url + `?t=${Math.random()}`, fParams);
        // get
    } else if (data.method === "get") {
        return axios.get(baseUrl + data.url + `?t=${Math.random()}`, {
            params: data.params
        })
    }
}
function returnErrorStr(errCode){
    switch(errCode) {
        case 'SYS.0001':
        return '系统错误';

        case 'SYS.0002':
        return '参数错误';

        case 'CAPTCHA.0001':
        return '2分钟之内不能重复发送验证码，请稍后再试';

        case 'CAPTCHA.0002':
        return '验证码无效';

        case 'CAPTCHA.0003':
        return '验证码过期';
        
        case 'CAPTCHA.0004':
        return '验证码输入次数超过5次';

        case 'HTTP.0001':
        return '系统错误';

        case 'HTTP.0002':
        return '系统错误';

        case 'IMG.0001':
        return '图片格式不正确';

        case 'USER.0001':
        return '用户不存在';

        case 'USER.0002':
        return '用户未授权';

        case 'USER.0003':
        return '密码错误';

        case 'USER.0004':
        return '该账号已经注册';

        case 'DB.0001':
        return '数据库错误';

        case 'DB.0002':
        return '数据库错误';

        case 'ACCT.0001':
        return '账户已经存在';

        case 'ACCT.0002':
        return '余额不足';

        case 'PIRCE.0001':
        return '交易已超出浮动价格';

        default:
        break;
    }
}
export default http;