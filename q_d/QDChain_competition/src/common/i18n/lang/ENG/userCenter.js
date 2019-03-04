export default {
    pageTitle: 'User Center',
    identity: {
        idVerNotice: {
            title: 'Authentication',
            desc: 'The correct filling of the identity information will ensure your account security, and when the account is stolen or needs to be retrieved, it will be the necessary condition to make a complaint.',
            stepTitle1: 'Fill in identity information',
            stepTitle2: 'Complete Information',
            stepTitle3: 'Authentication Success',
        },
        step: {
            label1: 'Name' ,
            label2: 'ID Type',
            label3: 'ID card',
            label4: 'ID Number',
            label5: 'ID card front photo',
            label6: 'ID card back photo',
            label7: 'Hand-held ID photo',
            placeholder1: 'Please enter your name',
            placeholder2: 'Please enter you ID number',
            button1: 'Submit',
            button2: 'Click to upload',
            remark1: 'All the information on the ID card is clearly visible, no modification or alter is allowed, and the ID number and name must be clearly visible',
            remark2: 'Please enter your name',
            remark3: 'Please upload ID card front photo',
            remark4: 'Please upload ID card back photo',
            remark5: 'Please upload Hand-held ID photo',
            remark6: 'Please enter your ID'
        }
    },
    safe: {
        label3: 'Mobile No.',
        label4: 'Password',
        label5: 'Transaction Password',
        label6: 'Email',
      
        cnt1: 'Has been set',
        cnt2: 'Not Set',
        button1: 'Change Password',
        button2: 'Go to set',
        button3: 'Forget Password',
        button4: 'Open Verification',//  
        button5: 'Close Verification',//
        button6: 'Setting Email',//
        remark1: '（用于登录/更改安全设置/提币时做身份验证）',//
        remark2: '（用于更改安全设置/提币时做身份验证）',//
        remark3: 'Please complete the real name authentication first',
        remark4: 'Copy Success',
        remark5: '（用于交易/更改安全设置/提币时做身份验证）',//
        title1: '基本设置',//
        title2: '多重验证',//
        title3: '登录历史',//
        log: {
            lb1: "Time",
            lb2: "Status",
            lb3: "Success",
            lb4: "Wrong Password",
            btn1: "Prev",
            btn2: "Next"
        },//
        modal: {
            title: "安全认证",
            mes1: "Please enter mobile verification code",
            mes2: "Please enter Email verification code",
            mes3: "Please enter transaction password",
            senText: "Send verification code",
            sendSuccess: "Verification code sent successfully",
            operSuccess: "Successful",
            btn: "confirm"
        }//
    },
    forgetPayPassword: {
        fppNotice: {
            title: 'Retrieve transaction password',
            stepTitle1: 'Mobile Verification',
            stepTitle2: 'Set new password',
            stepTitle3: 'modify Success'
        },
        step1: {
            label1: 'Authentication Success',
            label2: 'Mobile No.',
            label3: 'Email',
            option1: 'Mobile Verification',
            option2: 'Email Verification',
            placeholder: 'Please enter verification code',
            button: 'Next'
        },
        step2: {
            label1: 'New Password',
            label2: 'Confirm Password',
            placeholder: 'Please enter new password (6 digits number)',
            button: 'Change'
        },
        step3: {
            success: 'Password change successful, return after 3s'
        },
        remark: {
            title: 'Retrieve transaction password notice',
            getCode: '1. Get mobile verification code',
            next: '2. Click next',
            newPassword: '1. Enter new password and confirm',
            modify: '2. Click to change',
            senCodeSuccess: 'Verification code sent successfully',
            timeAfterReset: 'Retry after   seconds'
        },
        alertMes: {
            mes1: 'Please enter verification code',
            mes2: 'Please enter new password',
            mes3: 'New password format is 6 digits number',
            mes4: 'Please confirm new password',
            mes5: 'Passwords do not match, please enter again',
            mes6: 'Please enter Email'
        },
        cnt: {
            verityTypeCode1: 'SMS Verification Code',
            verityTypeCode2: 'Email verification code',
            sendText: 'Send verification code'
        }  
    },
    setPayPassword: {
        title: 'Set transaction password',
        label1: 'Mobile No',
        label2: 'SMS Verification Code',
        label3: 'New Password',
        label4: 'Confirm new password',
        placeholder1: 'Please enter verification code',
        placeholder2: 'Please enter transaction password (6 digits number)',
        placeholder3: 'Please enter transaction password (6 digits number)',
        button: 'Set',
        remark: {
            title: 'Set password notice',
            para1: '1. Enter mobile verification code',
            para2: '2. Enter transaction password and confirm',
            para3: '3. Click to set'
        },
        cnt: {
            sentText: 'Get verification code',
            timeAfterReset: 'Retry after   seconds'
        },
        alertMes: {
            mes1: 'Verification code sent successfully',
            mes2: 'Please enter SMS verification code',
            mes3: 'Please enter transaction password',
            mes4: 'New password format is 6 digits number',
            mes5: 'Please confirm new password',
            mes6: 'Passwords do not match, please enter again',
            success: 'Setup Successful'
        }
    },
    updateLoginPassword: {
        title: 'Change Password',
        label1: 'Original Password',
        label2: 'New Password',
        label3: 'Confirm new password',
        placeholder1: 'Please enter original password (between 6-20 digits)',
        placeholder2: 'Please enter new password (between 6-20 digits)',
        placeholder3: 'Please confirm new password (between 6-20 digits)',
        button: 'Click to change',
        remark: {
            title: 'Change password notice',
            para1: '1. Enter original password;',
            para2: '2. Enter new password, confirm and click to change;'
        },
        alertMes: {
            mes1: 'Please enter original password',
            mes2: 'Please enter new password',
            mes3: 'New password should between 6-20 digits',
            mes4: 'Please confirm new password',
            mes5: 'Passwords do not match, please enter again',
            success: 'Change Successfully'
        }
    },
    updatePayPassword: {
        title: 'Change transaction password',
        label1: 'Original Password',
        label2: 'New Password',
        label3: 'Confirm new password',
        placeholder1: 'Please enter original password (6 digits number)',
        placeholder2: 'Please enter new password (6 digits number)',
        placeholder3: 'Please confirm new password (6 digits number)',
        button: 'Click to change',
        remark: {
            title: 'Change transaction password notice',
            para1: '1. Please enter original transaction password;',
            para2: '2. Enter new password, confirm and click to change;'
        },
        alertMes: {
            mes1: 'Please enter original password',
            mes2: 'Please enter new password',
            mes3: 'New password format is 6 digits number',
            mes4: 'Please confirm new password',
            mes5: 'Passwords do not match, please enter again',
            success: 'Change Successfully'
        }
    },
    rebate: {
        lb1: '已邀请',
        lb2: '位好友',
        lb3: '获得',
        lb4: '返利奖励',
        lb5: '人脉指数秒杀平台',
        lb6: 'User',
        lb7: 'My invitation code',
        lb8: 'My invitation link',
        lb9: '我在Bitone数字货币交易所做交易有一段时间了',
        lb10: '感觉是一家靠谱的平台，分享给你感受一下',
        tipTitle: '活动说明',
        tip1: '1.好友接受邀请注册成功后，每一笔交易手续费，都会产生10%的返利',
        tip2: '2.返利币种为邀请人交易所得币种',
        tip3: '3.返利为实时计算到账，若单笔返利过小，平台累计显示',
        tip4: '4.被邀请人提现及其他手续费不参与返利',
        tip5: '5.活动规则若有变，以BItone官网公布为准。最终解释权归Bitone所有',
        btn: 'Copy'
    },//
    setEmail: {
        tipTitle: "设置邮箱须知",
        tip1: "1.输入电子邮箱，并获取验证码",
        tip2: "2.点击立即绑定"
    }
}