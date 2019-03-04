<template>
	<div class="afterSale">
		<!-- <mt-header class="myHeader" fixed title="售后申请">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header> -->
        <div class="cnt">		
            <div class="tab row">
                <div class="col" :class="currTab == key?'active':''" v-for="(value,key) of tabList" :key="key" @click="checkTab(key)">{{value}}</div>
            </div>
            <div class="list">
                <div class="item" v-for="(item,index) of list" :key="index">
                    <div class="title row">
                        <div class="col">订单号：{{item.oNum}}</div>
                        <div :class="item.checkBack==3?'green':'red'">{{tabList[item.checkBack]}}</div>
                        <!-- <div class="">已退款</div> -->
                    </div>
                    <div class="imgList row" >
                        <div class="imgItem" v-for="(itemImg,indexImg) of (item.backPicurl || '').split(',')" :key="indexImg">
                            <img :src="itemImg">
                        </div>
                    </div>
                    <div class="reason">退货原因：{{item.backReason}}</div>
                    <div class="bottom row">
                        <div class="col">申请时间：{{item.updateTime}}</div>
                        <div class="btn" @click="detail(item.id)">查看详情</div>
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
	import { aftersaleList } from "@api/api_order";
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                searchParmas:{
                    checkBack: "0",
                    pageNo: 1,
                    pageSize: 10
                },
				tabList:{
                    "0": "全部",
                    "1": "审核中",
                    "2": "审核未通过",
                    "3": "审核通过"
                },
				currTab: 0,
			   	list: [],
			
			}
		},
		mounted() {
            var token = this.$route.query.token;
            if(token){
                sessionStorage.setItem("token",token);
            }
            this.getList();
            document.title = "申请售后";
			window.scrollTo(0,0);
		},
		methods: {
            getList(){
                aftersaleList(this.searchParmas).then(res=>{
                    if(res.code == 200){
                       this.list = res.data.entities || [];
                    }
                })
            },
			checkTab(key){
                window.scrollTo(0,0);
                this.currTab = key;
                this.searchParmas.checkBack = key;
                this.getList();
            },
            detail(id){
                this.$router.push({
					path:"/order/afterSaleDetail?id="+id,
				})
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
@import 'index.less';

</style>