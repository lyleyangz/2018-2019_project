<template>
    <div class="currency" :class="$i18n.locale">
        <div class="buy" v-if="skip===1">
            <ul class="cnt-left">
                <li v-for="(key,val) of currencyList" :key="val" :class="key==defCurrency.key?'active':''" @click="changeCurrency(key,val)">
                    <span><i class="logo" :class="val"></i><label>{{val}}</label></span>
                </li>
            </ul>
            <div class="cnt-center">
                <div class="cnt-title">{{$t('currency.buy.title')}}</div>
                <div class="cnt-body">
                    <ul class="ul cnt-first">
                        <li class="li">
                            <span class="lb">{{$t('currency.buy.input.lb1')}}</span>
                            <span>{{defCurrency.buyPrice}}</span>
                            <span class="unit">CNY</span>
                        </li>
                        <li class="li">
                            <span class="lb">{{$t('currency.buy.input.lb2')}}</span>
                            <input class="ivu-input common-width" v-model="submitParams.quantity" type="text" :placeholder="$t('currency.buy.errMes.mes1')" @keyup="compute(1)"/>
                            <span class="unit">{{defCurrency.val}}</span>
                        </li>
                        <li class="li">
                            <span class="lb">{{$t('currency.buy.input.lb3')}}</span>
                            <input class="ivu-input common-width" v-model="submitParams.account" type="text" :placeholder="$t('currency.buy.errMes.mes2')" autocomplete="new-password" @keyup="compute(2)"/>
                            <span class="unit">CNY</span>
                        </li>
                        <li class="li">
                            <span class="lb">{{$t('currency.buy.input.lb4')}}</span>
                            <Select  class="common-width" v-model="submitParams.sellId" placeholder="请选择商家" @on-change="sellerChange">
                                <Option :value="index" v-for="(item,index) of sellerList" :key="index" >{{item}}</Option>
                            </Select>
                        </li>
                        <li class="li agreement" v-if="isExpired">
                            <span class="lb"></span>
                            <label>{{$t('currency.buy.errMes.mes6')}}</label>
                        </li>
                        <li class="li btn">
                            <span class="lb"></span>
                            <Button type="success" class="common-width" @click="buy()">{{$t('currency.buy.input.btn')}}</Button>
                        </li>
                    </ul>
                    <div class="forget-remark">
                        <p>{{$t('currency.buy.remark.tip')}}</p>
                        <p>{{$t('currency.buy.remark.rm1')}}</p>
                        <p>{{$t('currency.buy.remark.rm2')}}</p>
                        <p>{{$t('currency.buy.remark.rm3')}}</p>
                        <p>{{$t('currency.buy.remark.rm4')}}</p>
                        <p>{{$t('currency.buy.remark.rm5')}}</p>
                        <p>{{$t('currency.buy.remark.rm6')}}</p>
                        <!-- <p>{{$t('currency.buy.remark.rm7')}}</p> -->
                    </div>
                </div>
            </div>
            <div class="cnt-right">
                <div class="cnt-title">{{sellerDetail.name}}</div>
                <div class="cnt-body">
                    <div class="item">
                        <label class="lb">{{$t('currency.buy.business.lb1')}}</label>
                        <label class="content">{{sellerDetail.uName}}</label>
                    </div>
                    <div class="item">
                        <label class="lb">{{$t('currency.buy.business.lb2')}}</label>
                        <label class="content">{{sellerDetail.idNO}}</label>
                    </div>
                    <div class="item">
                        <label class="lb">{{$t('currency.buy.business.lb3')}}</label>
                        <label class="content">{{sellerDetail.workingTime}}</label>
                    </div>	
                    <div class="item">
                        <label class="lb">{{$t('currency.buy.business.lb4')}}</label>
                        <label class="content">{{sellerDetail.isAssetTrusteeship}}</label>
                    </div>
                    <div class="item">
                        <label class="lb">{{$t('currency.buy.business.lb5')}}</label>
                        <label class="content">{{sellerDetail.answeringTime}}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>
    import { 
        getCurrencyList,getSellerList,
        getSellerDetail,submitOrder,getPrice,checkPrice
    } from "@api/api_currency";
    import decimalDigits from "@common/settings/decimalDigits";
    import Big from 'big.js';
    import {Button,Input,Select,Option,Notice,Message,Modal, Spin} from 'iview';
    export default {
        data() {
            return {
                isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
                skip: 1,
                currencyList: {},
                sellerList: {},
                sellerDetail: {},
                // 默认币种信息
                defCurrency:{
                    key:0, // 默认选中的币种的key
                    val:"",// 默认选中的币种的值,
                    legalTender:1, // 默认人民币
                    buyPrice:0, //买入价格
                },
                // 买入提交参数
                submitParams:{
                    priceKey: null,//买入价格key
                    quantity: null,
                    account: null,
                    sellId: null
                },
                isExpired: false // 价格是否过期
            }
        },
        created() {
           
        },
        mounted () {
            this.getCurrencyList();
            this.getSellerList();            
        },
        methods: {
            
            //币种列表
            getCurrencyList() {
                Spin.show();
                var _this = this;
                getCurrencyList().then(res => {
                    if (res.success) { 
                        this.currencyList = res.data || {};
                        const arr = Object.values(this.currencyList);
                        if(arr.length>0){
                            _this.defCurrency.val = Object.keys(this.currencyList)[0];
                            _this.defCurrency.key = arr[0];
                            _this.getPrice(arr[0])
                        }
                    }
                    
                });
            },
            // 商家列表
            getSellerList(){
                getSellerList().then(res => {
                    if (res.success) {                        
                        this.sellerList =  res.data || {};
                        const arr = Object.keys(this.sellerList);
                        if(arr.length>0){
                            this.submitParams.sellId = arr[0];
                        }
                    }
                });
            },
            // 切换商家并获取商家详情
            sellerChange(){
                this.sellerDetail = {};
                if(this.submitParams.sellId){
                    getSellerDetail({
                        id: this.submitParams.sellId
                    }).then(res => {
                        if (res.success) { 
                            this.sellerDetail = res.data || {};
                        }
                    });
                }
            },
            // 获取当前币种买入价格
            getPrice(currency){
                this.defCurrency.buyPrice = 0;
                this.submitParams.priceKey = null;
                this.submitParams.account = null;
                this.submitParams.quantity = null;
                Spin.show();
                getPrice({
                    currency: currency,
                    legalTender: this.defCurrency.legalTender
                }).then(res => {
                    if (res.success) { 
                        this.defCurrency.buyPrice = res.data.priceInfo.price;
                        this.submitParams.priceKey = res.data.key;
                    }
                    Spin.hide();
                })
            },
            //切换币种
            changeCurrency(key,val){
                this.defCurrency.key = key;
                this.defCurrency.val = val;
                this.getPrice(key);
            },
            // 计算数量和金额  1：数量 2：金额
            compute(type){
                if(type === 1){
                    if(isNaN(this.submitParams.quantity)){
                        return false;
                    }
                    this.submitParams.account = this.globalFun.formatFloat(new Big(this.submitParams.quantity).mul(this.defCurrency.buyPrice), 2);
                }
                else if(type === 2){
                    if(isNaN(this.submitParams.account)){
                        return false;
                    }
                    this.submitParams.quantity = this.globalFun.formatFloat(
                        new Big(this.submitParams.account).div(this.defCurrency.buyPrice),
                        decimalDigits.currency[this.defCurrency.key]? decimalDigits.currency[this.defCurrency.key]: 8
                    );
                }
            },
            buy(){                         
                if(!this.isLogin){
                    Modal.confirm({
                        content: this.$t('header.isLoginMarkedWords'),
                        loading: false,
                        onOk: () => {
                            location.href = './others.html#/login'
                        }
                    });
                    return;
                }
                if(!this.submitParams.quantity){
					Notice.error({
						title: this.$t('currency.buy.errMes.mes1')
					})
					return;
                }
                if(isNaN(this.submitParams.quantity)){
					Notice.error({
						title: this.$t('currency.buy.errMes.mes2')
					})
					return;
                }
                var count = decimalDigits.currency[this.defCurrency.key]? decimalDigits.currency[this.defCurrency.key]: 8;
                var g = new RegExp("^\\d+(?:\\.\\d{0," + count + "})?$","gim");
                if(!g.test(this.submitParams.quantity)){
                    Notice.error({
						title: this.globalFun.replaceParam(this.$t('currency.buy.errMes.mes4'),count)
					})
					return; 
                }
                var g = new RegExp("^\\d+(?:\\.\\d{0,2})?$","gim");
                if(!g.test(this.submitParams.account)){
                    Notice.error({
						title: this.globalFun.replaceParam(this.$t('currency.buy.errMes.mes5'),count)
					})
					return; 
                }
                if(this.submitParams.account<decimalDigits.minOTCAmount){
					Notice.error({
						title: this.$t('markedWorks.LT00002')
					})
					return;
                }
                if(this.submitParams.account>decimalDigits.maxOTCAmount){
					Notice.error({
						title: this.$t('markedWorks.LT00006')
					})
					return;
                }
                if(!this.submitParams.sellId){
					Notice.error({
						title: this.$t('currency.buy.errMes.mes3')
					})
					return;
                }

                Spin.show();
                checkPrice({
                    priceKey: this.submitParams.priceKey
                }).then(res => {
                    if (res.success) { 
                        if(res.data.isExpired){
                            this.isExpired = true;
                            // 重新获取价格
                            this.getPrice(this.defCurrency.key);
                            Spin.hide();
                            return false;
                        }
                        this.submit();
                    }else{
                        Spin.hide();
                    }
                });
                
            },
            submit(){
                submitOrder(this.submitParams).then(res => {
                    if (res.success) { 
                        this.$router.push({
                            name:'pay',
                            params:{orderId:res.data || 0}
                        })
                    }
                    Spin.hide();
                });
            }
        },
       
        components: {
            Button,
            Input,
            Select,
            Option
        }
    }
</script>
<style lang="scss"  scoped="scoped">
    .buy{
        display: flex;
        .cnt-left{
            width: 160px;
            margin: 0 22px 0 0;
            li{
                background: #fff;
                line-height: 60px;
                font-size: 16px;
                border-top:1px solid #eee;
                color: #666;
                cursor: pointer;
              
                span{
                    display: flex;
                    align-items: center;
                    border-left: 4px solid #fff;
                    padding-left: 40px;
                }
                i{
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: middle;
                }
                .ETH{
                    margin-left: 4px;
                }
                
            }
            li:nth-child(1){
                border-top:none;
            }
            .active{
                span{
                    background-color: #fffaf3;
                    border-left: 4px solid #ff8a00;
                }
            }
            .active,li:hover{
                color: #ff8a00;
               
            }
        }
        .cnt-title{
            display: flex;
            font-size: 16px;
            line-height: 18px;
            font-weight: 550;
            color: #333333;
            height: 43px;
        }
        .cnt-center{
            width: 610px;
            background: #fff;
            padding: 40px 40px 38px 40px;
            .cnt-title{
                width: 530px;
                border-bottom: 1px solid #eee;
            }
            .ivu-input{
                // width: 410px;
                height: 40px;
                line-height: 38px;
                padding: 0 7px;
                border: 1px solid #ddd;
            }
            .ivu-btn {
                border:1px solid #ff8a00;
                background-color: #ff8a00;
                // width: 410px;
                height: 38px;
                font-size: 16px;
            }
                
            .cnt-body{
                margin-top:36px;
                width:100%;
                // height: 560px;
                .ul{
                    font-size:16px;
                    color:#333333;
                    .li{
                        margin-top:26px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        .lb{
                            display: inline-block;
                            width:65px;
                            color: #999;
                            margin-right: 18px;
                            white-space: nowrap;
                        }
                        .ls-3{
                            letter-spacing: 16px;
                        }
                        .ls-4{
                            letter-spacing: 5.2px;
                        }
                        label{
                            color:#00b38a;
                        }
                       
                        .country{
                            width: 90px;
                        }
                        .common-width{
                            width: 410px;
                        }
                        .unit{
                            position: absolute;
                            font-size: 14px;
                            color: #ff8a00;
                            right: 43px;
                            top: 9px;
                        }
                    }
                    .agreement{
                        font-size: 14px;
                        margin-top:20px;
                        label{
                            color: #b4b4d8;
                        }
                    }
                    .btn{
                        margin:22px 0 104px 0;
                    }
                    .success{
                        margin-top:40px;
                        text-align: center;
                        .success-icon{
                            position: relative;
                            top:8px;
                            margin-right:10px;
                            display: inline-block;
                            width:36px;
                            height: 36px;
                            background: url('./../../../common/assets/images/step_now.png') no-repeat center;
                            background-size: 36px 36px;
                        }
                    }
                }
            }
        }
        .cnt-right{
            padding: 40px 28px 38px 28px;
            background-color: #fff;
            flex: 1;
            margin-left: 14px;
            .cnt-body{
                padding: 32px 22px;
                background-color: #F3F3F9;
                .item{
                    display: flex;
                    font-size: 14px;
                    line-height:16px;
                    margin-top: 40px;
                }
                .item:nth-child(1){
                    margin-top: 0;
                }
                .lb{
                    flex: 1;
                    width: 100%;
                    color: #999;
                }
                .content{
                    color: #333;
                }
            }
        }
        .forget-remark{
            padding:50px 0 0 0;
            p{
                font-size:12px;
                color:#999;
                margin-top:5px;
            }
        }
    }
    .ENG{
        .cnt-body{
            .lb{
                width: 102px !important;
            }
            .unit{
                right:7px !important;
            }
        }
    }
</style>