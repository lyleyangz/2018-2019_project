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
        },
        passTip: 'Real name authentication information has been passed!'
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
        remark1: '（For log-in/change security settings/authentication when withdrawing coins）',//
        remark2: '（Change security settyings/authentication when withdrawing coins）',//
        remark3: 'Please complete the real name authentication first',
        remark4: 'Copy Success',
        remark5: '（For trading/change security settings/authentication when withdrawing coins）',//
        title1: 'Basic settings',//
        title2: 'Multiple settigs ',//
        title3: 'Log-in history',//
        log: {
            lb1: "Time",
            lb2: "Status",
            lb3: "Success",
            lb4: "Wrong Password",
            btn1: "Prev",
            btn2: "Next"
        },
        modal: {
            title: "Security certification",
            mes1: "Please enter mobile verification code",
            mes2: "Please enter Email verification code",
            mes3: "Please enter transaction password",
            mes4: "Please enter your email address",//
            mes5: "Please enter the correct email fomat",//
            senText: "Send verification code",
            sendSuccess: "Send success",
            operSuccess: "Successful",
            btn: "confirm",
            sendIn: 'Send in...',
            bindSuccess: "Bind succeeded"//
        },
        close:{
            title: "Operation tips",
            content1: "You must have real-name authentication to change the security settings, do you want to go？",
            content2: "You must have a funding password to change the security settings, do you want to go？",
        }
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
        lb1: 'Has invited',
        lb2: 'A friend',
        lb3: 'Gain',
        lb4: 'Rebate rewards',
        lb5: "People's index spike platform",
        lb6: 'User',
        lb7: 'My invitation code',
        lb8: 'My invitation link',
        lb9: 'I have been trading digital currency on Bitone for a while.',
        lb10: 'Feeling is a reliable platform, share it with you',
        lb11: 'Come to release your network energy, win a good friend',
        lb12: 'Transaction Fees',
        tipTitle: 'activity description',
        tip1: '1.After the friend accepts the invitation to register successfully, each transaction fee will generate 10% rebate',
        tip2: '2.The rebate currency is the currency of the inviter to trade,',
        tip3: '3.The rebate is calculated in real time. If the single rebate is too small as the platform will display',
        tip4: '4.The invitee withdraws and other handling fees do not participate in the rebate',
        tip5: '5.If the rules of the event change, the official announcement of BItone will prevail. The final interpretation is owned by Bitone',
        btn: 'Copy'
    },//
    setEmail: {
        tipTitle: "Set up mailbox information",
        tip1: "1.Enter your email address and get the verification code",
        tip2: "2.Click to bind immediately"
    },
    guide:{
        title: "safe boot",
        tip: "To protect your funds, you can complete the following security certifications before you can trade and withdraw cash"
    }
}