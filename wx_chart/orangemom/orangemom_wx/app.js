const user = require('./api/user.js')
//app.js
App({
    onLaunch: function () {
        wx.showLoading({
            title: '加载中',
        })

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        lang:'zh_CN',
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;
                            
                            this.addUser(res.userInfo)
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                   
                }else{
                    wx.redirectTo({
                        url: "/pages/auth/index"
                    })
                }
            }
        })
    },
    addUser(userInfo) {
        // 登录
        wx.login({
            success: res => {
                user.getOpenId({
                    appid: "wxe21b8dc57a8a294b",
                    secret: "be60faf97b8e9d48465c4adb52996eb1",
                    "code": res.code
                }).then(res => {
                    var systemInfo = {}
                    try {
                        systemInfo = wx.getSystemInfoSync()
                    } catch (e) {
                        // Do something when catch error
                    }
                    console.log(userInfo)
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
                        console.log(res)
                        wx.redirectTo({
                            url: "/pages/home/index"
                        })
                    })
                })
            }
        })
    },
    globalData: {
        userInfo: null
    }
})