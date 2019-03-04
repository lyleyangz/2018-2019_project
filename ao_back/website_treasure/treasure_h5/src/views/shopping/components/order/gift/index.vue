<template>
	<div class="gift">
        <div class="tab row">
            <div class="col" :class="currTab == key?'active':''" v-for="(value,key) of tabList" :key="key" @click="checkTab(key)">{{value}}</div>
        </div>
        <div class="cnt">
            <div class="giftList">

                <div class="giftItem" v-for="(item,index) of list" :key="index">
                    <div class="row info">
                        <div class="img">
                            <img :src="item.proUrl" alt="">
                        </div>
                        <div class="col block">
                            <div class="row">
                                <div class="col name">
                                    {{item.proName}}
                                </div>
                                <div class="block-right" :class="`status`+item.status">
                                    {{statusList[item.status]}}
                                </div>
                            </div>
                            <div class="num">
                                数量：{{item.proCount}}
                            </div>
                            <div class="price">
                                商品价格(元)：<label class="red">{{(item.totalPrice || 0).toFixed(2)}}</label>
                            </div>
                            <div class="btn" v-if="item.status==1 || item.status==3">
                                <button @click.stop="give(item.id)">转赠好友</button>
                                <button @click.stop="receive(item.id)">领取礼品</button>
                            </div>
                            <div class="data">
                                <label v-if="item.status==1 || item.status==3">日期：{{globalFun.dateFormat(item.createTime,"yyyy-MM-dd hh:mm:ss")}}</label>
                                <label v-if="item.status==2">领取日期：{{globalFun.dateFormat(item.drawTime,"yyyy-MM-dd hh:mm:ss")}}</label>
                            </div>
                            <div class="btn" v-if="item.orderStatus==3">
                                <button @click.stop="confirmCollect(item)">确认收货</button>
                                
                            </div>
                        </div>
                    </div>
                    <div class="give">
                        <div class="name" v-if="item.name">赠送人：<label>{{item.name}}</label></div>
                        <div class="remark" v-if="item.wish">{{item.wish}}</div>
                    </div>
                    <div class="chain" @click.stop="chain(item.orderId)" v-if="item.photoUrls">
                        <div class="title">礼包链条（{{item.photoUrls.split(',').length}}）</div>
                        <div class="row imgList">
                           <div class="col">
                                <img :src="item==''?require('../../../../../common/assets/images/defHead.png'):item" alt="" v-for="(item,index) of item.photoUrls.split(',')" :key="index">
                           </div>
                           <div class="arrow"></div>
                        </div>
                    </div>
                </div>

                
            </div>

            <div class="nodata" v-if="list.length==0">
                <img src="../../../../../common/assets/images/no-data.png">
                <span class="lb">暂无订单数据</span>
            </div>
        </div>
	</div>
</template>

<script>
    import { giftList,giftReceive} from "@api/api_gift";
    import { confirmCollect } from "@api/api_order";
	import {Toast,Indicator,MessageBox} from 'mint-ui';
	import eventBus from '@/common/eventBus/eventBus.js'
	export default {        
		data() {
			return {
			   	list: [],
				tabList:{
                    "1": "未领取",
                    "2": "已领取"
                },
                statusList:{
                    "1": "未领取",
                    "2": "已领取",
                    "3": "未领取",
                },
				currTab: 1,
				searchParmas: {
                    status: 1
                },
                total: 0,
                isApp: null
			}
		},
		mounted() {        
            
            var token = this.$route.query.token;
            if(token){
                sessionStorage.setItem("token",token);
            }
            this.getList();
            document.title = "礼品";         
           
		},
		methods: {

            getList(){
                giftList(this.searchParmas).then(res=>{
                    if(res.code == 200){
                        this.list = res.data.entities || [];
                    }
                })
            },
			checkTab(key){
                this.currTab = key;
                this.searchParmas.status = key;
                this.getList();
                window.scrollTo(0,0);
            },
            give(id){
               location.href = "/spread.html#/give/"+id+"/1"
            },
			detail(item){
				this.$router.push({
					path:"/order/detail/"+item.id,
				})
            },
           
            receive(id){
                eventBus.$on("addressObj", data => {
                    this.giftReceive(id,data.id);
                });
                this.$router.push({
					path:"/address/addressManage?outside=true",
				})
                
            },
            giftReceive(giftId,addressId){
                var _this = this;
                Indicator.open();
                giftReceive({
                    giftId: giftId,
                    addressId: addressId
                }).then(res=>{
                    if(res.code == 200){
                        Indicator.close();
                        MessageBox({
                            title:"",
                            message: "礼品领取成功",
                            confirmButtonText: "朕知道了"
                        }); 
                        setTimeout(function(){
                            _this.getList();
                        },500)
                    }
                })
            },
            chain(orderId){
                this.$router.push({
					path:"/gift/chain/"+orderId,
				})
            },
            confirmCollect(item){
                MessageBox.confirm('', { 
                    message: '确认已收货？', 
                    title: '', 
                }).then(action => {
                   confirmCollect({
                        oStatus:4,
                        id:item.orderId
                   }).then(res => {
                       if(res.code == 200){
                           Toast('已确认收货')
                       }
                       this.getList();
                   })
                }).catch(err => { 
                    
                });
            },
            
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import 'index.less';

</style>