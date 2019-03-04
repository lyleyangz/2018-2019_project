<template>
	<div class="logistics">
		<!-- <mt-header class="myHeader" fixed title="物流信息">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header> -->
        <div class="cnt">
            <div class="logistics-top">
                <i class="icon"></i>
                <div>
                    <div>物流公司：{{info.expressName}}</div>
                    <div class="lb">快递单号：{{info.expressNum}}</div>
                </div>
            </div>
            <!-- <div class="list">
                <div class="item" v-for="(item,index) of list" :key="index">
                    <div class="data">{{item.data}}</div>
                    <div class="lb">{{item.lb}}</div>
                </div>
            </div> -->
        </div>
	</div>
</template>

<script>
    
    import { logisticsInfo } from "@api/api_order";
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                info:{},
				list:[{
                    data:"2018-09-23  08:04:17",
                    lb: "配送员开始配送，请您准备收货，李师傅，手机号：13645678912"
                },{
                    data:"2018-09-23  03:26:15",
                    lb: "货物已完成分拣，离开【深圳松岗分拨中心】"
                },{
                    data:"2018-09-23  03:26:15",
                    lb: "货物已完成分拣，离开【深圳松岗分拨中心】"
                },{
                    data:"2018-09-22 23:10:12",
                    lb: "货物已到达【广州黄埔分拨中心】"
                },{
                    data:"2018-09-22 18:42:02",
                    lb: "货物已交付顺丰物流"
                },{
                    data:"2018-09-22 18:42:02",
                    lb: "货物已交付顺丰物流"
                },{
                    data:"2018-09-22 18:39:10",
                    lb: "您的订单打包完后，已出库"
                },{
                    data:"2018-09-22 18:39:10",
                    lb: "您的订单已准备出库"
                }]
			}
		},
		mounted() {
            this.getLogisticsInfo();
            document.title = "物流信息";
		},
		methods: {
			getLogisticsInfo(){
                logisticsInfo({
                    id: this.$route.params.id
                }).then(res=>{
                    if(res.code == 200){
                        this.info = res.data;
                    }
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import 'index.less';

</style>