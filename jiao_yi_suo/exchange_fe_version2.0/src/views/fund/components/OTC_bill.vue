<template>
    <div class="OTCBill" :class="$i18n.locale">
        <div class="bill-setting">
            <div class="bill-choose">
                <span>
                    <label class="lb">{{$t('fund.bill.coin')}}</label>
                    <Select v-model="searchParam.currency" :placeholder="$t('fund.bill.all')">
                        <Option :value="``">{{$t('fund.bill.all')}}</Option>
                        <Option v-for="(value,key) of currencyList" :value="value" :key="value">{{key}}</Option>
                    </Select>
                </span>
                <span>
                    <label class="lb">{{$t('fund.bill.start')}}</label>
                    <DatePicker v-model="searchParam.startTime" type="date" :placeholder="$t('fund.bill.startTime')" style="width: 200px"></DatePicker>
                    <label class="lb ml-10">{{$t('fund.bill.to')}}</label>
                    <DatePicker v-model='searchParam.endTime'  type="date" :placeholder="$t('fund.bill.endTime')" style="width: 200px"></DatePicker>
                </span>
                <Button type="success" @click="search()">{{$t('fund.bill.query')}}</Button>  
            </div> 
            <div class="bill-status">
                <Button type="success" :class="currStatus==1?'active':''" @click="changeTab(1)">{{$t('fund.OTCBill.status1')}}</Button>  
                <Button type="success" :class="currStatus==2?'active':''" @click="changeTab(2)">{{$t('fund.OTCBill.status2')}}</Button>  
                <Button type="success" :class="currStatus==3?'active':''" @click="changeTab(3)">{{$t('fund.OTCBill.status3')}}</Button>  
            </div>
            <div class="bill-contain">
                <ul class="ul" v-if="orderList.length>0">
                    <li class="li">
                        <span style="flex:1">{{$t('fund.OTCBill.table.lb1')}}</span>
                        <span style="flex:2">{{$t('fund.OTCBill.table.lb2')}}CNY</span>
                        <span style="flex:2">{{$t('fund.OTCBill.table.lb3')}}</span>
                        <span style="flex:2">{{$t('fund.OTCBill.table.lb4')}}CNY</span>
                        <span style="flex:1" >{{$t('fund.OTCBill.table.lb8')}}</span>
                        <span style="flex:2" v-show="currStatus==1">{{$t('fund.OTCBill.table.lb5')}}</span>
                        <span style="flex:3" v-show="currStatus==1">{{$t('fund.OTCBill.table.lb9')}}</span>

                        <span style="flex:2" v-show="currStatus!=1">{{$t('fund.OTCBill.table.lb6')}}</span>
                        <span style="flex:1" v-show="currStatus!=1">{{$t('fund.OTCBill.table.lb10')}}</span>
                        <span style="flex:2" v-show="currStatus!=1">{{$t('fund.OTCBill.table.lb7')}}</span>
                        
                    </li>
                    <ul class="balance-list-contain">
                        <li v-for="(item,index) of orderList" :key="index">
                            <div class="item" @click="checkItem(item,index)">
                                <span style="flex:1">{{item.id}}</span>
                                <span style="flex:2">{{item.price}}</span>
                                <span style="flex:2">{{globalFun.formatFloat(item.quantity,decimalDigits.currency[item.currency])}}</span>
                                <span style="flex:2">{{item.amount}}</span>
                                <span style="flex:1">{{item.currencyName}}</span>
                                <span style="flex:2" v-if="currStatus==1">
                                    {{ Math.floor(parseInt(time.total - (time.now - item.orderTime)/1000)/60)}} min
                                </span>
                                <span style="flex:2" v-if="currStatus!=1">{{globalFun.dateFormat(item.orderTime, 'yyyy-MM-dd hh:mm:ss') }}</span>
                               
                                <span style="flex:3" v-if="currStatus==1">
                                    <Button class="pay" @click.stop="goPay(item)" v-if="item.open">{{$t('fund.OTCBill.table.btn1')}}</Button>
                                    <Button class="cancel"  @click.stop="cancel(item)">{{$t('fund.OTCBill.table.btn2')}}</Button>
                                </span>
                                <span style="flex:1" v-if="currStatus!=1">
                                    {{item.payremark}}
                                </span>
                                <span style="flex:2" v-if="currStatus!=1">
                                    <label :class="item.status==1 || item.status ==3?'blue':''">{{item.status | orderStatus}}</label>
                                </span>
                                
                            </div>
                            <div class="info" v-if="currStatus == 1  && item.open">
                                <div class="tip"><i></i>{{$t('fund.OTCBill.table.tip1')}}</div>
                                <div class="cnt">
                                    <div class="unionpay">
                                        <i class="icon"></i>
                                        <span class="text">{{$t('fund.OTCBill.table.type1')}} <label class="lb">{{$t('fund.OTCBill.table.tip2')}}</label></span>
                                        <span class="bank " :class="`banInfo_`+index">
                                            {{item.sellerInfo.bankAccount.uname}} 
                                            {{item.sellerInfo.bankAccount.bank}}
                                            {{item.sellerInfo.bankAccount.branchBank}}
                                            （{{item.sellerInfo.bankAccount.accountNo}}）
                                        </span>
                                        <a class="a-btn" ref="copy1" data-clipboard-action="copy" :data-clipboard-target="`.banInfo_`+index" @click="copy1(index)"  >{{$t('fund.OTCBill.table.copy')}}</a> 
                                    </div>
                                    <div class="wxpay">
                                        <i class="icon"></i>
                                        <span class="text">{{$t('fund.OTCBill.table.type2')}}</span>
                                        <span class='qrcode'>
                                            <em v-if="item.wxQRCode">
                                                <img :src="item.wxQRCode">
                                            </em>
                                        </span>
                                    </div>
                                    <div class="alipay">
                                        <i class="icon"></i>
                                        <span class="text">{{$t('fund.OTCBill.table.type3')}}</span>
                                        <span class='qrcode'>
                                            <em v-if="item.aliQRCode">
                                                <img :src="item.aliQRCode">
                                            </em>
                                        </span>
                                    </div>
                                </div>
                                <div class="payremark">
                                    <span>{{$t('fund.OTCBill.table.remark')}}</span><span :class="`payremark_`+index">{{item.payremark}}</span>
                                    <a class="a-btn" ref="copy2" data-clipboard-action="copy" :data-clipboard-target="`.payremark_`+index" @click="copy2(index)"  >{{$t('fund.OTCBill.table.copy')}}</a>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </ul>
              
                <span class="NoBill" v-if="orderList.length==0 && currStatus===1">
                    <label >{{$t('fund.OTCBill.tip1')}}</label>
                    <Button type="success" @click="goBuy">{{$t('fund.OTCBill.btn')}}</Button>  
                </span> 
                <span class="NoBill" v-if="orderList.length==0 && currStatus!==1">
                    <label >{{$t('fund.OTCBill.tip2')}}</label>
                    <Button type="success" @click="goBuy">{{$t('fund.OTCBill.btn')}}</Button>  
                </span> 

                <Page v-if="pageTotal>0" :current.sync="searchParam.pageNum"  :total="pageTotal" :page-size="searchParam.count"  @on-change="convertPage"  show-elevator show-total></Page>
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
    
import {getOrderList,getCurrencyList,payOrder,cancelOrder } from '@api/api_currency';
import decimalDigits from '@common/settings/decimalDigits';
import {Select,Option,DatePicker,Button,Spin,Page,Message,Modal,RadioGroup,Radio} from 'iview';
import Clipboard from 'clipboard';
import QRCode from 'qrcode';
export default {
    data() {
        return {
            statusList:{
                1: this.$t('fund.OTCBill.status1'),
                2: this.$t('fund.OTCBill.status2'),
                3: this.$t('fund.OTCBill.status3'),
            },
            pageTotal:0,//列表总数
            currStatus:1,//当前默认订单状态
            orderList:[],//账单列表
            currencyList:{},
            copyBtn1: null,
            copyBtn2: null,
            wxQRCode:null,
            aliQRCode:null,
            decimalDigits: decimalDigits, 
            searchParam:{
                currency:"",
                startTime:"",
                endTime:"",
                status:1,
                pageNum:1,
                count:10
            }, 
            isShow:false,
            payType:null,
            currOrderId:null,
            time:{
                total: 1800,//30min过期时间
                now: null
            },
            flag: true //是否代付款没有记录是显示已完成记录
        }
    },
    created() {
        this.currStatus = this.$route.query.status || 1;
        this.searchParam.status = this.currStatus;
        this.getCurrencyList();
        this.getOrderList();
        
    },
    methods: {
        // 获取订单列表
        getOrderList(){
            var params = JSON.parse(JSON.stringify(this.searchParam));
            var startTime = params.startTime;
            if(startTime){
                params.startTime = new Date(startTime).getTime();
            }
            var endTime = params.endTime;
            if(endTime){
                params.endTime = new Date(endTime).getTime() + 1000 * 60 * 60 * 24-1000;
            }

            Spin.show();
            var _this = this;
            getOrderList(params).then((res) => {
                Spin.hide();
                _this.orderList = res.data;
                _this.pageTotal = res.recordTotal;
                if(_this.currStatus === 1){
                    if(_this.orderList.length>0){
                        _this.time.now = new Date().getTime();                        
                        _this.checkItem(_this.orderList[0]);
                        _this.loadCoye(_this,0);
                    }
                    if(_this.orderList.length===0 && _this.flag){
                        _this.currStatus = 2;
                        _this.searchParam.status = _this.currStatus;
                        _this.getOrderList();

                    }
                    
                }   
            });
        },
        convertPage(index){ //选择页数
            this.searchParam.pageNum = index;
            this.getOrderList();
        },
        
        //获取币种列表
        getCurrencyList(){ 
            getCurrencyList().then((res) => {
                if (res.success) {
                    this.currencyList = res.data;
                }
            });
        },
        changeTab(status){
            this.currStatus = status;
            this.searchParam.status = status;
            this.searchParam.pageNum = 1;
            this.flag = false;
            this.getOrderList();
        },
        checkItem(item,index){
            if(this.currStatus === 1){
                this.$set(item,'open',!item.open);
                this.bindQRCode(item);
                this.loadCoye(this,index)
            }
        },
        search(){//查询
            this.getOrderList();
        },
        // 加载copy
        loadCoye(_this,index){
            setTimeout(function(){
                _this.copyBtn1 = new _this.clipboard(_this.$refs.copy1[index]);
                _this.copyBtn2 = new _this.clipboard(_this.$refs.copy2[index]);
            },1000)
        },
        // 复制
        copy1(index) {
            var _this = this;
            let clipboard = _this.copyBtn1;
            clipboard.on('success', function() {
                Message.success(_this.$t('userCenter.safe.remark4'));
                clipboard.destroy();
                
                _this.copyBtn1 = new _this.clipboard(_this.$refs.copy1[index]);
            });

        },
        copy2(index){
            var _this = this;
            let clipboard = _this.copyBtn2;
            clipboard.on('success', function() {
                Message.success(_this.$t('userCenter.safe.remark4'));
                clipboard.destroy();
                _this.copyBtn2 = new _this.clipboard(_this.$refs.copy2[index]);
            });
        },
        // 生成二维码
        bindQRCode(item){
            var _this = this;
            var opts = {
                width:128,
                height:128
            }
            QRCode.toDataURL(item.sellerInfo.weChatPay,opts).then(url => {
                _this.$set(item,'wxQRCode',url);
            }).catch(err => {
                console.error(err)
            })
            QRCode.toDataURL(item.sellerInfo.alipay,opts).then(url => {
                _this.$set(item,'aliQRCode',url);
            }).catch(err => {
                console.error(err)
            })
        },
        cancel(item){
            var _this = this;
            Modal.confirm({
                title: this.$t('currency.pay.cancel.title'),
                content: this.$t('currency.pay.cancel.content'),
                loading: true,
                onOk: () => {
                    cancelOrder({
                        id: item.id
                    }).then(res => {
                        if (res.success) { 
                            Modal.remove();
                            Message.success(this.$t('currency.pay.cancel.success'));
                            this.getOrderList();
                        }
                    });
                }
            });
        },
        goPay(item){
            this.isShow = true;
            this.currOrderId = item.id
        },
        // 支付
        pay(){
            if(!this.payType){
                Message.error(this.$t('currency.pay.errMes.mes2'));
                return false;
            }
            
            this.isShow = false;
            var _this = this;
            payOrder({
                id: _this.currOrderId,
                payType: _this.payType
            }).then(res => {
                if (res.success) { 
                    _this.isShow = false;
                    this.getOrderList();
                }
            })
        },
        goBuy(){
            location.href = "/currency.html#/buy";
        }
        
    },
    components: {
        Select,
        Option,
        Button,
        DatePicker,
        RadioGroup,
        Radio,
        Page
    },
}
</script>

<style lang="scss" scoped="scoped">

.bill-setting {
    .bill-choose {
        font-size: 14px;
        color: #333333;
        padding-top: 29px;
        padding-bottom: 29px;
        background-color: #fff;
        padding: 30px 0 56px 0;
        span {
            display: inline-flex;
            // width:20%;
            margin: 0 26px 0 0;
        }
        .lb {
            display: inline-flex;
            line-height: 30px;
            margin: 0 18px 0 0;
        }
        button {
            background-color: #ff8a00;
            border-color: #ff8a00;
            width: 103px;
            margin-right: 16px
        }
    }
    .bill-status{
        padding: 0 10px;
        button {
            background-color: #F0F0F8;
            border: 0;
            padding: 0 32px;
            height: 28px;
            color: #333 !important;
            margin-right: 16px;
            border-radius: 5px;
        }
        .active{
            background-color: #ff8a00;
            border: 0;
            color: #fff !important;
        }
    }
    .bill-contain {
        border-radius: 5px;
        // height: 600px;
        font-size: 14px;
        color: #333;
        background-color: #fff;
        .ul {
            border-radius: 5px;
            // height:530px;
            .li {
                line-height: 72px;
                font-size: 14px;
                color: #333333;
                display: flex;
                span {
                    display: inline-block;
                    text-align: center;
                    width: 19%;
                }
            }
            .balance-list-contain {
                border: 1px solid #E7E7E7;
                background-color: #fff;
                &::-webkit-scrollbar {
                    width: 5px;
                }
                &::-webkit-scrollbar-thumb {
                    width: 5px;
                    background-color: #333333;
                    border-radius: 5px;
                }
                .item {
                    background-color: #fff;
                    height: 78px;
                    line-height: 78px;
                    font-size: 14px;
                    color: #666;
                    display: flex;
                    border-top: 1px dashed #ddd;
                    cursor: pointer;
                    
                    span {
                        display: inline-block;
                        text-align: center;
                        margin: 0 auto;
                        width: 19%;
                    }
                    .blue{
                        color: #8e77f0;
                    }
                    button{
                        width: 90px;
                        height: 24px;
                        line-height: 12px;
                        background-color: transparent;
                    }
                    .pay{
                        color: #ff8a00;
                        border: 1px solid #ff8a00;
                        margin-right: 8px;
                        
                    }
                    .cancel{
                        color: #666;
                        border: 1px solid #666;
                    }
                }
                .item:hover{
                    background-color: #f8f8f8;
                }
                li:first-child .item{
                    border-top: none;
                }
                .info{
                    background-color: #F0F0F7;
                    padding: 0 20px 69px 50px;
                    width: 100%;
                    .tip{
                        height: 68px;
                        line-height: 68px;
                        text-align: right;
                        font-size: 12px;
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
                    .cnt{
                        background-color: #fff;
                        div{
                            padding: 22px 0;
                            border-top: 1px dashed #ddd;
                            margin: 0 26px;
                        }
                        div:nth-child(1){
                            border-top: 0;
                        }
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
                    .payremark{
                        margin: 50px 0 0 38px;
                        font-size: 16px;
                        span:nth-child(1){
                            
                            color: #999;
                            margin-right: 36px;
                        }
                        span:nth-child(2){
                            color: #000;
                            font-family: Arial, Helvetica, sans-serif;
                            font-weight: 600;
                            margin-right: 60px;
                        }
                        .a-btn{
                            border: 1px solid #ff8a00;
                            border-radius: 3px;
                            padding: 1px 9px 2px 9px;
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
                }
                
            }
            .page {
                display: block;
                text-align: center;
            }
        }
        .a-btn{
            font-size: 14px;
            color: #ff8a00
        }
        .NoBill {
            height: 424px;
            background-color: #f0f0f7;
            line-height: 424px;
            display: block;
            text-align: center;
            font-size: 16px;
            color: #333;
            margin-top: 36px;
            button{
                background-color: #ff8a00;
                border:0;
                padding: 0 27px;
                height: 28px;
                margin-left: 24px;
            }    
        }
    }
}
.ENG{
    .balance-list-contain{
        .text{
            width: 260px !important;
        }
    }
}
</style>
<style>
 .ivu-select-single{
     width:100px;
 }
 .qrcode em{
    position: absolute;
    width: 130px;
    height: 130px;
    border: 1px solid #ddd;
    box-shadow: rgba(0,0,0,0.8) 0px 0px 1px;
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
    height: 250px;
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
