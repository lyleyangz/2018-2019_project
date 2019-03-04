export default {
    buy:{
        title:"CNY Buying",
        input:{
            lb1:"Price",
            lb2:"Quantity",
            lb3:"Amount",
            lb4:"Select vendor",
            btn:"Buy"
        },
        remark:{
            tip:"OTC Announcement:",
            rm1:"1. All vendors are certified and guaranteed by digital assets.",
            rm2:"2. The order will be cancelled if the payment was not completed with 30 minutes.",
            rm3:"3. The minimum purchase amount is 1000CNY",
            rm4:"4. If you have not received the digital assets with 30 minutes after completed the transfer and confirmation routines in weekdays, please contact customer service for support.",
            rm5:"5. If any falsification occurred on transfer routine, the client account will be prohibited once verified.",
            rm6:"6. The regular trading time is between 10:00 to 21:00, the orders placed on other time will be postponed to the next workday.",
            rm7:"7. Please avoid to transfer more than 50 thousands CNY after 17:00 or on weekends, otherwise the digital assets might be credited late into account.",
        },
        business:{
            lb1: "Name",
            lb2: "ID number",
            lb3: "Working years",
            lb4: "Digital assets guaranteed by platform",
            lb5: "Average response time",
        },
        errMes:{
            mes1: "Please enter quantity",
            mes2: "The quantity must numbers",
            mes3: "Please select vendor"
        }
    },
    pay:{
        order:{
            min: "Minute",
            second: "Seconds",
            lb1: "Remaining payment time",
            lb2: "Order",
            lb3: "Price",
            lb4: "Quantity",
            lb5: "Amount",
            lb6: "View order >>"
        },
        type:{
            title: "Payment method",
            tip1: "Please not to click the complete button if you did not finish the transfer, otherwise the client account will be prohibited",
            type1: "Online Banking",
            tip2: "(Apply to block trade)",
            type2: "Wechat",
            type3: "Alipay",
            remark: "Please add comments when making payment",
            copy: "Copy",
        },
        model: {
            title: "Confirm payment",
            cnt: "Please confirm the payment and choose your payment method. Please mind that falsification on payment will leads to an account prohibited.",
            type1: "Wechat",
            type2: "Alipay",
            type3: "Online Banking",
            close: "Close"
        },
        cancel:{
            title: "Action confirmed",
            content: "Are you going to cancel the current order?",
            success: "Cancellation successful"
        },
        errMes:{
            mes1: "Cannot find this order",
            mes2: "Please choose a payment method"
        },
        btn1: "Payment complete",
        btn2: "Cancel order",
    },
    result:{
        cnt: "The vendor has been informed to delivery, please wait.",
        btn: "Continue buying"
    }
}