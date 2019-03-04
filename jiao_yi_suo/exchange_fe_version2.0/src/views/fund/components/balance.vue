<template>
    <section class="user-center" :class="$i18n.locale">
        <div class="balance-outer">
            <ul class="balance">
                <li class="title f-fs16">{{$t('fund.balance.assets')}}</li>
                <li class="number"><label>{{totalBalance | formatFloat(8)}}</label><label class="f-fs18">BTC</label></li>
                <li class="cny"><label>≈￥{{totalCNY}}</label><label>CNY</label></li>
                <li class="line">
                    <!-- <span class="outer"><span class="inner"></span></span>
                    <span class="outer"><span class="inner"></span></span> -->
                    <router-link :to="`/address`"><a class="btn">{{$t('fund.balance.withdrawAddr')}}</a></router-link>
                </li>
            </ul>
            <div class="pieChart">
                <chart-pie v-if="chartPie.data.length>0 && !convertFont" :lbList="chartPie.lb" :dataList="chartPie.data" :has="chartPie.has"></chart-pie>
            </div>
        </div>
        <div class="data-list">
            <ul class="title">
                <li>{{$t('fund.balance.currency')}}</li>
                <li>{{$t('fund.balance.available')}}</li>
                <li>{{$t('fund.balance.frozen')}}</li>
                <li class="operation">{{$t('fund.balance.operation')}}</li>
            </ul>
            <ul class="data">
                <li v-for="(item,index) of balanceList" v-if="configList[item.currencyType]" :key="index" >
                    <div class="item">
                        <span class="name">
                            <i class="logo" :class="currencyList[item.currencyType]"></i>
                            <label>{{ currencyList[item.currencyType]}} </label>
                            <label> {{item.currencyType | currencyName}}</label>
                        </span>
                        <span>{{item.balance | formatFloat(decimalDigits.currency[item.currencyType]? decimalDigits.currency[item.currencyType]: 8)}}</span>
                        <span>{{item.frozen  | formatFloat(decimalDigits.currency[item.currencyType]? decimalDigits.currency[item.currencyType]: 8)}}</span>
                        <span class="operation" v-if="!coldingCurrencyList.currency.includes(item.currencyType)">
                            <button class="btn-hollow" :class="(currType === item.currencyType && isOpen && type===1)?'active':''" @click="operation(item,1)">{{$t('fund.balance.withdrawals')}}</button>
                            <!-- <button class="btn-hollow disabled" >{{$t('fund.balance.withdrawals')}}</button> -->
                            <button class="btn-hollow" :class="(currType === item.currencyType && isOpen && type===2)?'active':''" @click="operation(item,2)">{{$t('fund.balance.recharge')}}</button>
                            <button class="btn-solid" @click="redirect(item)">{{$t('fund.balance.transaction')}}</button>
                        </span>
                        <span class="operation" v-if="coldingCurrencyList.currency.includes(item.currencyType)">
                            <button class="btn-hollow disabled" :class="(currType === item.currencyType && isOpen && type===1)?'active':''">{{$t('fund.balance.withdrawals')}}</button>
                            <button class="btn-hollow disabled" :class="(currType === item.currencyType && isOpen && type===2)?'active':''">{{$t('fund.balance.recharge')}}</button>
                            <button class="btn-solid disabled">{{$t('fund.balance.transaction')}}</button>
                        </span>
                    </div>
                    <div class="down" v-if="currType === item.currencyType && isOpen">
                        <div class="cnt">
                            <!-- 提现内容 -->
                            <div class="cnt-withdraw" v-if="type===1">
                                <div class="address">
                                    <label>{{$t('fund.balance.wAddress')}}：</label>
                                    <div class="ipt">
                                        <input v-model.trim="withdrawIpt.destAddr" :placeholder="$t('fund.balance.wAddressTip')" v-on:input="changeAddr(item)"/>
                                        <div class="tag" v-if="addressList.list.length>0">
                                            {{withdrawIpt.tag}}
                                            <span @click="select"><Icon :class="addressList.show?'transform':''" type="android-arrow-dropdown" ></Icon></span>
                                        </div>
                                        <ul class="content" v-if="addressList.show">
                                            <li v-for="(item,index) of addressList.list" :key="index" @click="checkItem(item)">
                                                <span class="addr">{{item.address}}</span>
                                                <span>{{item.remark}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="item.currencyType === 104">
                                    <label>{{$t('fund.balance.dTag')}}：</label>
                                    <input v-model="item.params.destAddTag" :placeholder="$t('fund.balance.wTagTip')" />
                                </div>
                                <div class="rate">
                                    <label></label>
                                    <span>{{$t('fund.balance.free')}}：{{configList[item.currencyType].vWithdrawFee || 0}}</span>
                                </div>
                                <div class="num">
                                    <label>{{$t('fund.balance.wNumber')}}：</label>
                                    <input type="number" v-model="withdrawIpt.amount"/>
                                    <em>{{$t('fund.balance.available')}}：{{item.balance | formatFloat(decimalDigits.currency[item.currencyType]? decimalDigits.currency[item.currencyType]: 8)}}</em>
                                </div>
                                <div class="remark">
                                    <Checkbox size="large" v-model="withdrawIpt.isCommonAddress">{{$t('fund.balance.defAddr')}}</Checkbox>
                                    <label class="lb" v-if="withdrawIpt.isCommonAddress">{{$t('fund.balance.remark')}}：</label>
                                    <input v-model="withdrawIpt.remark" :maxlength="20" v-if="withdrawIpt.isCommonAddress"/>
                                </div>
                                <!-- <div>
                                    <label>{{$t('fund.balance.payPwd')}}：</label>
                                    <input type="password" v-model.trim="item.params.payPwd" :placeholder="$t('fund.balance.payPwdTip')" />
                                </div> -->
                                <div><label></label><button @click="withdraw(item)">{{$t('fund.balance.confirm')}}</button></div>
                                <div class="notice">
                                    <p>{{$t('fund.balance.wNotice')}}</p>
                                    <p>{{$t('fund.balance.wNoticeP1')}}{{configList[item.currencyType].minWithdrawAmt}}</p>
                                    <p>{{$t('fund.balance.wNoticeP2')}}</p>
                                    <p>{{$t('fund.balance.wNoticeP3')}}</p>
                                    <p>{{$t('fund.balance.wNoticeP4')}}{{configList[item.currencyType].vWithdrawFee}}；{{$t('fund.balance.maxAmt')}}{{configList[item.currencyType].maxWithdrawAmt}}。</p>
                                </div>
                                <div class="history">
                                    <div class="nav">{{$t('fund.balance.wHistory')}}</div>
                                    <ul class="title-list">
                                        <li>{{$t('fund.balance.wTime')}}</li>
                                        <li>{{$t('fund.balance.wNumber')}}</li>
                                        <li>{{$t('fund.balance.wStatus')}}</li>
                                    </ul>
                                    <ul class="history-list">
                                        <li v-for="(item1,index1) of withdrawHistory" :key="index1">
                                            <span>{{globalFun.dateFormat(item1.createTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
                                            <span>{{item1.amount | formatFloat(decimalDigits.currency[item1.currency]? decimalDigits.currency[item1.currency]: 8)}}</span>
                                            <span>{{item1.status | withdraw}}</span>
                                        </li>
                                        <li v-if="withdrawHistory.length==0">
                                            <span>{{$t('fund.balance.nodate')}}</span>
                                        </li>
                                    </ul>
                                    <Page v-if="pageTotal>0" :current.sync="searchParam.curPage"  :total="pageTotal" :page-size="searchParam.pageSize"  @on-change="convertPageWithdraw"  show-elevator show-total></Page>
                                </div>
                            </div>
                            <!-- 充值内容 -->
                            <div class="cnt-recharge" v-if="type===2">
                                <p class="address">
                                    <span>
                                        {{$t('fund.balance.dAddress')}}：<label id="address">{{depositInfo.addr || "--"}}</label>
                                    </span>
                                    <span>
                                        <a class="btn" ref="addressCopy" data-clipboard-action="copy" data-clipboard-target="#address" @click="copy()">{{$t('userCenter.rebate.btn')}}</a>
                                        <a class="qrcode">
                                            <em>
                                                <img :src="qrCode">
                                            </em>
                                        </a>
                                    </span>
                                </p>
                                <p class="address">{{$t('fund.balance.dTag')}}：<label>{{depositInfo.tag || "--"}}</label></p>
                                <p class="tip">{{$t('fund.balance.dPrompt') | replaceI18N(currencyList[item.currencyType])}}</p>
                                <div class="notice">
                                    <p>{{$t('fund.balance.dNotice')}}</p>
                                    <p>{{$t('fund.balance.dNoticeTip1')}}</p>
                                    <p>{{$t('fund.balance.dNoticeTip2')}}{{configList[item.currencyType].minDepositAmt}}</p>
                                </div>
                                <div class="history">
                                    <div class="nav">{{$t('fund.balance.dHistory')}}</div>
                                    <ul class="title-list">
                                        <li>{{$t('fund.balance.dTime')}}</li>
                                        <li>{{$t('fund.balance.dMoney')}}</li>
                                        <li>{{$t('fund.balance.dStatus')}}</li>
                                    </ul>
                                    <ul class="history-list">
                                        <li v-for="(item2,index2) of depositHistory" :key="index2">
                                            <span>{{globalFun.dateFormat(item2.createTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
                                            <span>
                                                <label v-if="item2.tx_amount">{{item2.tx_amount | formatFloat(decimalDigits.currency[item2.currency]? decimalDigits.currency[item2.currency]: 8)}}</label>
                                                <label v-if="item2.value">{{item2.value | formatFloat(decimalDigits.currency[item2.currency]? decimalDigits.currency[item2.currency]: 8)}}</label>
                                                <label v-if="item2.tokens">{{item2.tokens | formatFloat(decimalDigits.currency[item2.currency]? decimalDigits.currency[item2.currency]: 8)}}</label>
                                            </span>
                                            <span>{{item2.status | deposit}}</span>
                                        </li>
                                        <li v-if="depositHistory.length==0">
                                            <span>{{$t('fund.balance.nodate')}}</span>
                                        </li>
                                    </ul>
                                    <Page v-if="pageTotal>0" :current.sync="searchParam.curPage"  :total="pageTotal" :page-size="searchParam.pageSize"  @on-change="convertPageDeposit"  show-elevator show-total></Page>
                                </div>
                            </div>
                        </div>
                    </div>
                </li> 
            </ul>
        </div>
        <Modal :width="428" v-model="modal.show" class="login-modal" :title="$t('fund.balance.modal.title')">
            <div class="cnt">
				<div class="item" v-if="verify.phone">
					<input type="text" v-model.trim="modalParams.phoneCaptcha" :placeholder="$t('fund.balance.modal.mes1')" :maxlength="6"/>
                    <span class="send" v-if="modal.phoneTime>0">{{modal.phoneTime+'s'}}</span>
                    <span class="send" v-if="modal.phoneTime<=0" @click="sendPhone">{{phoneTime_text}}</span>
					
				</div>
                <div class="item" v-if="verify.email">
					<input type="text" v-model.trim="modalParams.emailCaptcha" :placeholder="$t('fund.balance.modal.mes2')" :maxlength="6"/>
					<span class="send" v-if="modal.emailTime>0">{{modal.emailTime+'s'}}</span>
                    <span class="send" v-if="modal.emailTime<=0" @click="sendEmail">{{emailTime_text}}</span>
				</div>
                <div class="item">
					<input type="password" v-model="modalParams.paymentPwd" :placeholder="$t('fund.balance.modal.mes3')" :maxlength="6"/>
				</div>
			</div>
            <div slot="footer">
                <Button type="primary" :loading="loginning" @click="confirm">{{$t('fund.balance.modal.btn')}}</Button>
            </div>
        </Modal>

    </section>
</template>

<script>
import { 
    getbalance, getCurrencyList,getDeposit,getUserDetail,
    getExConfig,withdraw,userVerify,withdrawAddressList,
    getWithdrawHistory,getDepositHistory,getCodeByPhone,getCodeByEmail
} from "@api/api_group";
import eventBus from '@common/eventBus/eventBus';
import md5 from '@common/assets/js/md5.js';
import decimalDigits from "@common/settings/decimalDigits";
import contractTypeGroup from '@common/settings/contractTypeGroup';
import coldingCurrencyList from '@common/settings/coldingCurrencyList'
import chartPie from '@components/chart_pie/chart_pie';
import { Message, Spin, Notice, Modal,Button,Page,Checkbox,Icon } from 'iview';
import i18n from '@common/i18n';
import QRCode from 'qrcode';
import Big from 'big.js';
import Clipboard from 'clipboard';

export default {
    data() {
        return {
            Big: Big,
            isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
            loginning: false,
            balanceList: {},
            currencyList:{},
            configList: {}, //交易配置参数
            withdrawHistory: [],//提现记录
            depositHistory: [],//充值记录
            decimalDigits: decimalDigits,
            coldingCurrencyList: coldingCurrencyList,
            currType:-1,
            type:0,
            isOpen:false,
            currentEXType: 'BTC',
            contractTypeGroup: contractTypeGroup,
            depositInfo:{},
            totalBalance:0,
            totalCNY:0,
            phoneTime_text: "",
            emailTime_text: "",
            time: 120,
            modal:{
                show: false,
                emailTime: -1,
                phoneTime: -1,
            },
            modalParams:{
                phoneCaptcha: "",
                emailCaptcha: "",
                paymentPwd: ""
            },
            verify: {
                phone: false,
                email: false
            },
            currItem: null,
            chartPie:{
                lb: [],
                data: [],
                has: null
            },
            searchParam:{
                curPage: 1,
                pageSize: 10,
            },
            pageTotal: 0,
            convertFont: false,
            hasWithdraw:{
                realName: false,
                paypwd: false,
            },
            isSendPhone: true,
            isSendEmail: true,
            addressCopy: null,
            qrCode: null,
            addressList:{},//充值地址
            
            withdrawIpt:{
                destAddr: "",
                amount: "",
                remark: "",
                isCommonAddress: false,
                tag: ""
            },
            
        };
    },
    created() {
        if (this.isLogin == false) {
            Message.warning({
                content: this.$t('common.notLogin'),
                duration: 2
            });
            let goIndex = setTimeout(() => {
                window.location.href = "./index.html";
            }, 2000);
            return;
        }
        this.getBalance();
        this.getCurrencyList();
        this.getConfigList();
        this.getUserDetail();
        let params = this.$route.query;
        if(params.currency){
            this.isOpen = true;
            this.currType = Number(params.currency);
            this.type = 2;
            this.depositFun(params.currency);
        }   
        this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
        this.emailTime_text = this.$t('userCenter.safe.modal.senText');
        eventBus.$on('convertFont', () => {
            this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
            this.emailTime_text = this.$t('userCenter.safe.modal.senText');
            this.convertFont = true;
            setTimeout(() => {
                this.convertFont = false;
            }, 200);
        });     
    },
    mounted() {
        
    },
    methods: {
        // 货币类型
        getCurrencyList(callback) {
            var _this = this;
            getCurrencyList().then(res => {
                if (res && res.data) {
                    let map = {};
                    for (var key in res.data) {
                        map[res.data[key]] = key;
                    }
                    _this.currencyList = map;
                }
            });
        },
        // 余额
        getBalance() {
            let _this = this;
            Spin.show();
            getbalance().then(res => {
                Spin.hide();
                if (res.success) { 
                    let account = res.data.account;
                    this.balanceList = account;
                    this.totalBalance = res.data.totalBalance;
                    this.totalCNY = res.data.totalCNY;

                    this.bindPie(account);
                }
            });
        },
        bindPie(account){
            // 组装饼图数据
            let lbList = [];
            let dataList = [];  
            let otherBalance = 0;
            let has = false; // 是否有数据
            let count = 0;//计数，top4 + 1(其他)条数据     
            let total = 0;               
            for (var item of Object.values(account)) {
                item.params = {};
                if(item.cnyBalance>0){
                    total = new Big(total).plus(this.globalFun.formatFloat(item.cnyBalance,2));
                    
                    ++count;
                    if(count<=4){
                        dataList.push({
                            value: this.globalFun.formatFloat(item.cnyBalance,2), 
                            name: item.currencyName
                        })
                    }else{  
                        otherBalance += Number(item.cnyBalance);
                    }
                    
                }
            }
            // 沒有数据
            if(count === 0){
                lbList.push(-1);
                dataList.push({
                    value: -1, 
                    name: this.$t('fund.balance.pie.nodate')
                });
            }else{
                has = true;
                for(let item of dataList){
                    let pv = new Big(item.value).div(total).mul(100).toFixed(2) + "%";
                    item.name = item.name + " "+ pv;
                    lbList.push(item.name);
                }
                // 添加其他数据
                if(otherBalance>0){
                    var other = this.$t('fund.balance.pie.other')
                    let name = other + " " + new Big(this.globalFun.formatFloat(otherBalance,2)).div(total).mul(100).toFixed(2) + "%";
                    lbList.push(name);
                    dataList.push({
                        value: this.globalFun.formatFloat(otherBalance,2), 
                        name: name 
                    });
                }
            }
            this.chartPie = {
                lb: lbList,
                data: dataList,
                has: has
            }
        },
        // 配置参数
        getConfigList(){
            getExConfig().then(res => {
                if (res && res.data) { 
                    this.configList = res.data.currency;
                }
            });
        },
        // 提现、充值、冷却 操作
        operation(item,type){
            // if(type === 1){
            //     // 提现功能暂无开通，敬请期待!
            //     Message.warning({
            //         content: this.$t('fund.balance.coldingTip'),
            //         duration: 2
            //     });
            //     return false;
            // }
            if(this.type !== type || this.currType != item.currencyType){
                this.isOpen = true;
                this.type = type;
            }else{
                this.isOpen = this.isOpen?false:true;
            }
            this.currType = item.currencyType;
            if(this.isOpen){
                if(type === 1){
                    this.withdrawHistory = [];

                    this.withdrawIpt.destAddr = "";
                    this.withdrawIpt.amount = "";
                    this.withdrawIpt.tag = "";
                    this.withdrawIpt.isCommonAddress = false;
                    this.withdrawIpt.remark = "";
                    this.pageTotal = 0;
                    this.searchParam.curPage = 1;
                    this.getWithdrawHistory(item.currencyType);
                    this.getWithdrawAddress(item.currencyType);
                }
                if(type === 2){
                    this.depositFun(item.currencyType);
                }
            }
        },
        depositFun(currencyType){
            this.depositInfo = {
                addr : "--",
                tag : "--"
            }
            getDeposit({
                currency : currencyType
            }).then(res => {
                if (res && res.data) { 
                    this.depositInfo = res.data;
                    this.addressCopy = new this.clipboard(this.$refs.addressCopy[0]); 
                    
                    QRCode.toDataURL(this.depositInfo.addr,{
                        width:128,
                        height:128
                    }).then(url => {
                        this.qrCode = url;
                    }).catch(err => {
                        console.error(err)
                    })
                }
            });
            this.depositHistory = [];
            this.pageTotal = 0;
            this.searchParam.curPage = 1;
            this.getDepositHistory(currencyType);
        },
        // 提现历史记录
        getWithdrawHistory(currencyType){
            getWithdrawHistory({
                currency : currencyType,
                offset: this.searchParam.curPage,
                count: this.searchParam.pageSize
            }).then(res => {
                if (res && res.data) { 
                    this.withdrawHistory = res.data;
                    this.pageTotal = res.recordTotal;
                }
            });
        },
        // 提现地址
        getWithdrawAddress(currency){
            this.addressList = {
                list: [],
                show: false
            }
            withdrawAddressList({
                currency: currency
            }).then(res =>{
                if (res && res.data) { 
                    let list = res.data;
                    this.addressList.list = list || [];
                    if(list.length>0){
                        this.withdrawIpt.destAddr = list[0].address;
                        this.withdrawIpt.tag = list[0].remark;
                    }
                }
            })
        },
        // 充值历史记录
        getDepositHistory(currencyType){
            getDepositHistory({
                currency : currencyType,
                offset: this.searchParam.curPage,
                count: this.searchParam.pageSize
            }).then(res => {
                if (res && res.data) { 
                    this.depositHistory = res.data;
                    this.pageTotal = res.recordTotal;
                }
            });
        },
        // 提现
        withdraw(item){
            
            if(!this.hasWithdraw.realName){
                Modal.confirm({
                    content: this.$t('userCenter.safe.remark3'),
                    loading: false,
                    onOk: () => {
                        location.href = "/user_center.html#/identity";
                    }
                });
                return false;
            }
 
            if(!this.hasWithdraw.paypwd){
                Modal.confirm({
                    title: this.$t('userCenter.safe.close.title'),
                    content: this.$t('fund.balance.payPwdConfirm'),
                    loading: false,
                    onOk: () => {
                        location.href="./user_center.html#/guide?name=setPayPassword";
                    }
                });
                return false;
            }
            var configItem = this.configList[item.currencyType];
            if (this.globalFun.isStrEmpty(this.withdrawIpt.destAddr)) {
                Notice.error({title: this.$t('fund.balance.wAddressTip')});
                return false;
            }
            if (this.globalFun.isStrEmpty(this.withdrawIpt.amount)) {
                Notice.error({title: this.$t('fund.balance.wNumberTip')});
                return false;
            }
            let amount = Number(this.withdrawIpt.amount);
            if (amount>item.balance) {
                Notice.error({title: this.$t('fund.balance.wNumberUn')});
                return false;
            }
            if (amount<configItem.minWithdrawAmt) {
                Notice.error({title: this.$t('fund.balance.minNumber')+`${configItem.minWithdrawAmt}`});
                return false;
            }
            if (amount>configItem.maxWithdrawAmt) {
                Notice.error({title: this.$t('fund.balance.maxNumber')+`${configItem.maxWithdrawAmt}`});
                return false;
            }
            
            if(this.withdrawIpt.isCommonAddress && !this.withdrawIpt.remark){
                Notice.error({title: this.$t('fund.balance.remarkTip')});
                return false;
            }
            Modal.confirm({
                title: this.$t('fund.balance.wPort'),
                content: this.$t('fund.balance.wPortConfirm'),
                loading: true,
                onOk: () => {
                    Modal.remove();
                    this.currItem = item;
                    userVerify().then(res =>{
                        if(res && res.success){
                            this.modal.show = true;
                            this.modalParams = {
                                phoneCaptcha: "",
                                emailCaptcha: "",
                                paymentPwd: ""
                            };
                            this.verify = {
                                phone: res.data.phoneVerify,
                                email: res.data.emailVerify,
                            };
                        }
                    });
                }
            });
        },
        confirm(){
            var _this = this;
            var params = {
                amount: Number(this.withdrawIpt.amount),
                currency:this.currItem.currencyType,
                destAddr:this.withdrawIpt.destAddr,
                isCommonAddress: this.withdrawIpt.isCommonAddress?1:2,
                remark: this.withdrawIpt.remark
            }
            if(this.verify.phone){
                if(!this.modalParams.phoneCaptcha){
                    Message.error(this.$t('fund.balance.modal.mes1'));
                    return false;
                }
                params.phoneCaptcha = this.modalParams.phoneCaptcha;
            }
            if(this.verify.email){
                if(!this.modalParams.emailCaptcha){
                    Message.error(this.$t('fund.balance.modal.mes2'));
                    return false;
                }
                params.emailCaptcha = this.modalParams.emailCaptcha;
            }
            if(!this.modalParams.paymentPwd){
                Message.error(this.$t('fund.balance.modal.mes3'));
                return false;
            }
            if (this.currItem.currencyType === 104) {
                params.memo = this.currItem.params.destAddTag || '';
            }
            params.payPwd = md5(this.modalParams.paymentPwd);
            if(!this.loginning){
                this.loginning = true;
                withdraw(params).then((res) => {    
                    this.loginning = false;
                    setTimeout(() => {
                        if (res && res.success) {
                            this.modal.show = false;
                            Notice.success({title: this.$t('fund.balance.wInfo'), desc: this.$t('fund.balance.wSuccess')});
                            // 交易成功以后，要更新相关联的一些信息
                            _this.withdrawIpt = {
                                isCommonAddress: false
                            }; 
                            _this.getBalance();
                            _this.getWithdrawHistory(params.currency);
                        }
                    }, 1000);
                });
            }
        },
        // 交易跳转
        redirect(item) {
            let currentConType = "";
            let currentContent = this.currentEXType+"_"+this.currencyList[item.currencyType];
            for(var key in contractTypeGroup){
                if(contractTypeGroup[key] === currentContent){
                    currentConType = key;
                    break;
                }
            }
            let url = "./exchange.html?currentExType="+this.currentEXType;
            if(currentConType!==""){
                url+="&currentConType="+currentConType;
            }
            location.href = url;
        },
        countdown(time){
            let _this = this;
            var interval = setInterval(function(){
                _this[time+"_text"] = _this.$t('userCenter.safe.modal.senText');
                if(_this.modal[time]<=0){
                    clearInterval(interval)
                }else{
                    _this.modal[time] -= 1; 
                }
            },1000);
        },
        sendPhone(){
            if(this.isSendPhone){
                this.isSendPhone = false;
                this.phoneTime_text = this.$t('userCenter.safe.modal.sendIn');
                getCodeByPhone().then(res =>{
                    this.isSendPhone = true;
                    if(res && res.success){
                        this.modal.phoneTime = this.time;
                        this.countdown("phoneTime");
                        Message.success(this.$t('fund.balance.modal.sendSuccess'));
                    }else{
                        this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
                    }
                })
            }
            
        },
        sendEmail(){
            if(this.isSendEmail){
                this.isSendEmail = false;
                this.emailTime_text = this.$t('userCenter.safe.modal.sendIn');
                getCodeByEmail({
                    type: 3
                }).then(res =>{
                    this.isSendEmail = true;
                    if(res && res.success){
                        this.modal.emailTime = this.time;
                        this.countdown("emailTime");
                        Message.success(this.$t('fund.balance.modal.sendSuccess'));
                    }else{
                        this.emailTime_text = this.$t('userCenter.safe.modal.senText');
                    }
                })
            }
        },
        getUserDetail(){
            getUserDetail().then(res =>{
                if(res && res.success){
                    this.hasWithdraw = {
                        realName: res.data.status === 1,
                        paypwd: res.data.paySet
                    }
                }
            });
        },
        copy() {
            var _this = this;
            let clipboard = _this.addressCopy;
            clipboard.on('success', function() {
                Message.success(_this.$t('userCenter.safe.remark4'));
                clipboard.destroy();
                _this.addressCopy = new _this.clipboard(_this.$refs.addressCopy[0]);
            });
        },
        // 若地址改变，则清空tag
        changeAddr(){
            this.withdrawIpt.tag = "";
        },
        convertPageWithdraw(index){ //选择页数
            this.searchParam.curPage = index;
            this.getWithdrawHistory(this.currType);
        },
        convertPageDeposit(index){ //选择页数
            this.searchParam.curPage = index;
            this.getDepositHistory(this.currType);
        },
        checkItem(item){
            this.withdrawIpt.destAddr = item.address;
            this.withdrawIpt.tag = item.remark;
            this.addressList.show = false;
        },
        select(){
            this.addressList.show = !this.addressList.show;
        }
    },
    components: {
        Button,Modal,Page,Checkbox,Icon,
        "chart-pie":chartPie
    },
};
</script>

<style lang="scss" scoped="scoped">
.user-center {
    width:1200px;
    .balance-outer{
        display: flex;
        .balance{
            flex: 1;
            background-color: #fff;
            color: #333;
            border-radius: 5px;
            padding: 36px 50px 25px 50px;
            .title{
                line-height: 18px;
                margin-bottom: 30px;
                color: #666;
            }
            .number{
                label:first-child{
                    font-size: 48px;
                    font-weight: 600;
                    margin: 0 14px 0 0;
                }
            }
            .cny{
                font-size: 14px;
                margin-top: 10px;
                label{
                    &:nth-child(1){
                        color: #999;
                        margin-right: 5px;
                    }
                }
            }
            .line{
                margin: 60px 0 0 0;
                .outer{
                    width: 120px;
                    height: 5px;
                    background-color: #E9EAEE;
                    display: inline-block;
                    border-radius: 5px;
                    position: relative;
                    margin-right: 10px;
                    .inner{
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 50%;
                        border-radius: 5px;
                        display: inline-block;
                        background-color: #ff8a00;
                    }
                }
            }
            .btn{
                font-size: 14px;
                color: #ff8a00;
            }
        }
        .pieChart{
            border-radius: 5px;
            width: 450px;
            background-color: #fff;
            margin-left: 8px;
        }
    }
    
    .data-list{
        padding-bottom: 220px;
        .title{
            height: 70px;
            line-height: 70px;
            margin: 0 50px;
            display: flex;
            text-align: center;
            font-size: 16px;
            color: #333;
            li{
                flex: 1;
            }
        }
        .data{
            background: #fff;
            color: #666;
            font-size: 16px;
            padding-bottom: 90px;
            li{
                margin: 0 50px;
                text-align: center;
                .item{
                    display: flex;
                    height: 80px;
                    line-height: 80px;
                    border-bottom:1px dashed #ddd;
                    span{
                        flex: 1;
                    }
                    button{
                        line-height: 22px;
						padding: 0 9px;
                        font-size: 14px;
                        border-radius: 3px;
                    }
                    .btn-hollow{
                        border: 1px solid #666;
                        color: #666;
                        background-color: transparent;
                        margin-right: 10px;
                        transition: all 0.6s ease 0s;
                        &.disabled{
                            border: 1px solid #eee;
                            background-color: #eee;
                            color: #fff;
                            &.disabled:hover{
                                border: 1px solid #eee;
                                background-color: #eee;
                                color: #fff;
                            }
                        }
                    }
                    
                    .btn-hollow:hover,.btn-hollow.active{
                        border: 1px solid #ff8a00;
                        color: #ff8a00;
                    }
                    .btn-solid{
                        border: 1px solid #ff8a00;
                        color: #ffffff;
                        background-color: #ff8a00;
                        &.disabled {
                            border: 1px solid #eee;
                            background-color: #eee;
                            color: #fff;
                        }
                    }
                    .icon{
                        width: 24px;
                        height: 24px;
                        margin: 27px 0 0 70px;
                        display: inline-block;
                        vertical-align: top;
                    }
                    .emp{
                        display: inline-block;
                        width: 50px;
                    }
                    .name{
                        text-align: left !important;
                        display: flex;
                        align-items: center;
                        .logo{
                            display: inline-block;
                            margin:0 10px 0 70px;
                            width: 24px;
                            height: 24px;
                        }
                        .ETH{
                            width: 17px;
                            height: 23px;
                            margin:0 13px 0 74px;
                        }
                    }
                }
            }
            .down{
                .cnt{
                    background-color: #f0f0f7;
                    margin-top: 20px;
                    padding: 50px 50px 80px 80px;
                    text-align: left;
                    .cnt-withdraw{
                        .address{
                            display: flex;
                            margin-bottom: 12px;
                            align-items: center;
                            .ipt{
                                border: 1px solid #ddd;
                                border-radius: 3px;
                                background-color: #fff;
                                display: flex;
                                width: 545px;
                                position:relative;
                                margin-left: 5px;
                                input{
                                    margin-bottom: 0;
                                    border:0;
                                    flex: 1;
                                }
                                .tag{
                                    line-height: 40px;
                                    text-align: center;
                                    span{
                                        display: inline-block
                                    }
                                    .ivu-icon{
                                        width: 20px;
                                        line-height: 40px;
                                        cursor: pointer;
                                    }
                                }
                            }
                            .content{
                                position: absolute;
                                left: 0px;
                                top: 40px;
                                background: #fff;
                                border: 1px solid #ddd;
                                width: 100%;
                                li{
                                    margin: 0;
                                    line-height: 40px;
                                    padding: 0 10px;
                                    text-align: left;
                                    display: flex;
                                    font-size: 14px;
                                    .addr{
                                        flex: 1;
                                    }
                                    &:hover{
                                        background: #ffd6a5;
                                        color: #fff;
                                        cursor: pointer;
                                    }
                                }
                            }
                            .ivu-icon-android-arrow-dropdown{
                                transition: all 0.4s ease 0s;
                            }
                            .transform{
                                
                                transform: rotate(180deg); 
                            }
                        }
                        label{
                            display: inline-block;
                            width: 80px;
                            margin-right: 10px;
                            color: #666;
                            white-space: nowrap;
                        }
                        input{
                            width: 410px;
                            height: 40px;
                            border: 1px solid #ddd;
                            border-radius: 3px;
                            background-color: #fff;
                            padding: 0 7px;
                            margin-bottom: 12px;
                        }
                        button{
                            width: 410px;
                            height: 38px;
                            border: 0;
                            background-color: #ff8a00;
                            color: #fff;
                            border-radius: 3px;
                            margin:50px 5px;
                        }
                        em{
                            font-size: 14px;
                            color: #b4b4d8;
                            font-weight: 200;
                            margin-left: 10PX;
                        }
                        .rate{
                            color: #ff8a00;
                            line-height: 14px;
                            font-size: 14px;
                            margin: 0 0 18px 0;
                        }
                        .remark{
                            height: 50px;
                            display: flex;
                            align-items: center;
                            label.ivu-checkbox-wrapper{
                                font-size: 16px;
                                width: inherit;
                            }
                            .lb{
                                width: inherit;
                                margin-left: 59px;
                            }
                            input{
                                width: 260px;
                                margin: 0;
                                
                            }
                        }
                    }
                    .cnt-recharge{
                        .address{
                            color: #666;
                            margin-bottom: 38px;
                            line-height: 20px;
                            display: flex;
                            span:nth-child(1){
                                flex:1;
                            }
                            span:nth-child(2){
                                display: flex
                            }
                            label{
                                font-size: 18px;
                                color: #333;
                                font-weight: 500;
                            }
                            .btn{
                                font-size: 14px;
                                color: #ff8a00;
                                margin-left: 20px;
                            }
                        }
                        .tip{
                            font-size: 16px;
                            color: #ff8a00;
                            line-height: 18px;
                            margin-bottom: 118px;
                        }
                        .qrcode{
                            width: 26px;
                            height: 26px;
                            display: inline-block;
                            margin-left: 50px;
                            cursor: pointer;
                            position: relative;
                            background: url('./../../../common/assets/images/qrcode.png') no-repeat;
                        }
                       
                    }
                    .notice{
                        font-size: 12px;
                        line-height: 20px;
                        color: #999;
                    }
                }
            }
        }
    }
    .history{
        margin-top: 50px;
        .nav{
            color: #333;
            line-height: 18px;
            padding: 30px 0;
            border-top: 1px dashed #ddd;
        }
        .title-list{
            display: flex;
            li{
                flex: 1;
                margin: 0;
                color: #333;
                font-size: 14px;
                text-align: center;
                margin-bottom: 30px;
            }
        }
        .history-list{
            li{
                background-color: #fff;
                margin: 0;
                height: 80px;
                line-height: 80px;
                display: flex;
                border-top: 1px dashed #ddd;
                span{
                    flex: 1;
                    text-align: center;
                }
            }
            li:first-child{
                border-top: none;
            }
        }
        
    }
    
}
.login-modal{
    .cnt{
        font-size: 14px;
        margin:0 20px 0 20px; 
        .tip{
            line-height: 16px;
            margin-bottom: 20px;
            color: #333;
        }
        .item{
            display: flex;
            height: 34px;
            line-height: 34px;
            margin-bottom: 10px;
            input{
                flex: 1;
                border: 1px solid #e5e5e5;
                padding: 0 10px;
            }
            .send{
                cursor: pointer;
                min-width: 100px;
                padding:0 8px;
                margin-left: 12px;
                border: 1px solid #ff8a00;
                border-radius: 3px;
                text-align: center;
                color: #ff8a00;
            }
        }
    }
}

.ENG{
    .operation{
        flex: 1.1 !important;
    }
    .down{
        .cnt-withdraw{
            label{
                min-width: 180px;
                text-align: right;
                letter-spacing: 0px !important;
            }
        }
    }
}
</style>
<style>
.login-modal .ivu-modal-footer{
    border-top: 0 !important;
    text-align: center;
    padding: 0 36px 36px 36px;
}
.login-modal .ivu-modal-footer .ivu-btn{
    width: 100%;
    background-color: #ff8a00;
    border: 1px solid #ff8a00;
    
}
.qrcode em{
    position: absolute;
    width: 130px;
    height: 130px;
    border: 1px solid #ddd;
    
    background: #fff;
    text-align: center;
    z-index: 999;
    left: -145px;
    top: -8px;
    border-radius:3px;
    box-shadow: #ddd 0px 0px 10px;
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
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    z-index: 999;
    background-color: #fff;
    right: -6px;
    top:15px;
    transform: rotate(-45deg);
}


</style>