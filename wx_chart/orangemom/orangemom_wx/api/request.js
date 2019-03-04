const config = require('./../utils/config.js')
function request(data = {
    url: '',
    method: '',
    params: ''
}, domain = null) {
    console.log(domain || config.api)
    console.log(data.params)
    if (data.method === "post") {
        return new Promise(function (resolve, reject) {
            wx.request({
                url: (domain || config.api) + data.url,
                method: 'POST',
                data: data.params,
                header: { 'content-type': 'application/json' },
                success: function (res) {
                    if (res.statusCode === 200) {
                        resolve(res.data);
                        return false;
                    }
                    wx.showToast({
                        title: '请求接口失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        });
        // get
    } else if (data.method === "get") {
        return new Promise(function (resolve, reject) {
            wx.request({
                url: config.api + data.url,
                method: 'GET',
                data: data.params,
                header: { 'content-type': 'application/json' },
                success: function (res) {
                    if (res.statusCode === 200) {
                        resolve(res.data);
                        return false;
                    }
                    wx.showToast({
                        title: '请求接口失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        });
    } 
};


module.exports = request;