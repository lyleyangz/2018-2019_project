export default {
    pageTitle: '个人中心',
    identity: {
        idVerNotice: {
            title: '身份认证',
            desc: '正确填写身份信息，将保障您的账号安全，当账号被盗或需要找回时进行申诉的必须条件',
            stepTitle1: '填写身份信息',
            stepTitle2: '完善资料',
            stepTitle3: '认证成功',
        },
        step: {
            label1: '姓名' ,
            label2: '证件类型',
            label3: '居民身份证',
            label4: '证件号码',
            label5: '证件正面照',
            label6: '证件反面照',
            label7: '手持证件照',
            placeholder1: '请输入您的姓名',
            placeholder2: '请输入您的证件号码',
            button1: '提交',
            button2: '点击上传',
            remark1: '证件上所有信息清晰可见，不允许任何修改或遮挡，必须能看清证件号和姓名',
            remark2: '请输入姓名',
            remark3: '请上传身份证正面照',
            remark4: '请上传身份证反面照',
            remark5: '请上传手持身份证照',
            remark6: '请输入您的身份证号码'
        }
    },
    safe: {
        label3: '手机号码',
        label4: '登录密码',
        label5: '资金密码',
        label6: '邮箱',//

        cnt1: '已设置',
        cnt2: '未设置',
        button1: '修改密码',
        button2: '去设置',
        button3: '忘记密码',
        button4: '开启验证',//  
        button5: '关闭验证',//
        button6: '设置邮箱',//

        remark1: '（用于登录/更改安全设置/提币时做身份验证）',//
        remark2: '（用于更改安全设置/提币时做身份验证）',//
        remark3: '请先进行实名认证！',
        remark4: '复制成功！',
        remark5: '（用于交易/更改安全设置/提币时做身份验证）',//
        title1: '基本设置',//
        title2: '多重验证',//
        title3: '登录历史',//
        log: {
            lb1: "时间",
            lb2: "状态",
            lb3: "成功",
            lb4: "密码错误",
            btn1: "上一页",
            btn2: "下一页"
        },//
        modal: {
            title: "安全认证",
            mes1: "请输入手机验证码",
            mes2: "请输入邮箱验证码",
            mes3: "请输入资金密码",
            senText: "发送验证码",
            sendSuccess: "验证码发送成功",
            operSuccess: "操作成功",
            btn: "确定"
        }//
    },
    forgetPayPassword: {
        fppNotice: {
            title: '找回资金密码',
            stepTitle1: '验证手机号',
            stepTitle2: '设置新密码',
            stepTitle3: '修改成功'
        },
        step1: {
            label1: '验证方式',
            label2: '手机号',
            label3: '电子邮箱',
            option1: '手机验证',
            option2: '邮箱验证',
            placeholder: '请输入验证码',
            button: '下一步'
        },
        step2: {
            label1: '新密码',
            label2: '确认新密码',
            placeholder: '请输入新密码（6位纯数字）',
            button: '立即修改'
        },
        step3: {
            success: '密码修改成功，3s后返回'
        },
        remark: {
            title: '找回资金密码须知',
            getCode: '1.获取原手机验证码',
            next: '2.点击下一步',
            newPassword: '1.输入新密码，确认新密码',
            modify: '2.点击立即修改',
            senCodeSuccess: '验证码发送成功',
            timeAfterReset: '秒后重试'
        },
        alertMes: {
            mes1: '请输入验证码',
            mes2: '请输入新密码',
            mes3: '新密码格式为6位纯数字',
            mes4: '请再次输入新密码',
            mes5: '两次输入密码不一致，请重新输入',
            mes6: '请输入邮箱',
        },
        cnt: {
            verityTypeCode1: '短信验证码',
            verityTypeCode2: '邮箱验证码',
            sendText: '发送验证码'
        }  
    },
    setPayPassword: {
        title: '设置资金密码',
        label1: '手机号',
        label2: '短信验证码',
        label3: '新密码',
        label4: '确认新密码',
        placeholder1: '请输入验证码',
        placeholder2: '请输入资金密码（6位纯数字）',
        placeholder3: '请再次输入资金密码（6位纯数字）',
        button: '立即设置',
        remark: {
            title: '设置密码须知',
            para1: '1.输入手机验证码',
            para2: '2.输入资金密码，并确认新密码',
            para3: '3.点击立即设置'
        },
        cnt: {
            sentText: '获取验证码',
            timeAfterReset: '秒后重试'
        },
        alertMes: {
            mes1: '验证码发送成功',
            mes2: '请输入短信验证码',
            mes3: '请输入资金密码',
            mes4: '新密码格式为6位纯数字',
            mes5: '请再次输入密码',
            mes6: '两次输入密码不一致，请重新输入',
            success: '设置成功'
        }
    },
    updateLoginPassword: {
        title: '修改登录密码',
        label1: '原密码',
        label2: '新密码',
        label3: '确认新密码',
        placeholder1: '请输入原密码',
        placeholder2: '请输入新密码，包含（大小写字母、数字、长度6~20位）',
        placeholder3: '请再次输入新密码',
        button: '立即修改',
        remark: {
            title: '修改密码须知',
            para1: '1.输入原登录密码;',
            para2: '2.设置新密码，并确认新密码，点击立即修改;'
        },
        alertMes: {
            mes1: '请输入原密码',
            mes2: '请输入新密码',
            mes3: '新密码长度为6-20位',
            mes4: '请再次输入新密码',
            mes5: '两次输入密码不一致，请重新输入',
            success: '修改成功'
        }
    },
    updatePayPassword: {
        title: '修改资金密码',
        label1: '原密码',
        label2: '新密码',
        label3: '确认新密码',
        placeholder1: '请输入原密码（6位纯数字）',
        placeholder2: '请输入新密码（6位纯数字）',
        placeholder3: '请再次输入新密码（6位纯数字）',
        button: '立即修改',
        remark: {
            title: '修改资金密码须知',
            para1: '1.输入原资金密码;',
            para2: '2.设置新密码，并确认新密码，点击立即修改;'
        },
        alertMes: {
            mes1: '请输入原密码',
            mes2: '请输入新密码',
            mes3: '新密码格式为6位纯数字',
            mes4: '请再次输入新密码',
            mes5: '两次输入密码不一致，请重新输入',
            success: '修改成功'
        }
    },
    rebate: {
        lb1: '已邀请',
        lb2: '位好友',
        lb3: '获得',
        lb4: '返利奖励',
        lb5: '人脉指数秒杀平台',
        lb6: '用户',
        lb7: '我的专属邀请码',
        lb8: '我的邀请链接',
        lb9: '我在Bitone数字货币交易所做交易有一段时间了',
        lb10: '感觉是一家靠谱的平台，分享给你感受一下',
        tipTitle: '活动说明',
        tip1: '1.好友接受邀请注册成功后，每一笔交易手续费，都会产生10%的返利',
        tip2: '2.返利币种为邀请人交易所得币种',
        tip3: '3.返利为实时计算到账，若单笔返利过小，平台累计显示',
        tip4: '4.被邀请人提现及其他手续费不参与返利',
        tip5: '5.活动规则若有变，以BItone官网公布为准。最终解释权归Bitone所有',
        btn: '复制'
    },//
    setEmail: {
        tipTitle: "设置邮箱须知",
        tip1: "1.输入电子邮箱，并获取验证码",
        tip2: "2.点击立即绑定"
    }
}