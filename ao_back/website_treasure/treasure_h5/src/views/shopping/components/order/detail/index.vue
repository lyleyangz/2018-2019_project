<template>
	<div class="orderDetail">
		<!-- <mt-header class="myHeader" fixed title="订单详情">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header> -->
        <div class="cnt">
            <div class="address">
                <div>联系人：{{info.uName}} {{info.phone}}</div>
                <div class="mt">地址：{{info.address}}</div>
            </div>

            <div class="info">
                <div class="orderId">订单编号：{{info.oNum}}</div>
                <div><img class="img" :src="info.proUrl" alt=""></div>
                <div class="row name">
                    <div class="col">{{info.proName}}</div>
                    <div>数量：{{info.proCount}}</div>
                </div>
                <div class="row price">
                    <div class="col">商品价格(元)：<label class="red">{{(info.singlePrice || 0).toFixed(2)}}</label></div>
                    <div class="red">
                        
                        <div v-if="info.oType == 1" class="status block-right">{{statusList[info.oStatus]}}</div>
                        <div v-if="info.oType == 2" class="status block-right" :class="info.takeStatus==2?'receive':''">
                            <label v-if="info.oStatus!=1 && info.oStatus!=5 && info.oStatus!=3">
                                {{takeList[info.takeStatus]}}
                            </label>
                            <label v-if="info.takeStatus == 2 && info.oStatus!=1 && info.oStatus!=2 && info.oStatus!=6 && info.oStatus!=5 && info.oStatus!=3">-</label>
                            <label v-if="info.takeStatus == 2 && info.oStatus!=2 && info.oStatus!=6">
                                {{giftStatusList[info.oStatus]}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row sku">
                    <div class="col">{{info.storeProperties}}</div>
                </div>
                <div class="line"  v-if="Number(info.temporaryNum)>0">
                    <div class="token">
                        劳动token折扣：<label>{{((Number(info.temporaryNum) * Number(info.tokenToVaac) * Number(info.vaacWorth)) || 0).toFixed(2)}}</label>
                    </div> 
                    <div>
                        应付款：<label class="red" v-if="info.singlePrice - Number(info.temporaryNum) * Number(info.tokenToVaac) * Number(info.vaacWorth)>0">￥{{(info.singlePrice - Number(info.temporaryNum) * Number(info.tokenToVaac) * Number(info.vaacWorth) || 0).toFixed(2)}}</label>
                        <label class="red" v-if="info.singlePrice - Number(info.temporaryNum) * Number(info.tokenToVaac) * Number(info.vaacWorth)<=0">￥0.00</label>
                    </div>  
                </div>
                <div class="line" v-if="info.consumerType == 3 || info.consumerType == 6">
                   <div class="token">
                        消费token：<label>{{info.consumeGold}}</label>
                    </div>  
                    <div>
                        token手续费率(%)：<label>{{Number(info.tokenCut)*100}}</label>
                    </div>  
                    <div>
                        token手续费：<label class="red">{{(Number(info.discountGold) || "0")}}</label>
                    </div>
                    <div class="token">
                        合计消费token：<label class="red">{{(Number(info.consumeGold)+Number(info.discountGold) || "0")}}</label>
                    </div>    
                </div>
                <!-- 纯通证 -->
                <div class="line" v-if="info.consumerType == 2 || info.consumerType == 6">
                   <div class="token">
                        消费通证：<label>{{(Number(info.vaac))}}</label>
                    </div>  
                    <div>
                        矿工费率(%)：<label>{{Number(info.vaacCut)*100}}</label>
                    </div>  
                    <div>
                        矿工搬运费：<label class="red">{{(Number(info.vaac)*Number(info.vaacCut))}}</label>
                    </div>
                    <div class="token">
                        合计消费通证：<label class="red">{{Number(info.vaacAccount)}}</label>
                    </div>    
                </div>
                <div class="line">
                    <div class="total">
                        实际付款(元)：<label class="red">{{total.toFixed(2)}}</label>
                    </div>
                </div>
                <div class="line ">
                   <div class="row">
                        <div class="col endtoken">获得token：{{info.takeGold}}</div>
                        <div class="data">下单时间：{{info.createTime}}</div>
                   </div>
                </div>
                

                <div class="opt">
                    <div class="row">
                        <div class="btn-inner" v-if="info.oStatus == 1" @click="cancelOrder">取消订单</div>
                        <div class="btn" v-if="info.oStatus == 1" @click="gopay(info)">付款 {{timeMap[this.info.id]}}</div>
                        <div class="btn" v-if="info.oStatus == 3 && info.oType == 1" @click="confirmCollect">确认收货</div>
                        <div class="btn-inner" v-if="info.oType == 1 && info.oStatus == 4" @click="evaluate">去评价</div>
                        <div v-if="info.oType == 2 && info.takeStatus == 2 && info.oStatus==4" class="btn-inner" @click.stop="evaluate">去评价</div>
                        <div class="btn" v-if="(info.oStatus == 4 || info.oStatus == 5) && info.oType == 1" @click="afterSale">申请售后</div>
                    </div>
                    <div v-if="((info.oStatus == 3 || info.oStatus == 4 || info.oStatus == 5) && info.oType == 1) || ((info.oStatus == 5 || info.oStatus==4) && info.oType == 2)">
                        <router-link :to="`/order/logistics/`+id">
                        <div>查看物流</div>
                        </router-link>
                    </div>
                </div>
            </div>
            
        </div>
	</div>
</template>

<script>
    import eventBus from "@/common/eventBus/eventBus.js";
	import {cancelOrder, orderDetail,confirmCollect } from "@api/api_order";
	import {Toast,Indicator,MessageBox} from 'mint-ui';
	
	export default {        
		data() {
			return {
                id: this.$route.params.id,
			   	info:{
                    totalPrice: 0,
                    discountGold: 0,
                    consumeGold: 0  
                },
                total: 0,
                statusList:{  
                    "1": "待付款",
                    "2": "待发货",
                    "3": "已发货",
                    "4": "待评价",
                    "5": "已完成"
                },
                giftStatusList:{  
                    "1": "待付款",
                    "2": "待评价",
                    "3": "待评价",
                    "4": "待评价",
                    "5": "已完成",
                    "6": "待付款",
                    "-1": "已取消",
                    "-2": "已取消"
                },
                takeList:{
                    "1": "未领取",
                    "2": "已领取"
                },
                timeMap: {},
                intervalMap: {}
			
			}
		},
		mounted() {
            this.getInfo();
            document.title = "订单详情";
            eventBus.$on("evaluateCallback", () => {
                this.getInfo();
            });
        },
        destroyed:function(){
            this.clearAll();
        },
		methods: {
            gopay(item){
                let payObj = {
                    payMoney:Number(item.singlePrice)-Number(item.discountPrice),
                    tokenPay:item.consumeGold,
                    sysm:{
                        vaacWorth:Number(item.vaacWorth),
                        vaacCut:Number(item.vaacCut),
                        giveToken:Number(item.giveToken)
                    },
                    // 礼品订单
                    share_data:{}
                }
                let Otype = item.oType;
                if(Otype == 2){
                    payObj.share_data = {
                        proUrl: item.proUrl,
                        proName: item.proName,
                        singlePrice: item.singlePrice,
                    }
                }
                sessionStorage.setItem("order_type", Otype);
                sessionStorage.setItem("TOPAYDATA", JSON.stringify(payObj));
                setTimeout(() => {
                    this.$router.push({
                        path: `/pay/${this.id}`
                    });
				}, 500);
            },
            getInfo(){
                orderDetail({
                    id: this.id
                }).then(res=>{
                    let storeProperties = "";
                    if(res.data.storeProperties){
                        for(let i in res.data.storeProperties){
                            storeProperties += res.data.storeProperties[i].name + ":" +res.data.storeProperties[i].value +";"
                        }
                    }
                    res.data.storeProperties = storeProperties;
                    this.info = res.data || {};
                    var val = Number(this.info.singlePrice)-Number(this.info.discountPrice);
                    if(val>0){
                        this.total = val;
                    }
                    this.clearAll();
                    this.countdown(this.info);
                })
            },
            cancelOrder(item){
                MessageBox.confirm('', { 
                    message: '订单一旦取消无法恢复', 
                    title: '', 
                    confirmButtonText: '确定取消',
                    cancelButtonText: '再考虑下'
                }).then(action => {
                   cancelOrder({    
                        orderId:this.id
                   }).then(res => {
                       if(res.code == 200){
                           if(res.data){
                               Toast('取消成功');
                               eventBus.$emit("refreshList");
                               this.$router.go(-1);
                           }else{
                               Toast('取消失败')
                           }
                       }
                   });
                }).catch(err => { 
                    
                });
            },
            confirmCollect(){
                MessageBox.confirm('', { 
                    message: '确认已收货？', 
                    title: '', 
                }).then(action => { 
                   confirmCollect({
                        oStatus:4,
                        id:this.id
                   }).then(res => {
                       if(res.code == 200){
                           Toast('已确认收货')
                       }
                       this.getInfo();
                   })
                }).catch(err => { 
                    
                });
            },
            evaluate(){
                this.$router.push({
					path:"/order/evaluate/"+this.id,
				})
            },
            afterSale(){
                this.$router.push({
					path:"/order/applyAfterSale?orderId="+this.id,
				})
            },
            clearAll(){
                for(var key in this.intervalMap){
                    clearInterval(this.intervalMap[key])
                }
            },
            countdown(item){
                var _this = this;
                var interval = setInterval(function(){
                    var flag =  _this.jisuan(item,_this);
                    if(!flag){
                        // _this.countdown(item);
                        clearInterval(_this.intervalMap[item.id])
                    }
                   _this.$set(_this.intervalMap,item.id,interval);
                },1000);
                _this.$set(_this.intervalMap,item.id,interval);
            },

            jisuan(item,_this){
                var totalTime = 1000*60*60;// 1小时
                var dateDiff = (totalTime - (new Date().getTime() - new Date(item.createTime).getTime()));
                
                if(dateDiff<=0){
                    return false;
                }
                // var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
                // var hours=Math.floor(leave1/(3600*1000))//计算出小时数
                //计算相差分钟数
                var leave2=dateDiff%(24*3600*1000)%(3600*1000);    //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
                //计算相差秒数
                var leave3=dateDiff%(24*3600*1000)%(3600*1000)%(60*1000); //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000);
                // console.log(minutes+" 分钟"+seconds+" 秒")
                _this.$set(_this.timeMap,item.id,minutes +" : " + seconds);
                return true;
            },
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import 'index.less';

</style>