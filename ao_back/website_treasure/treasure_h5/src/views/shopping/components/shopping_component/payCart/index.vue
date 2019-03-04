<template>
    <div>
      <!-- 支付成功 -->
        <div class="pay_suc" v-if="pay_detail">
            <!-- <mt-header class="myHeader" fixed title="支付明细">
                <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
            </mt-header> -->
            <div class="pay_detail_content">
                <div class="pay_top">
                    <div class="item">
                      <div class="row row_three">
                          <span class="lb col">账户通证余额：</span>
                          <span class="cnt">{{Number(userLeftVaac).toFixed(8) || "0"}}</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="row row_two">
                          <span class="lb col">应付款：</span>
                          <span class="cnt">￥{{Number(payData.payMoney).toFixed(2)}}</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="row row_three">
                          <span class="lb col">通证当前价格：</span>
                          <span class="cnt" v-if="payData.sysm.vaacWorth">{{payData.sysm.vaacWorth}}元/通证</span>
                      </div>
                    </div>
                </div>
                <div class="pay_mid">
                    <div class="item">
                      <div class="row row_one">
                          <span class="lb col">矿工费率(%)：</span>
                          <span class="cnt">{{Number(payData.sysm.vaacCut)*100+""}}</span>
                      </div>
                    </div>
                     <div class="item" v-if="Number(payData.payMoney)>0">
                      <div class="row row_two">
                          <span class="lb col">本次使用通证：</span>
                          <input type="number"  class="ivu-input" v-model="useVAAC"  @blur="initUserCostToken()">
                      </div>
                    </div>
                    <div class="item" v-if="Number(payData.payMoney)>0">
                      <div class="row row_two">
                          <span class="lb col">折扣金额(元)：</span>
                          <span class="cnt" v-if="cutPrice">{{Number(cutPrice).toFixed(2)}}</span>
                          <span class="cnt" v-if="!cutPrice">0.00</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="row row_three">
                          <span class="lb col">矿工搬运费(个)：</span>
                          <span class="cnt" v-if="max.vaacCut">{{(max.vaacCut)}}</span>
                          <span class="cnt" v-if="!max.vaacCut">0</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="row row_two">
                          <span class="lb col">合计消费通证：</span>
                          <span class="cnt" v-if="max.maxUse">{{max.maxUse}}</span>
                          <span class="cnt" v-if="!max.maxUse">0</span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="row row_four">
                          <span class="lb col">实际应付款：</span>
                          <span class="cnt" v-model="autoFill.totlePayMoney">￥{{Number(autoFill.totlePayMoney).toFixed(2)}}</span>
                      </div>
                    </div>
                </div>
                
            </div>
            <div class="pay_bottom" @click="compy()">支付</div>
        </div>
      <!-- 支付成功 -->
        <div class="pay_suc" v-if="pay_success">
            <!-- <mt-header class="myHeader" fixed title="支付成功"> -->
                <!-- <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button> -->
            <!-- </mt-header> -->
            <div class="pay_content">
                <div class="pay_top">
                    <div class="img">
                        <span></span>
                    </div>
                </div>
                <div class="pay_mid">
                    <div class="top">订单支付成功!</div>
                    <div class="">本次交易获得token：{{Number(payData.sysm.giveToken * payData.payMoney).toFixed(6)}}</div>
                    <div class="lb">防伪溯源码</div>
                    <div class="bottom" v-for="(item,index) in pay_success_tra">{{item.traceno}}</div>
                </div>
                <div class="btn">
                  <span class="return_index" @click="return_index()">返回商城</span>
                    <span class="see_order active" @click="orderDetail()">查看详情</span>
                </div>
            </div>
        </div>
        <!-- 礼品订单支付成功 -->
        <!-- <c-giftpay v-if="pay_success&&order_type == 2" :code="pay_success_tra" :giftID="giftID"></c-giftpay> -->
        <!-- 支付失败 -->
        <div class="pay_err" v-if="pay_fail">
            <!-- <mt-header class="myHeader" fixed title="支付失败"> -->
                <!-- <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button> -->
            <!-- </mt-header> -->
            <div class="pay_content">
                <div class="pay_top">
                    <div class="img">
                        <span></span>
                    </div>
                </div>
                <div class="pay_mid">
                    <div class="top">订单支付失败!</div>
                    <p class="msg">您好！您的通证余额不足,</p>
                    <p class="msg">请更换支付方式或充值通证,</p>
                </div>
                <div class="pay_bottom">
                  <router-link to="/" replace>
                    <span class="return_index" >返回商城</span>
                  </router-link>
                    <!-- <span class="see_order">查看详情</span> -->
                </div>
            </div>
        </div>
        <!-- 密码 -->
          <pwd v-if="pwdShow"></pwd>
        <!-- 模态层支付页面 -->
        <div class="model_payType" v-if="show_model"  @click.stop="show_model=false">
          <c-paytype v-if="paydata" :paydata="paydata"></c-paytype>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import { queryCount,queryVaac } from "@api/api_shopping";
import { payCart } from "@api/api_shoppingcar";
import eventBus from "../../../../../common/eventBus/eventBus.js";
import pwd from "../pwd/index";
import giftpay from "../giftpay/index";
import paytype from "../paytype/index";

export default {
	components: {
		'pwd':pwd,
		'c-giftpay':giftpay,
		'c-paytype':paytype
	},
	data() {
		return {
			pwdShow: false,
			// 银联支付
			show_model:false,
			paydata:null,
			// 
			payVal: null,
			pay_success: false,
			pay_fail: false,
			pay_detail: true,
			// 购物车ID
			countNumID: this.$route.params.id,
			// 礼品订单
			giftID:null,
			payData: null,
			// 用户剩余通证
			userLeftVaac:null,
			// adress
			chainData:null,
			// 获取token和钱包
			token:null,
			wallet: null,
			userId: null,
			// 支付成功防伪溯源码
			pay_success_tra:[],
			// 订单类型
			// order_type:null,
			// 
			useVAAC:null,
			userInputMax:null,
			cutPrice:null,
			autoFill:{
				totlePayMoney:null
			},
			// 最大值键值
			max:{
				isMax:false,
				vaacCut:null,
				maxUse:null
			}
		};
	},
	created() {
		this.pay_success = false;
		this.pay_detail = true;
		// this.payData = null;
		this.payData = JSON.parse(sessionStorage.getItem("TOCARTPAY"));
		this.chainData = JSON.parse(sessionStorage.getItem("commodityDetail"));
		this.token = sessionStorage.getItem("token");
		this.wallet = sessionStorage.getItem("wallet");
		this.userId = sessionStorage.getItem("userId");
		// this.order_type = sessionStorage.getItem("order_type");
		if (this.token) {
			this.queryUserVaac(this.token,()=>{
				this.vaacAuto()
			});
		}
		if(this.pay_detail){
			document.title = "支付明细";
		}
		if(this.pay_success){
			document.title = "支付成功";
		}
		if(this.pay_fail){
			document.title = "支付失败";
		}
	},
	mounted() {
		eventBus.$on('pwdOver', (val) => {
			this.pwdShow = false;
			this.payVal = val;
			this.pay();
		});
		eventBus.$on('pwdClose', (val) => {
			this.pwdShow = false;
		});
	},
  	watch: {
		useVAAC(newVal, oldVal) {
            debugger
			let currInput = (newVal + "").match(/^\d*(\.?\d{0,8})/g)[0] || null;
      		this.useVAAC = currInput;
            this.max.vaacCut = this.useVAAC*(this.payData.sysm.vaacCut);
            this.max.maxUse = this.useVAAC*(1+this.payData.sysm.vaacCut);
			// 折扣
			this.cutPrice =(Number(newVal)*this.payData.sysm.vaacWorth);
			// 实际应付款
			this.autoFill.totlePayMoney = Number(this.payData.payMoney) - Number(this.cutPrice) >= 0 ? Number(this.payData.payMoney) - Number(this.cutPrice):0
			if (newVal <= 0) {
				this.cutPrice = null;
			}
			if (newVal > Number(this.userInputMax)) {
				this.useVAAC = this.userInputMax;
			}
		}
	},
	methods: {
		initUserCostToken() {
			if (this.useVAAC) {
				this.useVAAC = Number(Math.floor(Number(this.useVAAC) * 100000000) / 100000000).toFixed(8);
			}
		},
		// 
		isHavaMore(num,flag){
			var currentNum = Number(num)*Math.round(Math.pow(10,flag));
            var IntSixNum = Number(parseInt(num*Math.round(Math.pow(10,flag))));
			if(currentNum > IntSixNum){
				return true
			}else{
				return false
			}
		},
		// 通证自动计算
		vaacAuto(){
			if(this.payData){
				if(Number(this.payData.payMoney)>0){
					// 应该付款/通证价格 + 旷工搬运费 = X
					var VAACused = (Number(this.payData.payMoney)/this.payData.sysm.vaacWorth);
					// 标识取8位后是否有尾数
					var isHavaMore = this.isHavaMore(VAACused,8);
					var vaacTotleCost = (Number(VAACused) + Number(this.payData.payMoney) /Number(this.payData.sysm.vaacWorth) *Number(this.payData.sysm.vaacCut)).toFixed(8);
					if(Number(vaacTotleCost) < Number(this.userLeftVaac)){
						if(isHavaMore){
							this.useVAAC = (Number(parseInt(VAACused*100000000)+1)/100000000)
						}else{
							this.useVAAC = Number(VAACused)
						}
					}else{
						// this.max.isMax = true;
						this.useVAAC = (this.userLeftVaac/(1+Number(this.payData.sysm.vaacCut))).toFixed(8);
					}
				}else{
					return false
				}
				this.userInputMax = this.useVAAC;
			}
		},
		// pwd显示
		compy(){
			if(Number(Number(this.autoFill.totlePayMoney).toFixed(2)) > 0){
				this.paydata = {
					payMoney : this.autoFill.totlePayMoney
				}
				this.show_model = true;
				return  false;
			}
			this.pwdShow = true;
		},
		// 返回商城
		return_index() {
			this.$router.replace({
				path: "/commodity?token="+this.token+"&userId="+this.userId+"&wallet="+this.wallet
			});
		},
		// 查询用户token积分
		queryUserVaac(data,callback) {
			queryVaac({token:data}).then(res => {
				if (res.code == "200" && res.msg == "success") {
				this.userLeftVaac =  res.data.info.vaacBanlance;
				if(callback){
					callback();
				}
				}
			});
		},
		// 支付
		pay() {
			if (this.payVal) {
				payCart({
                    consumeToken:this.payData.consumeTokenTotal,
                    vaacAccount:this.payData.vaacAccountTotal,
                    temporaryToken:this.payData.temporaryTokenTotal,
                    giveToken:this.payData.giveTokenTotal,
                    countNum:this.payData.countNum,
					passphrase:this.payVal+'',
                    oStatus: 2,
                    orders:this.payData.params
				}).then(res => {
					if (res.code == "200" && res.msg == "success") {
						Toast("支付成功!");
						this.pay_success_tra = res.data.batachTracenos;
						this.pay_success = true;
                        this.pay_detail = false;
					}
				});
			}
		},
		orderDetail(){
			this.$router.replace({
				path: "/order/list"
			});
		}
	},
	beforeDestroy(){
		eventBus.$off('pwdOver')
	},
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
// 支付成功
.pay_suc {
	padding-top: .96rem;
	height: 100vh;
	background: #F4F4F4;
	.pay_content {
		margin: 0 .586667rem;
		text-align: center;
		padding: .48rem 0 1.626667rem 0;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.35);
		.pay_top {
			.img {
				margin-bottom: .6rem;
				span {
					display: inline-block;
					width: 1.546667rem;
					height: 1.546667rem;
					background: url("../../../../../common/assets/images/shopping/pay_suc.png")
						no-repeat;
					background-size: contain;
				}
			}
		}
		.pay_mid {
			// text-align: center;
			// margin-bottom: 0.48rem;
			font-family: "MicrosoftYaHei";
			color: #333;
			@include font-dpr(12px);
			.top {
				margin-bottom: .266667rem;
				@include font-dpr(13px);
			}
			.bottom {
				color: #16b673;
				@include font-dpr(11px);
			}
			.lb{
				margin: .373333rem 0 .4rem 0;
			}      
		}
		.pay_bottom {
			.see_order {
				margin-left: 1.066667rem;
			}
			.return_index:hover {
				color: #16b673;
			}
			.see_order:hover {
				color: #16b673;
			}
		}
	}
 	// 支付明细
  	.pay_detail_content {
    
		margin: 0 .586667rem;
		background-color: #ffffff;
		padding:.88rem .386667rem .773333rem .346667rem ;
		box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.35);
		.pay_top {
		
			.item {
				margin-bottom: .36rem;
				@include font-dpr(12px);
				&:nth-child(1) {
					margin-top: 0;
				}
				.row_one {
					.col {
					}
					.cnt {
						@include font-dpr(13px);
						color: #333333;
					}
				}
				.row_two {
					.col {
					}
					.cnt {
						@include font-dpr(13px);
						color: red;
					}
				}
			}
		}
		.pay_mid {
			font-family: "MicrosoftYaHei";
			.item {
				margin-top: .36rem;
				@include font-dpr(12px);
				&:nth-child(1) {
					margin-top: 0;
				}
				.cnt {
					color: #333333;
				}
				.row_four{
					.col{
						@include font-dpr(13px);
						color: #333333;
						font-family: "MicrosoftYaHei";
					}
					.cnt{
						@include font-dpr(15px);
						color: #ff0000;
						font-family: "MicrosoftYaHei-Bold";
						font-weight: bold;
					}
				}
			}
		}
	}
	.pay_bottom {
		@include font-dpr(13px);
		width: 6rem;
		margin: 0 auto;
		height: .933333rem;
		background-color: #16b673;
		text-align: center;
		line-height: .933333rem;
		border-radius: 0.133333rem;
		overflow: hidden;
		color: #ffffff;
		margin-top: 1.413333rem;
	}
    .btn{
		margin: .533333rem 0 0 0;
		span{
			display: inline-block;
			width: 2.24rem;
			height: .666667rem;
			line-height: .666667rem;
			text-align: center;
			@include font-dpr(12px);
			color: #333;
			border: solid 1px rgba(140, 140, 140, 1);
			border-radius: .133333rem;
			&.active{
				color: #16b773;
				border: solid 1px rgba(27, 192, 126, 1);
				margin-left: .533333rem;
			}
		}
    }
}
// 支付失败
.pay_err {
	padding-top: 3.733333rem;
	.pay_content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0 0.533333rem 0;
		background-color: #ffffff;
		box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.35);
		.pay_top {
			margin: 0.48rem 0 0.586667rem;
			.img {
				span {
					display: inline-block;
					width: 1.546667rem;
					height: 1.546667rem;
					background: url("../../../../../common/assets/images/shopping/pay_err.png") no-repeat;
					background-size: contain;
				}
			}
		}
		.pay_mid {
			text-align: center;
			margin-bottom: 0.48rem;
			font-family: "MicrosoftYaHei";
			.top {
				color: #000000;
				@include font-dpr(13px);
				font-weight: bold;
			}
			.msg {
				margin-top: 0.32rem;
				color: #333333;
				@include font-dpr(11px);
			}
		}
		.pay_bottom {
			margin-bottom: 1.253333rem;
			background-color: #16b773;
			border-radius: 0.133333rem;
			box-sizing: border-box;
			overflow: hidden;
			text-align: center;
			.return_index {
				display: inline-block;
				width: 5.333333rem;
				height: 0.8rem;
				line-height: 0.8rem;
				color: #ffffff;
			}
		}
	}
}
</style>