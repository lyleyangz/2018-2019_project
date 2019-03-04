import axios from "axios"
import qs from "qs"
// import iview from 'iview'
import Message from 'iview/src/components/message';
import i18n from '@common/i18n';

let locale = localStorage.getItem('QDL_lang') || 'ZHS';
let mes = i18n.messages[locale].markedWorks;


// 提示框设置
Message.config({
    top: 400,
    duration: 3
});

// 根据域名判断请求的接口
const baseUrl = location.href.includes('localhost')? '': '';

// 允许带上cookie
axios.defaults.withCredentials = true;

const instance = axios.create({
    timeout: 1000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // withCredentials:true
});

// 请求拦截器
axios.interceptors.request.use((config) => {
    let loginKey = localStorage.getItem('COM_systemLoginKey');
    if (loginKey) {
        config.headers['shuangchuang-token'] = loginKey;
    }
    return config;
});
// 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法
    if (!res.data.success && res.data.errCode) {
        Message.error(returnErrorStr(res.data.errCode));
        return {
            success: false,
            data: res.data.data
        };
    }
    return res.data;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.setItem('QDL_UID', '');
            sessionStorage.setItem('QDL_isLogin', false);
            Message.error('您还未登录，请前去登录!');
              setTimeout(()=>{
                window.location.href = "index.html"
              },2000)
            return {
                success: false,
                notLogin: true
            };
        } else {
            // Message.error(mes.SYSbusy);
            return {
                success: false
            };
        }
    } else {
        // Message.error(mes.contactFail);
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
    if (data.method === "post") {
        const fParams = withQs? qs.stringify(data.params):data.params;
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
            return '请稍后再试';

        case 'SYS.0002':
            return '输入有误';

        case 'SYS.0003':
            return '请填写内容';

        case 'USER.0001':
            return '该用户不存在';

        case 'USER.0002':
            return '授权失败';

        case 'USER.0003':
            return '登录密码不正确';

        case 'USER.0004':
            return '用户名已存在';

        case 'USER.0005':
            return '验证码已使用';

        case 'USER.0006':
            return '用户名格式错误';

        case 'USER.0007':
            return '密码格式错误';

        case 'USER.0008':
            return '该用户已冻结';

        case 'USER.0009':
            return '手机号不能为空';

        case 'USER.0010':
            return '区号不能为空';

        case 'USER.0011':
            return '手机号已被注册';

        case 'USER.0012':
            return '手机号格式错误';

        case 'ADMIN.0001':
            return '管理员已存在';

        case 'ARTICLE.0001':
            return '文章不存在';
        
        case 'ARTICLE.0002':
            return '请输入搜索内容';

        case 'CAPTCHA.0001':
            return '验证码次数已受限';

        case 'CAPTCHA.0002':
            return '验证码不正确,请输入正确的验证码';

        case 'CAPTCHA.0003':
            return '验证码错误';

        case 'CAPTCHA.0004':
            return '操作验证码频繁，请稍后';

        case 'CAPTCHA.0005':
            return '图形验证码不正确';

        case 'CAPTCHA.0006':
            return '图片验证码不能为空';

        case 'CAPTCHA.0007':
            return '验证码接收类型不一致';

        case 'DB.0001':
            return '数据暂时拉取不到，请稍后';

        case 'DB.0002':
            return '更新数据失败';

        case 'HTTP.0001':
            return '请求数据姿势不对';

        case 'HTTP.0002':
            return '未知属性';

        case 'HTTP.0003':
            return '数据请求无效';

        case 'HTTP.0004':
            return '链上地址获取失败';
        
        case 'HTTP.0005':
            return '文章上链失败';

        case 'HTTP.0006':
            return '区块数据查询失败';

        case 'IMG.0001':
            return '图片格式不正确';

        case 'IMG.0002':
            return '图片保存失败';

        case 'SMS.0001':
            return '验证码发送失败';
 
        default:
            return '请求发生错误';
            break;
    }
}
export default http;