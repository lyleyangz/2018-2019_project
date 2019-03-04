	<template>
		<!-- 模态层支付页面 -->
		<div class="model_pay">
			<!--  -->
			<div class="mint-radiolist" @click.stop="fun">
				<div class="pay">
					<a class="mint-cell" v-for="(item,index) of options" :key="index"  v-if="!item.disabled">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title">
								<label class="mint-radiolistmint-radiolist-label">
								<span class="mint-radio">
									<input type="radio" name="radio" v-model="typeValue" class="mint-radio-input" :value="item.val">
									<span class="mint-radio-core"></span>
								</span>
								<span class="mint-radio-label radio_img">
									<img :src="item.img" alt="">
								</span>
								<span class="mint-radio-label">{{item.method_pay}}</span>
								</label>
							</div>
						</div>
					</a>
					<div class="sure_pay" v-if="typeValue !== '中国银联'" @click="pay()">确定</div>
					<div class="forbid_pay" v-if="typeValue == '中国银联'" @click="pay()">确定</div>
				</div>
			</div>
		</div>
	</template>

	<script>
	import { Toast } from "mint-ui";
	import eventBus from "../../../../../common/eventBus/eventBus.js";

    // import header from "@common/header_shopping/index.vue";
    import {orderCart} from "@api/api_shoppingcar";

	import {
	goodsDetail,
	addOrder,
	queryCount,
	tokenValue,
	getAddress
	} from "@api/api_shopping";
	export default {
        props: {
        paydata:{
            type: Array,
            default: function(){
                return {}
            }
        }
	},
	data() {
		return {
            typeValue:'个人资产钱包',
            options: [
                {
                val: "个人资产钱包",
				method_pay: "个人资产钱包",
				disabled:false,
                img: require("../../../../../common/assets/images/shopping/vacc.png")
                },
                {
                val: "中国银联",
                method_pay: "中国银联",
				disabled:false,
                img: require("../../../../../common/assets/images/shopping/bank_pay_default.png")
                },
                // {
                //   val: "支付宝支付",
                //   method_pay: "支付宝支付",
                //   img: require("../../../../../common/assets/images/shopping/pay.png")
                // }
            ],
            flag: true,
            // 
            params:null,
            // 购物车订单号
            cartID:null
            
		};
	},
	created() {
        document.title = "填写订单";
	},
	mounted() {
        this.paramsData(this.paydata)
		// 纯token支付
		if(Number(this.paydata.payMoney) <= 0){
			this.disabledBank()
		}
		if(this.$route.name == "pay" && Number(this.paydata.payMoney) > 0){
			this.disabledVaac()
		}
	},
	watch: {},
	methods: {
		// 禁用银联
		disabledBank(){
			var arr = this.options;
				for (let i in arr) {
					if(arr[i].method_pay == "中国银联"){
						arr[i].disabled = !arr[i].disabled;
					}
				}
			this.options = arr;
		},
		// 禁用vaac钱包.
		disabledVaac(){
			var arr = this.options;
				for (let i in arr) {
					if(arr[i].method_pay == "个人资产钱包"){
						arr[i].disabled = !arr[i].disabled;
					}
				}
			this.options = arr;
			this.typeValue = "中国银联"
		},
        // 组合下单数据
        paramsData(arr){
            var params = [];
            for(let i in arr){
                params.push(arr[i].params)
            }
            this.params = params;
        },
        // 购物车支付
        cartPay(data){
            var sendMsgToPay = {
                // 商品ID
                proId:data.params.proId,
                //   价格
                // share_data:data.params,
                // 消耗的token
                consumeToken: (Number(data.params.consumeGold)+Number(data.params.discountGold)).toFixed(6),
                // 临时积分
                temporaryToken:data.params.temporaryNum || 0,
                giveToken:data.payMoney*data.sysm.giveToken,
                vaacAccount:data.params.vaacAccount,
            };
            return sendMsgToPay
        },
		// 添加订单
		pay() {
			if (this.typeValue == "个人资产钱包") {
				if(!this.paydata){
					return false;
                }
                if(this.flag){
                    this.flag = false;
                    var payType = this.paydata;
                    orderCart({"orders":this.params}).then(res => {
                        if (res.code == "200") {
                            // 购物车number
                            this.cartID = res.data.countNum;
                            Toast("下单成功");
                            var payCart = {
                                countNum:res.data.countNum,
                                payMoney:0,
                                sysm:{},
                                params:[],
                                consumeTokenTotal : 0,
                                vaacAccountTotal : 0,
                                temporaryTokenTotal : 0,
                                giveTokenTotal:0
                            }
                            for(let i in payType){
                                payCart.sysm = payType[i].sysm;
                                payCart.payMoney += payType[i].payMoney;
                                payCart.consumeTokenTotal += Number(payType[i].userInputToken);
                                payCart.vaacAccountTotal += Number(payType[i].params.vaacAccount);
                                payCart.giveTokenTotal += Number(payType[i].params.giveToken) || 0;
                                payCart.temporaryTokenTotal += payType[i].params.temporaryToken || 0;
                                payCart.params.push(this.cartPay(payType[i]));
                            }
                            sessionStorage.setItem("TOCARTPAY", JSON.stringify(payCart));
                            setTimeout(() => {
                                this.$router.replace({
                                    path: `/payCart/${this.cartID}`
                                    });
                                    sessionStorage.removeItem("temporaryNum");
                                    sessionStorage.removeItem("countsType");
                            },0);
                        }else{
                            eventBus.$emit("model_pay_off")
                        }
                        this.flag = true;
                    });
                }
                
			}else{
				return
			}
		},
		fun() {},
		modelShow() {
		if (!this.defaultAdr) {
			Toast("请选择收货地址");
			return false;
		}
		this.show_model = !this.show_model;
		},
	},
	beforeDestroy() {}
	};
	</script>

	<style lang="scss"  scoped="scoped">
	@import "../../../../../common/styles/mixin.scss";
	.model_pay {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
		background-color: rgba(153, 153, 153, 0.35);
		// animation: model_animation 0.5s;
		display: flex;
		justify-content: center;
		align-items: center;
		.mint-radiolist {
		width: 8rem;
		// height: 8rem;
		margin: auto;
		background-color: #ffffff;
		border-radius: 0.133333rem;
		// border: 0.026667rem solid #949494;
		overflow: hidden;
		box-sizing: border-box;
		.pay {
			margin: 0.933333rem 1.04rem 1.6rem;
			.radio_img {
			display: inline-block;
			height: 0.8rem;
			width: 0.8rem;
			img {
				height: 0.8rem;
				width: 0.8rem;
				background-size: contain;
			}
			}
			// 列表
			.mint-cell {
			margin-top: 0.373333rem;
			// text-align: left;
			&:nth-child(1) {
				margin-top: 0;
			}
			.mint-cell-wrapper {
				background-image: none;
			}
			}
			// 确定按钮
			.sure_pay {
				margin-top: 1.146667rem;
				// width: 6rem;
				height: 0.933333rem;
				background-color: #16b773;
				border-radius: 0.133333rem;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
				@include font-dpr(13px);
			}
			.forbid_pay{
				margin-top: 1.146667rem;
				// width: 6rem;
				height: 0.933333rem;
				background-color: #D4D4D4;
				border-radius: 0.133333rem;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
				@include font-dpr(13px);
			}
		}
		}
	}
	input::-webkit-input-placeholder {
	/* WebKit, Blink, Edge */
	color: #aaaaaa !important;
	@include font-dpr(12px);
	}
	input:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: #aaaaaa !important;
	@include font-dpr(12px);
	}
	input::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #aaaaaa !important;
	@include font-dpr(12px);
	}
	input:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: #aaaaaa !important;
	@include font-dpr(12px);
	}

	/*增加动画animation*/
	@keyframes model_animation {
	from {
		transform: scale(0);
	}
	to {
		transform: scale(1);
	}
	}
	</style>