export default {
    pageTitle: '個人中心',
    identity: {
        idVerNotice: {
            title: '身份認證',
            desc: '正確填寫身份信息，將保障您的賬號安全，當賬號被盜或需要找回時進行申訴的必須條件',
            stepTitle1: '填寫身份信息',
            stepTitle2: '完善資料',
            stepTitle3: '認證成功',
        },
        step: {
            label1: '姓名' ,
            label2: '證件類型',
            label3: '居民身份證',
            label4: '證件號碼',
            label5: '證件正面照',
            label6: '證件反面照',
            label7: '手持證件照',
            placeholder1: '請輸入您的姓名',
            placeholder2: '請輸入您的證件號碼',
            button1: '提交',
            button2: '點擊上傳',
            remark1: '證件上所有信息清晰可見，不允許任何修改或遮擋，必須能看清證件號和姓名',
            remark2: '請輸入姓名',
            remark3: '請上傳身份證正面照',
            remark4: '請上傳身份證反面照',
            remark5: '請上傳手持身份證照',
            remark6: '請輸入您的身份證號碼'
        }
    },
    safe: {
        label3: '手機號碼',
        label4: '登錄密碼',
        label5: '資金密碼',
        label6: '郵箱',

        cnt1: '已設置',
        cnt2: '未設置',
        button1: '修改密碼',
        button2: '去設置',
        button3: '忘記密碼',
        button4: '開啓驗證',
        button5: '關閉驗證',
        button6: '設置郵箱',

        remark1: '（用于登錄/更改安全設置/提幣時做身份驗證）',
        remark2: '（用于更改安全設置/提幣時做身份驗證）',
        remark3: '請先進行實名認證！',
        remark4: '複制成功！',
        remark5: '（用于交易/更改安全設置/提幣時做身份驗證）',
        title1: '基本設置',
        title2: '多重驗證',
        title3: '登錄曆史',
        log: {
            lb1: "時間",
            lb2: "狀態",
            lb3: "成功",
            lb4: "密碼錯誤",
            btn1: "上一頁",
            btn2: "下一頁"
        },
        modal: {
            title: "安全認證",
            mes1: "請輸入手機驗證碼",
            mes2: "請輸入郵箱驗證碼",
            mes3: "請輸入資金密碼",
            senText: "發送驗證碼",
            sendSuccess: "發送驗發送成功",
            operSuccess: "操作成功",
            btn: "確定"
        }
    },
    forgetPayPassword: {
        fppNotice: {
            title: '找回資金密碼',
            stepTitle1: '驗證手機號',
            stepTitle2: '設置新密碼',
            stepTitle3: '修改成功'
        },
        step1: {
            label1: '驗證方式',
            label2: '手機號',
            label3: '電子郵箱',
            option1: '手機驗證',
            option2: '郵箱驗證',
            placeholder: '請輸入驗證碼',
            button: '下壹步'
        },
        step2: {
            label1: '新密碼',
            label2: '確認新密碼',
            placeholder: '請輸入新密碼（6位純數字）',
            button: '立即修改'
        },
        step3: {
            success: '密碼修改成功，3s後返回'
        },
        remark: {
            title: '找回資金密碼須知',
            getCode: '1.獲取原手機驗證碼',
            next: '2.點擊下壹步',
            newPassword: '1.輸入新密碼，確認新密碼',
            modify: '2.點擊立即修改',
            senCodeSuccess: '驗證碼發送成功',
            timeAfterReset: '秒後重試'
        },
        alertMes: {
            mes1: '請輸入驗證碼',
            mes2: '請輸入新密碼',
            mes3: '新密碼格式為6位純數字',
            mes4: '請再次輸入新密碼',
            mes5: '兩次輸入密碼不壹致，請重新輸入',
            mes6: '請輸入郵箱'
        },
        cnt: {
            verityTypeCode1: '短信驗證碼',
            verityTypeCode2: '郵箱驗證碼',
            sendText: '發送驗證碼'
        }  
    },
    setPayPassword: {
        title: '設置資金密碼',
        label1: '手機號',
        label2: '短信驗證碼',
        label3: '新密碼',
        label4: '確認新密碼',
        placeholder1: '請輸入驗證碼',
        placeholder2: '請輸入資金密碼（6位純數字）',
        placeholder3: '請再次輸入資金密碼（6位純數字）',
        button: '立即設置',
        remark: {
            title: '設置密碼須知',
            para1: '1.輸入手機驗證碼',
            para2: '2.輸入資金密碼，並確認新密碼',
            para3: '3.點擊立即設置'
        },
        cnt: {
            sentText: '獲取驗證碼',
            timeAfterReset: '秒後重試'
        },
        alertMes: {
            mes1: '驗證碼發送成功',
            mes2: '請輸入短信驗證碼',
            mes3: '請輸入資金密碼',
            mes4: '新密碼格式為6位純數字',
            mes5: '請再次輸入密碼',
            mes6: '兩次輸入密碼不壹致，請重新輸入',
            success: '設置成功'
        }
    },
    updateLoginPassword: {
        title: '修改登錄密碼',
        label1: '原密碼',
        label2: '新密碼',
        label3: '確認新密碼',
        placeholder1: '請輸入原密碼',
        placeholder2: '請輸入新密碼，包含（大小寫字母、數字、長度6~20位）',
        placeholder3: '請再次輸入新密碼',
        button: '立即修改',
        remark: {
            title: '修改密碼須知',
            para1: '1.輸入原登錄密碼;',
            para2: '2.設置新密碼，並確認新密碼，點擊立即修改;'
        },
        alertMes: {
            mes1: '請輸入原密碼',
            mes2: '請輸入新密碼',
            mes3: '新密碼長度為6-20位',
            mes4: '請再次輸入新密碼',
            mes5: '兩次輸入密碼不壹致，請重新輸入',
            success: '修改成功'
        }
    },
    updatePayPassword: {
        title: '修改資金密碼',
        label1: '原密碼',
        label2: '新密碼',
        label3: '確認新密碼',
        placeholder1: '請輸入原密碼（6位純數字）',
        placeholder2: '請輸入新密碼（6位純數字）',
        placeholder3: '請再次輸入新密碼（6位純數字）',
        button: '立即修改',
        remark: {
            title: '修改資金密碼須知',
            para1: '1.輸入原資金密碼;',
            para2: '2.設置新密碼，並確認新密碼，點擊立即修改;'
        },
        alertMes: {
            mes1: '請輸入原密碼',
            mes2: '請輸入新密碼',
            mes3: '新密碼格式為6位純數字',
            mes4: '請再次輸入新密碼',
            mes5: '兩次輸入密碼不壹致，請重新輸入',
            success: '修改成功'
        }
    },
    rebate: {
        lb1: '已邀請',
        lb2: '位好友',
        lb3: '獲得',
        lb4: '返利獎勵',
        lb5: '人脈指數秒殺平台',
        lb6: '用戶',
        lb7: '我的專屬邀請碼',
        lb8: '我的邀請鏈接',
        lb9: '我在Bitone數字貨幣交易所做交易有一段時間了',
        lb10: '感覺是一家靠譜的平台，分享給你感受一下',
        tipTitle: '活動說明',
        tip1: '1.好友接受邀請注冊成功後，每一筆交易手續費，都會産生10%的返利',
        tip2: '2.返利幣種爲邀請人交易所得幣種',
        tip3: '3.返利爲實時計算到賬，若單筆返利過小，平台累計顯示',
        tip4: '4.被邀請人提現及其他手續費不參與返利',
        tip5: '5.活動規則若有變，以BItone官網公布爲准。最終解釋權歸Bitone所有',
        btn: '複制'
    },//
    setEmail: {
        tipTitle: "設置郵箱須知",
        tip1: "1.輸入電子郵箱，並獲取驗證碼",
        tip2: "2.點擊立即綁定"
    }
    
}