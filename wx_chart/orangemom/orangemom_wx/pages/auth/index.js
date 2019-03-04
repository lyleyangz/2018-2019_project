const user = require('./../../api/user.js')
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {}
    },

    onLoad: function () {
       
    },
    addUser(userInfo) {
        // 登录
        wx.login({
            success: res => {
                console.log(res.code)
                user.getOpenId({
                    appid: "wxe21b8dc57a8a294b",
                    secret: "be60faf97b8e9d48465c4adb52996eb1",
                    "code": res.code
                }).then(res => {
                    var systemInfo = {}
                    try {
                        systemInfo = wx.getSystemInfoSync()
                        console.log(systemInfo.model)
                    } catch (e) {
                        // Do something when catch error
                    }
                    user.add({
                        openId: res.openid,
                        avatarUrl: userInfo.avatarUrl,
                        gender: userInfo.gender,
                        language: userInfo.language,
                        nickName: userInfo.nickName,
                        country: userInfo.country,
                        province: userInfo.province,
                        city: userInfo.city,
                        equipmentModel: systemInfo.model
                    }).then(res => {

                    })
                })
            }
        })
    },
    getUserInfo: function (e) {
        this.addUser(e.detail.userInfo);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo
        })
        wx.redirectTo({
            url: "/pages/home/index"
        })
    },

})
