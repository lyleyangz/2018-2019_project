<template>
	<div class="order">
		<!-- <mt-header class="myHeader" fixed title="我的订单" v-if="!isApp">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button> -->
            <!-- <router-link to="/order/gift/list" slot="right">
                <div class="gift"></div>
            </router-link> -->
        <!-- </mt-header> -->
        <div class="search">
            <div class="ipt row">
                <i></i>
                <input class="col" type="text" v-model.trim="params.searchParam" placeholder="输入商品名称/订单编号" @focus="searchFocus" :maxlength="20">
            </div>
            <div class="btn" @click="search">搜索</div>
        </div>
        <div class="search-block" :class="isSearch?'':'hide'">
            <div class="title">最近搜索</div>
            <div class="resultList row row-wrap">
                <div class="resultItem" v-for="(item,index) of resultList" :key="index" @click="checkItem(index)">
                    {{item}}
                </div>
            </div>
            <div class="clear" @click="clear" v-if="resultList.length>0">清空历史记录</div>
        </div>
        <div class="orderList">
            <div class="orderItem" v-for="(item,index) of list" :key="index" @click="detail(item)" >
                <div class="title row">
                    <div class="col">订单号：{{item.oNum}} </div>
                    <div v-if="item.oStatus == 1" @click.stop="cancelOrder(item)">取消订单</div>
                    <div v-if="item.oType == 1 && item.oStatus == 3" class="red" @click.stop="confirmCollect(item)">确认收货</div>
                </div>
                <div class="row info">
                    <div class="img">
                        <img :src="item.proUrl" alt="">
                    </div>
                    <div class="col block">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <div class="name">{{item.proName}}</div>
                                        <div class="lb">数量：{{item.proCount}}</div>
                                    </div>
                                    <div class="type">
                                        <div>&nbsp;{{item.oType==2?'礼品订单':''}}</div>
                                        <div v-if="item.oType == 1" class="status block-right">{{statusList[item.oStatus]}}</div>
                                        <div v-if="item.oType == 2" class="status block-right" :class="item.takeStatus==2?'receive':''">
                                            <label v-if="item.oStatus!=1 && item.oStatus!=5  && item.oStatus!=3">
                                                {{takeList[item.takeStatus]}}
                                            </label>

                                            <label v-if="item.takeStatus == 2 && item.oStatus!=1 && item.oStatus!=2 && item.oStatus!=6 && item.oStatus!=5 && item.oStatus!=3">-</label>
                                            <label v-if="item.takeStatus == 2 && item.oStatus!=2 && item.oStatus!=6">
                                                {{giftStatusList[item.oStatus]}}
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="row sku">
                            <div class="col">{{item.sku}}</div>
                        </div>
                        <div class="price row">
                            <div class="col">已付款：<label class="red">￥{{(item.totalPrice).toFixed(2)}}</label></div>
                            <div v-if="item.oStatus==1" class="btn" @click.stop="gopay(item)">
                                <div>剩余付款时间</div>
                                <div>{{timeMap[item.id]}}</div>
                            </div>
                            <div v-if="item.takeStatus == 2 && item.oType == 1 && item.oStatus==3" class="btn-inner" @click.stop="logistics(item)">查看物流</div>
                            <div v-if="item.oType == 1 && item.oStatus==4" class="btn-inner" @click.stop="evaluate(item)">去评价</div>
                            <div v-if="item.oType == 2 && item.takeStatus == 2 && item.oStatus==4" class="btn-inner" @click.stop="evaluate(item)">去评价</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nodata" v-if="list && list.length==0">
            <img src="../../../../../common/assets/images/no-data.png">
            <span class="lb">暂无订单数据</span>
        </div>
	</div>
</template>

<script>
    import eventBus from "@/common/eventBus/eventBus.js";
	import { orderSearch,confirmCollect,cancelOrder } from "@api/api_order";
	import {Toast,Indicator,MessageBox} from 'mint-ui';
	
	export default {        
		data() {
			return {
                params:{
                    search: ""
                },
                list: null,
                resultList:[],
                takeList:{
                    "1": "未领取",
                    "2": "已领取"
                },
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
                isSearch: true,
                timeMap: {},
                intervalMap: {}
			}
		},
		mounted() {
            this.resultList = JSON.parse(localStorage.getItem("resultList")) || [];
            document.title = "搜索";
            var token = this.$route.query.token;
            if(token){
                sessionStorage.setItem("token",token);
            }
            eventBus.$on("refreshList", () => {
                this.getList();
            });
        },
        destroyed:function(){
            this.clearAll();
        },
		methods: {
           
            search(){
                var search = this.params.searchParam;
                if(!search){
                    Toast('请输入要搜索的内容');
                    return false;
                }
                var resultList = this.resultList;
                
                var index = -1;
                this.resultList.forEach((item,i) => {
                    if(item == search){
                        index = i;
                    }
                });
                if(index>=0){
                    this.resultList.splice(index,1);
                }
                if(resultList.length>=6){
                    this.resultList.splice(5,resultList.length);
                }
                resultList.unshift(search)
                localStorage.setItem("resultList",JSON.stringify(resultList))
                
                this.getList();
                this.isSearch = false;
            },
            checkItem(index){
                this.params.searchParam = this.resultList[index];
                this.getList();
                this.isSearch = false;
          
            },
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
                        path: `/pay/${item.id}`
                    });
				}, 500);
            },
            getList(){
                orderSearch(this.params).then(res=>{
                    if(res.code == 200){
                        this.list = res.data || [];
                        this.clearAll();
                        this.list.forEach(item => {

                            var sku = [];
                            item.storeProperties.forEach(item1 => {
                                sku.push(item1.value);
                            });
                            this.$set(item,"sku",sku.join("  "));
                            if(item.oStatus == 1){
                                this.countdown(item);
                            }
                        });
                    }
                })
            },
            clear(){
                this.isSearch = false;
                this.resultList = [];
                localStorage.removeItem("resultList");
            },
            searchFocus(){
                this.isSearch = true;
            },
            evaluate(item){
                this.$router.push({
					path:"/order/evaluate/"+item.id,
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
                        cancelStatus: 1,
                        id:item.id
                   }).then(res => {
                       if(res.code == 200){
                           if(res.data){
                               Toast('取消成功')
                           }else{
                               Toast('取消失败')
                           }
                       }
                       this.getList();
                   });
                }).catch(err => { 
                    
                });
            },
            confirmCollect(item){
                MessageBox.confirm('', { 
                    message: '确认已收货？', 
                    title: '', 
                }).then(action => {
                   confirmCollect({
                        oStatus:4,
                        id:item.id
                   }).then(res => {
                       if(res.code == 200){
                           Toast('已确认收货')
                       }
                       this.getList();
                   })
                }).catch(err => { 
                    
                });
            },
            detail(item){
				this.$router.push({
					path:"/order/detail/"+item.id,
				})
            },
            logistics(item){
                this.$router.push({
					path:"/order/logistics/"+item.id,
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
        },
        beforeDestroy() {
            eventBus.$off("searchCallback");
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import 'index.less';

</style>