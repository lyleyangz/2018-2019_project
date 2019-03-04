import axios from "axios"
import qs from "qs"
import iview from "iview"
import i18n from '@common/i18n'



// 提示框设置
iview.Message.config({
    top: 400,
    duration: 3
})

// 根据域名判断请求的接口
const baseUrl = '/bigdata-open-api';

// 允许带上cookie
axios.defaults.withCredentials = true;
const instance = axios.create({
    timeout: 1000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});
// 请求拦截器
axios.interceptors.request.use((config) => {
    let loginKey = localStorage.getItem('QB_systemLoginKey');
    if (loginKey) {
        config.headers['flame-token'] = loginKey;
    }
    return config;
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
        let localType = i18n.locale;
        let markedWords = {};
        if (localType == 'ENG') {
            markedWords = i18n.messages.ENG.markedWords
        } else {
            markedWords = i18n.messages.ZHS.markedWords
        };
        iview.Message.error(markedWords.SystemError);
        return {
            success: false
        };
    } else {
        let localType = i18n.locale;
        let markedWords = {};
        if (localType == 'ENG') {
            markedWords = i18n.messages.ENG.markedWords
        } else {
            markedWords = i18n.messages.ZHS.markedWords
        };
        iview.Message.error(markedWords.ConnectionFailed);
        return {
            success: false
        };
    }

    // 对响应错误做处理
    // return Promise.reject(error);
});
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function http(data = {
    url: '',
    method: '',
    params: {}
}, withQs = false) {
    if (data.method === "post") {
        const fParams = withQs ? qs.stringify(data.params) : data.params;
        return axios.post(baseUrl + data.url + `?t=${Math.random()}`, fParams);
        // get
    } else if (data.method === "get") {
        return axios.get(baseUrl + data.url + `?t=${Math.random()}`, {
            params: data.params
        })
    }
};

function replaceParam(str, ...params) {
    for (var index in params) {
        str = str.replace("{" + index + "}", params[index]);
    }
    return str;
}

function returnErrorStr(errCode) {
    let localType = i18n.locale;
    let markedWords = {};
    if (localType == 'ENG') {
        markedWords = i18n.messages.ENG.markedWords
    } else {
        markedWords = i18n.messages.ZHS.markedWords
    };
    switch (errCode) {
        case 'SYS.0001':
            return markedWords.SYS0001;

        default:
            return markedWords.requestError;
            break;
    }
}
export default http;