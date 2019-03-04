<template>
    <section class="user-center" >
        <div class="bill-setting">
            <p class="bill-title"><i></i>{{$t('fund.bill.title')}}</P>
            <div class="bill-choose">
                <span>
                    <label class="lb">{{$t('fund.bill.coin')}}</label>
                    <Select v-model="coin" :placeholder="$t('fund.bill.all')">
                        <Option value="">{{$t('fund.bill.all')}}</Option>
                        <Option v-for="(item,index) of arrayCoin" :value="item.id" :key="index">{{item.name}}</Option>
                    </Select>
                </span>
                <span>
                    <label class="lb">{{$t('fund.bill.selectType')}}</label>
                    <Select v-model="selectType" :placeholder="$t('fund.bill.all')">
                        <Option value="">{{$t('fund.bill.all')}}</Option>
                        <Option value="1">{{$t('fund.bill.recharge')}}</Option>
                        <Option value="2">{{$t('fund.bill.withdrawals')}}</Option>
                        <Option value="3">{{$t('fund.bill.purchase')}}</Option>
                        <Option value="4">{{$t('fund.bill.sold')}}</Option>
                    </Select>
                </span>
                <span>
                    <label class="lb">{{$t('fund.bill.start')}}</label>
                    <DatePicker v-model="start" type="datetime" :placeholder="$t('fund.bill.startTime')" style="width: 170px"></DatePicker>
                    <label class="lb ml-10">{{$t('fund.bill.to')}}</label>
                    <DatePicker v-model='end'  type="datetime" :placeholder="$t('fund.bill.endTime')" style="width: 170px"></DatePicker>
                </span>
                <Button type="success" @click="search()">{{$t('fund.bill.query')}}</Button>  
            </div> 
            <div class="bill-contain">
                    <ul class="ul">
                        <li class="li">
                            <span>{{$t('fund.bill.time')}}</span>
                            <span>{{$t('fund.bill.currency')}}</span>
                            <span>{{$t('fund.bill.type')}}</span>
                            <span>{{$t('fund.bill.number')}}</span>
                            <span>{{$t('fund.bill.balance')}}</span>
                            <span>{{$t('fund.bill.free')}}</span>
                        </li>
                        <ul class="balance-list-contain">
                            <li v-for="(item,index) of arrayList" :key="index">
                                <span>{{globalFun.dateFormat(item.createTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
                                <span>{{formatCurrency(item)}}</span>
                                <span>{{typeGroup[item.type]}}</span>
                                <span>{{item.amount  | formatFloat(decimalDigits.currency[formatCurrencyKey(item)]? decimalDigits.currency[formatCurrencyKey(item)]: 8)}}</span>
                                <span>{{item.balance  | formatFloat(decimalDigits.currency[formatCurrencyKey(item)]? decimalDigits.currency[formatCurrencyKey(item)]: 8) }}</span>
                                <span>{{item.fee  | formatFloat(decimalDigits.currency[formatCurrencyKey(item)]? decimalDigits.currency[formatCurrencyKey(item)]: 8)}}</span>
                            </li>
                            <span class="NoBill" v-show="arrayList.length=='0'">{{$t('fund.bill.noBillDetail')}}</span> 
                        </ul>
                        <!-- <span class="page" v-show="arrayList.length>'0'"><Page :total="total"  @on-change="changePage" :page-size="10" :current='page'></Page></span> -->
                    </ul>
            </div>  
        </div>
    </section>
</template>

<script>
    import {userHistory,getCurrencyList } from '@api/api_group';
    import decimalDigits from '@common/settings/decimalDigits';
    import {Select,Option,DatePicker,Button,Spin} from 'iview';
    export default {
        data() {
            return {
                page:1,//页码
                pageSize:`999999`,//页大小
                total:1,//列表总数
                selectType:``,
                coin:``,//币种
                arrayCoin:[],//币种列表
                currencyList: [], // 币种列表，中转
                arrayList:[],//账单列表
                typeGroup: { // 流水类型
                    1:this.$t('fund.bill.dispoint'),
                    2:this.$t('fund.bill.withdraw'), 
                    3:this.$t('fund.bill.purchase'), 
                    4:this.$t('fund.bill.sold')
                }, 
                start:``,//开始时间
                end:``,//结束时间,
                decimalDigits: decimalDigits,               
            }
        },
        created() {
            this.getCoinList();
            this.getHistory();
        },
        methods: {
            changePage:function(page){ //选择页数
                let _this = this;
                _this.page = page;
                _this.getHistory();
            },
            getCoinList:function(){ //获取所有币种列表
                let _this = this;
                Spin.show();
                getCurrencyList().then((res) => {
                        Spin.hide();
                        if (res.success) {
                            this.currencyList = res.data;
                            res = res.data;
                            for (let i in res){
                                let str = {
                                    name : i,
                                    id : res[i]
                                }
                                _this.arrayCoin.push(str);
                            }
                        }
                });
            },
            getHistory:function(){ //查询账单列表
                let _this = this;
                let params = {
                    currency:_this.coin,//币种
                    type:_this.selectType,//类型 1:充值，2:提现，3:买入，4:卖出
                    start: _this.start === ''? '': Date.parse(_this.start).toString(),//起始时间
                    end: _this.end === ''? '': Date.parse(_this.end).toString(),//结束时间
                    curPage:_this.page,//当前页数
                    pageSize:_this.pageSize//显示条数
                }
                // Spin.show();
                userHistory(params).then((res) => {
                    if (res.success) {
                        // Spin.hide();
                        _this.arrayList = res.data;
                    }
                });
            },
            search:function(){//查询
                this.getHistory();
            },
            formatCurrency(item) {
                for (let i in this.currencyList) {
                    if (item.currency === this.currencyList[i] || item.currency === this.currencyList[i] - 0) {
                        return i;
                    }
                }
            },
            formatCurrencyKey(item) {
                for (let i in this.currencyList) {
                    if (item.currencyType === this.currencyList[i]) {
                        return this.currencyList[i];
                    }
                }
            }
        },
        components: {
            Select,
            Option,
            Button,
            DatePicker
        },
    }
</script>

<style lang="scss" scoped="scoped">
.user-center{
    // background-color: #ffffff;
    width:1200px;
    .bill-setting{
        // height:800px;
        .bill-title{
            font-size: 22px;
            font-weight: 500;
            line-height: 22px;
            color:#333333;
            padding:50px 50px 48px 50px;
            background-color: #fff;
            i{
                width: 10px;
                height: 10px;
                background-color: #615de3;
                border-radius: 50%;
                display: inline-flex;
                vertical-align: top;
                margin: 8px 8px 0 0;
            }
        }
        .bill-choose{
            font-size: 14px;
            font-weight: 550;
            color:#333333;
            padding:0 50px; 
            background-color: #fff;
            span{
                display: inline-flex;
                // width:20%;
                margin:0 26px 0 0;
            }
            .lb{
                display: inline-flex;
                line-height: 30px;
                margin: 0 18px 0 0;
            }
            button{
                background-color: #615de3;
                border-color:#615de3;
                width: 103px;
            }
        }
        .bill-contain{
            border-radius: 5px;
            // height: 600px;
            padding: 80px 50px;
            margin-bottom: 220px;
            font-size: 16px;
            color: #333;
            background-color: #fff;
            .ul{
                border-radius: 5px;
                // height:530px;
                .li{
                    line-height: 18px;
                    font-size: 16px;
                    color:#333333;
                    font-weight: 550;
                    margin-bottom: 30px;
                    display: flex;
                    span:first-child {
                        flex: 2;
                    }
                    span{
                        flex: 1;
                        display: inline-block;
                        text-align: center;
                        width:19%;
                    }
                }
                .balance-list-contain{
                    // height:500px;
                    background-color: #fff;
                    overflow-y: scroll;
                    &::-webkit-scrollbar {
                        width: 5px;
                    }
                    &::-webkit-scrollbar-thumb {
                        width: 5px;
                        background-color: #333333;
                        border-radius: 5px;
                    }
                    li{
                        background-color: #f0f0f7;
                        height: 80px;
                        line-height: 80px;
                        font-size: 16px;
                        color:#666;
                        display: flex;
                        border-top: 1px dashed #ddd;
                        span:first-child {
                            flex: 2;
                        }
                        span{
                            flex: 1;
                            display: inline-block;
                            text-align: center;
                            margin: 0 auto;
                            width:19%;
                        }
                    }
                    li:first-child{
                        border-top: none;
                    }
                    .NoBill{
                        display: block;
                        text-align: center;
                        font-size:16px;
                        padding-top:100px;
                    }
                }
                .page{
                    display: block;
                    text-align: center;
                }
            }
        }
    }
}
</style>
<style>
 .ivu-select-single{
     width:100px;
 }
</style>
