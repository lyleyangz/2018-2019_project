import axios from "axios"
import qs from "qs"
// import iview from 'iview'
import Message from 'iview/src/components/message';
import i18n from '@common/i18n';


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
    withCredentials:true
});

var getMes = () =>{
    let locale = localStorage.getItem('JYS_lang') || 'ZHS';
    return i18n.messages[locale].markedWorks;
}
// 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法
    if (!res.data.success && res.data.errCode) {
        Message.error(returnErrorStr(res.data.errCode,getMes()));
        return {
            success: false,
            data: res.data.data
        };
    }
    return res.data;
}, (error) => {
    
    let mes = getMes();
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.setItem('YJS_UID', '');
            localStorage.setItem('YJS_isLogin', 'false');
            return {
                success: false,
                notLogin: true
            };
        } else {
            Message.error(mes.SYSbusy);
            return {
                success: false
            };
        }
    } else {
        Message.error(mes.contactFail);
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
function returnErrorStr(errCode,mes){
    switch(errCode) {
        case 'SYS.0001':
        return mes.SYS0001;

        case 'SYS.0002':
        return mes.SYS0002;

        case 'CAPTCHA.0001':
        return mes.CAPTCHA0001;

        case 'CAPTCHA.0002':
        return mes.CAPTCHA0002;

        case 'CAPTCHA.0003':
        return mes.CAPTCHA0003;
        
        case 'CAPTCHA.0004':
        return mes.CAPTCHA0004;

        case 'CAPTCHA.0006':
        return mes.CAPTCHA0006;

        case 'CAPTCHA.0007':
        return mes.CAPTCHA0007;

        case 'HTTP.0001':
        return mes.HTTP0001;

        case 'HTTP.0002':
        return mes.HTTP0002;

        case 'HTTP.0003':
        return mes.HTTP0003;

        case 'HTTP.0004':
        return mes.HTTP0004;

        case 'IMG.0001':
        return mes.IMG0001;

        case 'SMS.0001':
        return mes.SMS0001;

        case 'USER.0001':
        return mes.USER0001;

        case 'USER.0002':
        return mes.USER0002;

        case 'USER.0003':
        return mes.USER0003;

        case 'USER.0004':
        return mes.USER0004;
        
        case 'USER.0005': 
        return mes.USER0005;

        case 'USER.0006':
        return mes.USER0006;

        case 'USER.0007': 
        return mes.USER0007;

        case 'USER.0008':
        return mes.USER0008;

        case 'USER.0009':
        return mes.USER0009;

        case 'USER.0012':
        return mes.USER0012;

        case 'USER.0013':
        return mes.USER0013;

        case 'USER.0014':
        return mes.USER0014;

        case 'USER.0015':
        return mes.USER0015;

        case 'DB.0001':
        return mes.DB0001;

        case 'DB.0002':
        return mes.DB0002;

        case 'ACCT.0001':
        return mes.ACCT0001;

        case 'ACCT.0002':
        return mes.ACCT0002;

        case 'ACCT.0003':
        return mes.ACCT0003;

        case 'ACCT.0004':
        return mes.ACCT0004;

        case 'ACCT.0005':
        return mes.ACCT0005;

        case 'ACCT.0013':
        return mes.ACCT0013;

        case 'CC.0001':
        return mes.CC0001;
        
        case 'PIRCE.0001':
        return mes.PIRCE0001;

        case 'WALLET.0001':
        return mes.WALLET0001;

        case 'WALLET.0002':
        return mes.WALLET0002;

        case 'WALLET.0003':
        return mes.WALLET0003;

        case 'BTC.0001':
        return mes.BTC0001;

        case 'BTC.0002':
        return mes.BTC0002;

        case 'ETH.0001':
        return mes.ETH0001;

        case 'ETH.0002':
        return mes.ETH0002;

        case 'ETH.0003':
        return mes.ETH0003;

        case 'LT.00001':
        return mes.LT00001;

        case 'LT.00002':
        return mes.LT00002;

        case 'LT.00003':
        return mes.LT00003;

        case 'LT.00004':
        return mes.LT00004;

        case 'LT.00005':
        return mes.LT00005;

        case 'LT.00006':
        return mes.LT00006;

        case 'LT.00007':
        return mes.LT00007;

        case 'ORDER.0001':
        return mes.ORDER0001;

        case 'ORDER.0002':
        return mes.ORDER0002;

        case 'ORDER.0003':
        return mes.ORDER0003;

        case 'ORDER.0004':
        return mes.ORDER0004;

        case 'ORDER.0005':
        return mes.ORDER0005;

        case 'ORDER.0006':
        return mes.ORDER0006;

        case 'EMAIL.0003':
        return mes.EMAIL0003;//

        case 'EMAIL.0004':
        return mes.EMAIL0004;

        case 'CURRENCY.0001':
        return mes.CURRENCY0001;

        case 'SWTC.0004':
        return mes.SWTC0004;
        
        default:
        return mes.default;
        break;
    }
}
export default http;