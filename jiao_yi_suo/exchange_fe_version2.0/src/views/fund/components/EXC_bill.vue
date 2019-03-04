<template>
    <div class="EXCBill" :class="$i18n.locale">
        <div class="bill-setting">
            <div class="bill-choose">
                <span>
                    <label class="lb">{{$t('fund.bill.coin1')}}</label>
                    <Select v-model="searchParam.currency" :placeholder="$t('fund.bill.all')" style="width:100px;">
                        <Option value="">{{$t('fund.bill.all')}}</Option>
                        <Option v-if="key>=71" v-for="(value,key) of contractTypeGroup" :value="key" :key="key">{{value}}</Option>
                    </Select>
                </span>
                <span>
                    <label class="lb">{{$t('fund.bill.selectType')}}</label>
                    <Select v-model="searchParam.type" :placeholder="$t('fund.bill.all')">
                        <Option value="">{{$t('fund.bill.all')}}</Option>
                        <Option value="1">{{$t('fund.bill.purchase')}}</Option>
                        <Option value="2">{{$t('fund.bill.sold')}}</Option>
                    </Select>
                </span>
                <span>
                    <label class="lb">{{$t('fund.bill.start')}}</label>
                    <DatePicker v-model="searchParam.start" type="date" :placeholder="$t('fund.bill.startTime')" style="width: 200px"></DatePicker>
                    <label class="lb ml-10">{{$t('fund.bill.to')}}</label>
                    <DatePicker v-model='searchParam.end'  type="date" :placeholder="$t('fund.bill.endTime')" style="width: 200px"></DatePicker>
                </span>
                <Button type="success" @click="search()">{{$t('fund.bill.query')}}</Button>  
            </div> 
            <div class="bill-contain">
                <ul class="ul">
                    <li class="li">
                        <span>{{$t('fund.bill.time')}}</span>
                        <span>{{$t('fund.bill.pair')}}</span>
                        <span>{{$t('fund.bill.direction')}}</span>
                        <span>{{$t('fund.bill.number')}}</span>
                        <span>{{$t('fund.bill.balance')}}</span>
                        <span>{{$t('fund.bill.free')}}</span>
                    </li>
                    <ul class="balance-list-contain">
                        <li v-for="(item,index) of arrayList" :key="index">
                            <span>{{globalFun.dateFormat(item.matchTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
                            <span>{{contractTypeGroup[item.contractType]}}</span>
                            <span>{{typeGroup[item.bsFlag]}}</span>
                            <span>{{item.matchQty  | formatFloat(decimalDigits.currency[formatCurrencyKey(item)]? decimalDigits.currency[formatCurrencyKey(item)]: 8)}}</span>
                            <span>{{item.balance  | formatFloat(decimalDigits.currency[formatCurrencyKey(item)]? decimalDigits.currency[formatCurrencyKey(item)]: 8) }}</span>
                            <span>{{item.distributionFee  | formatFloat(decimalDigits.currency[formatCurrencyKey(item)]? decimalDigits.currency[formatCurrencyKey(item)]: 8)}}</span>
                        </li>
                        <span class="NoBill" v-show="arrayList.length=='0'">{{$t('fund.bill.noBillDetail')}}</span> 
                    </ul>
                </ul>
                <Page v-if="pageTotal>0" :current.sync="searchParam.curPage"  :total="pageTotal" :page-size="searchParam.pageSize"  @on-change="convertPage"  show-elevator show-total></Page>
            </div>  
        </div>
    </div>
</template>

<script>
    import {userHistory,getCurrencyList } from '@api/api_group';
    import decimalDigits from '@common/settings/decimalDigits';
    import contractTypeGroup from '@common/settings/contractTypeGroup';
    
    import {Select,Option,DatePicker,Button,Spin,Page} from 'iview';

    export default {
        data() {
            return {
                pageTotal:1,//列表总数
                arrayCoin:[],//币种列表
                currencyList: [], // 币种列表，中转
                arrayList:[],//账单列表
                typeGroup: { // 流水类型
                    // 1:this.$t('fund.bill.dispoint'),
                    // 2:this.$t('fund.bill.withdraw'), 
                    1:this.$t('fund.bill.purchase'), 
                    2:this.$t('fund.bill.sold')
                }, 
                searchParam:{
                    currency:"",
                    start:"",
                    end:"",
                    type:"",
                    curPage:1,
                    pageSize:10
                }, 
               
                decimalDigits: decimalDigits,    
                contractTypeGroup: contractTypeGroup           
            }
        },
        created() {
            this.getCoinList();
            this.getHistory();
        },
        methods: {
            changePage:function(page){ //选择页数
                let _this = this;
                _this.searchParam.curPage = page;
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
                var params = JSON.parse(JSON.stringify(this.searchParam));
                var startTime = params.start;
                if(startTime){
                    params.start = new Date(startTime).getTime();
                }
                var endTime = params.end;
                if(endTime){
                    params.end = new Date(endTime).getTime() + 1000 * 60 * 60 * 24-1000;
                }
                Spin.show();
                userHistory(params).then((res) => {
                    if (res.success) {
                        Spin.hide();
                        _this.arrayList = res.data;
                        _this.pageTotal = res.recordTotal;
                    }
                });
            },
            search:function(){//查询
                this.searchParam.curPage = 1;
                this.getHistory();
            },
            convertPage(index){ //选择页数
                this.searchParam.curPage = index;
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
            DatePicker,
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
            width: 100px;
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
                span:first-child {
                    flex: 3;
                }
                span {
                    flex: 2;
                    display: inline-block;
                    text-align: center;
                    width: 19%;
                }
            }
            .balance-list-contain {
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
                li {
                    background-color: #f0f0f7;
                    height: 80px;
                    line-height: 80px;
                    font-size: 14px;
                    color: #666;
                    display: flex;
                    border-top: 1px dashed #ddd;
                    span:first-child {
                        flex: 3;
                    }
                    span {
                        flex: 2;
                        display: inline-block;
                        text-align: center;
                        margin: 0 auto;
                        width: 19%;
                    }
                }
                li:first-child {
                    border-top: none;
                }
                .NoBill {
                    display: block;
                    text-align: center;
                    font-size: 16px;
                    padding-top: 100px;
                }
            }
            .page {
                display: block;
                text-align: center;
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
