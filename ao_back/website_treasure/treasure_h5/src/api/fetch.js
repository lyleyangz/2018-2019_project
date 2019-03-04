import axios from "axios"
import qs from "qs"
import { Toast } from 'mint-ui'


// 根据域名判断请求的接口
// const baseUrl = '/open';
// const baseUrl = '/openapi';
const baseUrl = '/jewel-openapi';
// const baseUrl = location.href.includes('localhost') ? '': '/jewel-openapi';


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
    var code = res.data.code;
    if (code != 200) {
        Toast({
            message: returnErrorStr(code)
        });
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
            Toast('系统繁忙');
            return {
                success: false
            };
        }
    } else {
        Toast('连接失败');
        return {
            success: false
        };
    }
    
    // 对响应错误做处理
    // return Promise.reject(error);
});
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function http(data = {url: '', method: '', params: {}}, withQs = true ) {
    var token = sessionStorage.getItem("token");
    if(token){
        axios.defaults.headers['token'] = token;
    }
    if (data.method === "post") {
        const fParams = withQs? qs.stringify(data.params):data.params;
        return axios.post(baseUrl + data.url + `?t=${Math.random()}`, fParams);
        // get
    } else if (data.method === "get") {
        return axios.get(baseUrl + data.url + `?t=${Math.random()}`, {
            params: data.params
        })
    }else if (data.method === "patch") {
        return axios.patch(baseUrl + data.url + `?t=${Math.random()}`, data.params)
    }
}
function returnErrorStr(errCode){
    switch(errCode) {
        case '1001':
            return '新增失败';
        case '1002':
            return '删除失败';
        case '1003':
            return '编辑失败';
        case '1101':
            return '用户账号已存在';
        case '1102':
            return '用户已被禁用，无法登陆';
        case '1201':
            return '名称已存在';
        case '1104':
            return '验证码错误';
        case '1105':
            return '验证码无效';
        case '1106':
            return '用户名或密码错误';
        case '2000':
            return '系统错误';
        case '1103':
            return '暂未登录';
        case '5001':
            return '暂未登录';
        case '1301':
            return '地址未找到';
        case '1302':
            return '积分余额不足';
        case '1303':
            return '通证余额不足';
        case '1305':
            return '积分兑换失败';
        case '1306':
            return '获取通证价格失败';
        case '1307':
            return '支付密码错误';
        case '1308':
            return '库存不足';
        case '1402':
            return '总矿池token数量不足';
        default:
            return '系统错误';
            break;
    }
}
export default http;