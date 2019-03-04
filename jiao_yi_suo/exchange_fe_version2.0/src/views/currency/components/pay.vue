<template>
    <div>
        <div class="pay" :class="$i18n.locale">
            <div class="order">
                
                <div class="status">
                    <label v-if="orderDetail.status!==6">{{orderDetail.status | orderStatus}}</label>
                    <label v-if="orderDetail.status===6">{{$t('currency.pay.order.lb1')}} <em>{{ Math.floor(time/60)}}</em> {{$t('currency.pay.order.min')}} <em>{{time%60}}</em> {{$t('currency.pay.order.second')}}</label>
                </div>
                <ul class="cnt">
                    <li>
                        <span class="lb">{{$t('currency.pay.order.lb2')}}</span>
                        <span class="content">{{orderDetail.id}}</span>
                    </li>
                    <li>
                        <span class="lb">{{$t('currency.pay.order.lb3')}}</span>
                        <span class="content"><label class="num">{{orderDetail.price}}</label>CNY</span>
                    </li>
                    <li>
                        <span class="lb">{{$t('currency.pay.order.lb4')}}</span>
                        <span class="content">{{orderDetail.quantity}}</span>
                    </li>
                    <li>
                        <span class="lb">{{$t('currency.pay.order.lb5')}}</span>
                        <span class="content"><label class="num">{{orderDetail.amount}}</label>CNY</span>
                    </li>
                    <li class="detail">
                        <a class="a-btn" @click="goOrder">{{$t('currency.pay.order.lb6')}}</a>
                    </li>
                </ul>
            </div>
            
            <div class="payment" v-if="orderDetail.sellerInfo">
                <div class="title">
                    <span>{{$t('currency.pay.type.title')}} </span>
                    <span class="tip"><i></i>{{$t('currency.pay.type.tip1')}}</span>
                </div>
                <ul class="cnt">
                    <li class="unionpay">
                        <i class="icon"></i>
                        <span class="text">{{$t('currency.pay.type.type1')}} <label class="lb">{{$t('currency.pay.type.tip2')}} </label></span>
                        <span class="bank" id="banInfo">
                            {{orderDetail.sellerInfo.bankAccount.uname}} 
                            {{orderDetail.sellerInfo.bankAccount.bank}}
                            {{orderDetail.sellerInfo.bankAccount.branchBank}}
                            （{{orderDetail.sellerInfo.bankAccount.accountNo}}）
                        </span>
                        <a class="a-btn" ref="copy1" data-clipboard-action="copy" data-clipboard-target="#banInfo" @click="copy1()"  >{{$t('currency.pay.type.copy')}} </a>
                    </li>
                    <li class="wxpay">
                        <i class="icon"></i>
                        <span class="text">{{$t('currency.pay.type.type2')}} </span>
                        <span class='qrcode'>
                            <em  v-if="wxQRCode">
                                <img :src="wxQRCode">
                            </em>
                        </span>
                    </li>
                    <li class="alipay">
                        <i class="icon"></i>
                        <span class="text">{{$t('currency.pay.type.type3')}} </span>
                        <span class='qrcode' >
                            <em v-if="aliQRCode">
                                <img :src="aliQRCode">
                            </em>
                        </span>
                    </li>
                </ul>
                <div class="remark">
                    <span>{{$t('currency.pay.type.remark')}} </span><span id="payremark">{{orderDetail.payremark}}</span>
                    <a class="a-btn" ref="copy2" data-clipboard-action="copy" data-clipboard-target="#payremark" @click="copy2()"  >{{$t('currency.pay.type.copy')}} </a>
                </div>
                <div class="btn">
                    <Button type="success" class="active" @click="isShow = true">{{$t('currency.pay.btn1')}} </Button>
                    <Button type="success" @click="cancel()">{{$t('currency.pay.btn2')}} </Button>
                </div>
            </div>
        </div>
        
        <div v-if="isShow" class="my-modal">
            <div class="modal-box">
                <div class="title">{{$t('currency.pay.model.title')}}</div>
                <div class="cnt">
                    <div>{{$t('currency.pay.model.cnt')}}</div>
                     <RadioGroup class="radio" v-model="payType">
                        <Radio label="1"><span>{{$t('currency.pay.model.type1')}}</span></Radio>
                        <Radio label="2"><span>{{$t('currency.pay.model.type2')}}</span></Radio>
                        <Radio label="3"><span>{{$t('currency.pay.model.type3')}}</span></Radio>
                    </RadioGroup>
                </div>
                <div class="btn">
                    <Button type="success" class="active" @click.stop="pay()">{{$t('currency.pay.btn1')}}</Button>
                    <Button type="success" @click="isShow = false">{{$t('currency.pay.model.close')}}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getDetailBySubmit,payOrder,cancelOrder} from "@api/api_currency";
    import {Button,Spin,Notice,Message,Modal,RadioGroup,Radio} from 'iview';
    import Clipboard from 'clipboard';
    import QRCode from 'qrcode';
    export default {
       
        data() {
            return {
                isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
                orderDetail:{},
                isShow:false,
                payType: null,
                copyBtn1: null, //存储初始化复制按钮事件
                copyBtn2: null, //存储初始化复制按钮事件
                time: 1800,
                orderId:this.$route.params.orderId || 0,
                wxQRCode:null,
                aliQRCode:null
            }
        },
        created() {
            if(!this.orderId){
                this.alertNoOrder();
                return false;
            }
            this.getOrderDetail();
        },
        mounted () {
            if(!this.isLogin){
                Message.warning({
                    content: this.$t('common.notLogin'),
                    duration: 2
                });
                let goIndex = setTimeout(() => {
                    window.location.href="./index.html"
                }, 2000);
                return;
            }
        },
        methods: {
            // 订单
            getOrderDetail(callback){
                 Spin.show();
                var _this = this;
                getDetailBySubmit({
                    orderId: _this.orderId
                }).then(res => {
                    if (res.success) { 
                        if(res.data && res.data.length>0){
                            _this.orderDetail = res.data[0];
                            _this.countdown();
                            
                            _this.loadCoye(_this);
                            _this.bindQRCode();
                        }else{
                            _this.alertNoOrder();
                        }
                       
                        if(callback){
                            callback();
                        }
                    }
                    Spin.hide();
                });
            },
            alertNoOrder(){
                Notice.error({
                    title: this.$t('currency.pay.errMes.mes1')
                });
                setTimeout(() => {
                    this.$router.push({
                        name:'buy'
                    })
                }, 2000);
            },
             // 加载copy
            loadCoye(_this){
                setTimeout(function(){
                    _this.copyBtn1 = new _this.clipboard(_this.$refs.copy1);
                    _this.copyBtn2 = new _this.clipboard(_this.$refs.copy2);
                },2000)
            },
            // 复制
            copy1() {
                var _this = this;
                let clipboard = _this.copyBtn1;
                clipboard.on('success', function() {
                    Message.success(_this.$t('userCenter.safe.remark4'));
                    clipboard.destroy();
                    _this.copyBtn1 = new _this.clipboard(_this.$refs.copy1);
                });

            },
            copy2(){
                var _this = this;
                let clipboard = _this.copyBtn2;
                clipboard.on('success', function() {
                    Message.success(_this.$t('userCenter.safe.remark4'));
                    clipboard.destroy();
                    _this.copyBtn2 = new _this.clipboard(_this.$refs.copy2);
                });
            },
            // 支付
            pay(){
                if(!this.payType){
                    Message.error(this.$t('currency.pay.errMes.mes2'));
                    return false;
                }
                Spin.show();
                this.isShow = false;
                var _this = this;
                payOrder({
                    id: _this.orderId,
                    payType: _this.payType
                }).then(res => {
                    Spin.hide();
                    if (res.success) { 
                        _this.$router.push({
                            name:'result'
                        })
                    }
                })
            },
            // 订单状态，倒计时
            countdown(){
                var _this = this;
                var orderTime = this.orderDetail.orderTime;
                var total = this.time;
                function fun(){ 
                    var now = new Date().getTime();
                    var time =  parseInt(total - (now - orderTime)/1000);
                    if(time<=0){
                        clearInterval(interval);
                        return false;   
                    }
                    _this.time = time;
                }
               
                var interval = setInterval(fun,1000);
            },
            // 取消订单
            cancel(){
                var _this = this;
                Modal.confirm({
                    title: this.$t('currency.pay.cancel.title'),
                    content: this.$t('currency.pay.cancel.content'),
                    loading: true,
                    onOk: () => {
                        cancelOrder({
                            id: _this.orderId
                        }).then(res => {
                            if (res.success) { 
                                Modal.remove();
                                Message.success(this.$t('currency.pay.cancel.success'));
                                setTimeout(() => {
                                    _this.$router.push({
                                        name:'buy'
                                    })    
                                }, 2000);
                            }
                        });
                    }
                });
            },
            // 生成二维码
            bindQRCode(){
                var _this = this;
                var opts = {
                    width:128,
                    height:128
                }
                QRCode.toDataURL(_this.orderDetail.sellerInfo.weChatPay,opts).then(url => {
                    _this.wxQRCode = url;
                }).catch(err => {
                    console.error(err)
                })
                QRCode.toDataURL(_this.orderDetail.sellerInfo.alipay,opts).then(url => {
                    _this.aliQRCode = url;
                }).catch(err => {
                    console.error(err)
                })
            },
            // 跳转到发布订单页面
            goOrder(){
                location.href = "/fund.html#/OTCBill";
            },
        },
        components: {
            Button,
            Modal,
            RadioGroup,
            Radio
        }
    }
</script>
<style lang="scss"  scoped="scoped">
    .pay{
        .order{
            background-color: #fff;
            margin: 0 0 12px 0;
            padding: 26px 44px 44px 44px;
            font-size: 14px;
            color: #333;
            .status{
                text-align: right;
                line-height: 16px;
                margin-bottom: 40px;
                em{
                    font-size: 14px;
                    font-weight:500;
                    color: #b4b4d8;
                }
            }
            .cnt{
                display: flex;
                line-height: 16px;
                .lb{
                    margin-right:22px;
                    color: #999;
                }
                .content{
                    color: #666;
                    margin-right: 78px;
                    .num{
                        font-size: 16px;
                        margin-right: 10px;
                        font-weight: 600;
                    }
                }
                .detail{
                    flex: 1;
                    text-align: right;
                }
            }

        }
        .payment{
            padding: 20px 44px 100px 44px;
            background-color: #fff;
            .title{
                font-size: 16px;
                line-height: 18px;
                color: #333;
                margin-bottom: 25px;
                display: flex;
                span:nth-child(1){
                    flex: 1;
                }
                .tip{
                    font-size: 14px;
                    color: #b4b4d8;
                    i{
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        vertical-align: middle;
                        margin: -4px 5px 0 0;
                        background: url('./../../../common/assets/images/prompt1.png') no-repeat;
                    }
                }
            }
            .cnt{
                margin-bottom: 35px;
                li{
                    padding: 21px 0 ;
                    border-top: 1px dashed #ddd;
                    .icon{
                        width: 26px;
                        height: 26px;
                        display: inline-block;
                        margin: -1px 8px 0 0;
                        vertical-align: top;
                    }
                    .text{
                        width: 180px;
                        font-size: 15px;
                        color: #333;
                        display: inline-block;
                        .lb{
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .bank{
                        font-size: 14px;
                        color: #666;
                        margin-right: 70px;
                    }
                    .qrcode{
                        position: relative;
                        width: 26px;
                        height: 26px;
                        display: inline-block;
                        vertical-align: middle;
                        cursor: pointer;
                        background: url('./../../../common/assets/images/qrcode.png') no-repeat;
                    }
                }
                .unionpay{
                    .icon{
                        background: url('./../../../common/assets/images/c-unionpay.png') no-repeat;
                    }
                }
                .wxpay{
                    .icon{
                        background: url('./../../../common/assets/images/c-wxpay.png') no-repeat;
                    }
                }
                .alipay{
                    .icon{
                        background: url('./../../../common/assets/images/c-alipay.png') no-repeat;
                    }
                }
                li:nth-child(1){
                    border-top: 0
                }
            }
            .remark{
                font-size: 16px;
                span:nth-child(1){
                    color: #999;
                    margin-right: 34px;
                }
                span:nth-child(2){
                    color: #000;
                    font-weight: 600;
                    margin-right: 60px;
                }
                .a-btn{
                    border: 1px solid #ff8a00;
                    border-radius: 3px;
                    padding: 1px 9px 2px 9px;
                }
            }
            .btn{
                padding: 174px 0 0 0;
                text-align: center;
                button{
                    width: 298px;
                    height: 40px;
                    font-size: 16px;
                    border: 1px solid #ff8a00;
                    background-color: transparent;
                    color: #ff8a00;
                }
                button:nth-child(1){
                    margin-right: 18px;
                }
                .active{
                    background-color: #ff8a00;
                    color: #fff;
                }
            }
        }
        .a-btn{
            font-size: 14px;
            color: #ff8a00
        }
    }
    .ENG{
        .payment{
            .text{
                width: 260px !important;
            }
        }
    }
</style>
<style>
    .qrcode em{
        position: absolute;
        width: 130px;
        height: 130px;
        border: 1px solid #ddd;
        box-shadow: #ddd 0px 0px 10px;
        border-radius: 3px;
        background: #fff;
        text-align: center;
        z-index: 999;
        left: 54px;
        top: -15px;
        display: none;
    }
    .qrcode:hover em{
        display: block;
    }
    .qrcode em::before{
        content: '';
        position: absolute;
        width:10px; 
        height:10px; 
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        z-index: 999;
        background-color: #fff;
        left: -6px;
        top:15px;
        transform: rotate(-45deg);
    }
    .my-modal{
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,.5);
        top: 0;
        left: 0;
        z-index: 9999;
    }
    .my-modal .modal-box{
        width: 427px;
        /* height: 250px; */
        padding-bottom: 25px;
        background: #fff;
        margin: 0 auto;
        margin-top: 20%;
        border-radius: 6px;
        overflow: hidden;
    }
    .my-modal .modal-box .cnt{
        padding: 28px 30px 36px 30px;
        font-size: 12px;
        color: #666;
        text-align: center
    }
    .my-modal .modal-box .title{
       height: 40px;
       line-height: 40px;
       padding-left: 20px;
       background: #f9f9f9;
       color: #333;
    }
    .my-modal .modal-box .btn{
        text-align: center;
    }
    .my-modal .modal-box .btn button{
        padding: 3px 15px;
        font-size: 14px;
        border: 1px solid #ff8a00;
        background-color: transparent;
        color: #ff8a00;
    }
    .my-modal .modal-box .btn button:nth-child(1){
        margin-right: 30px;
    }
    .my-modal .modal-box .btn .active{
        background-color: #ff8a00;
        color: #fff;
    }
    .my-modal .modal-box .radio{
        font-size: 13px;
        margin: 28px 0 15px 0;
        color: #333
    }
    .my-modal .ivu-radio-checked .ivu-radio-inner{
        border-color: #ff8a00;
    }
    .my-modal .ivu-radio-inner{
        border: 1px solid #ddd;
    }
    .my-modal .ivu-radio-inner:after{
        background-color: #ff8a00;
    }
</style>
