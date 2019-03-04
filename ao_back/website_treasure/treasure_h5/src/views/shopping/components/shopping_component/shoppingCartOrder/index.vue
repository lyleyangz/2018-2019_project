	<template>
		<div class="fill_order">		
		<!-- <mt-header class="myHeader" fixed title="填写订单">
			<mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
		</mt-header> -->
		<div class="fill_order_content">
		<div class="address">
			<!-- 有选址 -->
			<div class="address_have" v-if="address.defaultAdr">
			<div class="address_left">
				<div class="left_top">
				<span class="name">联系人：{{address.defaultAdr.uName}}</span>
				<span class="phone">联系方式：{{address.defaultAdr.phone}}</span>
				</div>
				<div class="left_bottom">
				<span class="left_bottom_address">地址：{{address.defaultAdr.address}}</span>
				</div>
			</div>
			<div class="address_right" @click="jumpToAdr()">
				<span></span>
			</div>
			</div>
			<!-- 无选址 -->
			<div class="address_none" v-if="!address.defaultAdr">
			<span @click="jumpToAdr()">新建地址</span>
			</div>
		</div>
		<div class="detail">
			<div class="address_title">订单详情</div>
			<div class="list" v-if="orderDetail">
                <div class="item" v-for="(item,index) in orderDetail">
                    <div class="address_img">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="row row_one">
                        <span class="lb col">{{item.proName}}</span>
                        <span class="cnt">数量：1</span>
                    </div>
                    <div class="row row_one">
                        <span class="cnt line_feed">{{item.paramName}}</span>
                    </div>
                    <div class="row_two_left">
                        <span class="lb col">商品价格(元)：</span>
                        <span class="cnt price">{{item.singlePrice}}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="row row_two">
                        <div class="row_two_right">
                        <span class="lb col">账户可用token：</span>
                        <span class="cnt" v-if="userLeftCount>=0">{{(userLeftCount || 0).toFixed(6)}}</span>
                        </div>
                    </div>
                </div>
			<!-- 临时token -->
			<div class="item">
				<div class="row row_four">
					<span class="lb col">劳动token折扣：<label class="cols">￥{{Number(priceObj.paycut).toFixed(2) || "0.00"}}</label></span>                  
				</div>
			</div>
			<div class="item">
				<div class="row row_four">
					<span class="lb col">应付款(元)：<label class="cols">{{Number(priceObj.totalCost).toFixed(2)}}</label></span>           
				</div>
			</div>
			<!-- 使用的token -->
			<div class="item">
				<div class="row row_three">
					<span class="lb col">本次使用token</span>
					<span class="cnt"><input type="number"  v-model="useTokenNumber" @blur="countPayWorth()" placeholder="100token起"></span>
				</div>
			</div>
			<div class="item">
				<div class="row row_two">
					<span class="lb col">token手续费率(%)：<label class="cols">{{(tokenCut*100|| "0")}}</label></span>
				</div>
			</div>
			<div class="item">
				<div class="row row_two">
					<!-- <span class="lb col" v-if="!max.is">token手续费：<label class="cols">{{(tokenCut*useTokenNumber || 0).toFixed(6)}}</label></span> -->
					<span class="lb col">token手续费：<label class="cols">{{max.tokenCut || "0"}}</label></span>
				</div>
			</div>
			<div class="item">
				<div class="row row_two">
					<!-- <span class="lb col" v-if="!max.is">合计消费token：<label class="cols">{{(Number(tokenCut*useTokenNumber) + Number(useTokenNumber) || 0).toFixed(6)}}</label></span> -->
					<span class="lb col">合计消费token：<label class="cols">{{(Number(max.maxInput)) || "0"}}</label></span>
				</div>
			</div>
			<div class="item">
				<div class="row row_four">
					<span class="lb col" v-if="cutPrice">折扣金额(元)：<label class="cols">{{(cutPrice || 0).toFixed(2)}}</label></span>   
					<span class="lb col" v-if="!cutPrice">折扣金额(元)：<label class="cols">{{(0).toFixed(2)}}</label></span>
				</div>
			</div>
			
			</div>
			<!-- 结算按钮 -->
			<div class="money">
				<div class="top">
					<span class="top_one">实际应付款：</span>
					<span class="top_two" v-if="priceObj.totalCost-Number(cutPrice)<=0">￥0.00</span>
					<span class="top_two" v-if="priceObj.totalCost-Number(cutPrice)>0">￥{{(priceObj.totalCost-cutPrice).toFixed(2)}}</span>
				</div>
				<div class="mid">
					<span class="btn" @click="modelShow()">结算</span>
				</div>
				<div class="bottom" v-if="priceObj.totalCost-Number(cutPrice)>0">结算后此次获得token：{{(giveToken*(priceObj.totalCost-Number(cutPrice)))}}</div>
				<div class="bottom" v-if="priceObj.totalCost-Number(cutPrice)<=0">结算后此次获得token：0</div>
			</div>
		</div>
		</div>
		<!-- 模态层支付页面 -->
		<div class="model_payType" v-if="show_model"  @click.stop="show_model=false">
			<c-payCartModel v-if="paydata" :paydata="paydata"></c-payCartModel>
		</div>
		
		</div>
	</template>

	<script>
	import { Toast } from "mint-ui";
	import eventBus from "../../../../../common/eventBus/eventBus.js";
	import payCartModel from "../payCartModel/index";
	// import header from "@common/header_shopping/index.vue";

	import {
	goodsDetail,
	addOrder,
	queryCount,
	tokenValue,
	getAddress,
	sysmData
	} from "@api/api_shopping";
	export default {
		components: {
			'c-payCartModel':payCartModel
		},
	data() {
		return {
            address:{
                // 是否有默认地址
                have_addrsss: -1,
                // 默认地址信息
                defaultAdr: null,
                // 全部地址信息
                allAdr: [],
            },
            // 是否显示模态层
            show_model: false,
            // 订单详情
            orderDetail: [],
            // 用户要使用的token的数量
            useTokenNumber: null,
            // 用户剩余token积分,
            userLeftCount: null,
            // 折扣金额
            cutPrice: 0,
            // token手续费
            tokenCut: null,
            // 通证手续费
            vaacCut: null,
            // vaac值多少钱
            vaacWorth: null,
            // 赠送token比例
            giveToken: null,
            // token转vacc价值
            tokenToVaac: null,
            // 存在本地的临时积分
            sessionStorageToken: null,
            // 订单支付类型
            order_type: null,
            // 支付数据
            paydata:null,
            // 价格
            priceObj:{
                // 商品价格总和
                priceTotal:0,
                // 应付款总价
                totalCost:0,
                // 劳动token总价
                paycut:null,
            },
            // 最大值
            userInputMax:null,
            // 最大值键值
            max:{
                isMax:false,
                tokenCut:null,
                maxInput:null
            },
            list:null
		};
	},
	created() {
		this.sessionStorageToken = sessionStorage.getItem("temporaryNum");
	},
	activated() {
		this.initSysData();
		document.title = "填写订单";
		this.sessionStorageToken = sessionStorage.getItem("temporaryNum");
        if(this.$route.params&&this.$route.params.data){
            this.list = JSON.parse(this.$route.params.data)
        }
		this.order_type = JSON.parse(sessionStorage.getItem("order_type"));
		this.show_model = false;
		this.useTokenNumber = null;
		// 查询商品详情
		this.init(this.list,()=>{
            // 系统参数
            this.sysData(()=>{
                if (this.vaacWorth && this.vaacCut>=0) {
                    this.getUserCount(()=>{
                        this.autoFill();
                    });
                }
            });
            // 计算价格占比
            this.pricePoint();
		});
		// 获取地址信息
		this.getAdressMsg();
		// 获取新建地址信息
		eventBus.$on("addressObj", msg => {
		if (msg) {
			this.address.defaultAdr = msg;
		}
		});
		//库存不足 关闭模态层 
		eventBus.$on("model_pay_off",()=>{
			this.show_model = false;
        })
	},
	mounted() {},
	watch: {
		useTokenNumber(newVal, oldVal) {
			let currInput = (newVal + "").match(/^\d*(\.?\d{0,6})/g)[0] || null;
			this.useTokenNumber = currInput;
            this.max.tokenCut = Number(this.useTokenNumber*(this.tokenCut)).toFixed(6);
            this.max.maxInput = Number(this.useTokenNumber*(1+this.tokenCut)).toFixed(6);
			if (newVal <= 0) {
				this.cutPrice = null;
			}
			if (Number(newVal) > Number(this.userInputMax)) {
				this.useTokenNumber = this.userInputMax;
			}
		}
	},
	methods: {
		//
		initSysData() {
		// vaac价值多少钱
		this.vaccTurnMoney();
		},
		// 失去焦点计算折扣金额
		countPayWorth() {
            debugger
            if(Number(this.list.totalCost)<=0){
                return
            }
			// this.initUserCostToken();
			// if (this.useTokenNumber <= 0) {
			// 	this.priceObj.totalCost = this.orderDetail.payPrice;
			// 	this.cutPrice = null;
			// 	this.useTokenNumber = null;
			// 	return;
			// }
			if (this.useTokenNumber < 100) {
				this.priceObj.totalCost = this.orderDetail.payPrice;
				this.cutPrice = null;
				this.useTokenNumber = null;
				Toast("最少100token起");
				return;
			} else {
					this.cutPrice = this.tokenToVaac * this.useTokenNumber * this.vaacWorth;
				// 计算实际要付款的钱
				// if (this.cutPrice > this.orderDetail.payPrice) {
                //     this.priceObj.totalCost = 0;
				// } else {
                //     this.priceObj.totalCost = (this.orderDetail.payPrice - this.cutPrice);
                //     console.log(this.priceObj,"22",this.orderDetail,this.cutPrice)
				// }
			}
		},
		// 获取地址信息
		getAdressMsg() {
            getAddress().then(res => {
                if (res.code == "200" && res.msg == "success") {
                this.address.allAdr = res.data;
                for (let i in res.data) {
                    if (res.data[i] && res.data[i].isDefault == 1) {
                    this.address.have_addrsss = i;
                    this.address.defaultAdr = res.data[i];
                    break;
                    }
                }
                if (this.address.have_addrsss == -1 && res.data.length > 0) {
                    this.address.have_addrsss = 0;
                    this.address.defaultAdr = res.data[this.address.have_addrsss];
                }
                }
            });
		},
		// 获取商品详情
		init(data, callback) {
            this.orderDetail = data.data;
            this.priceObj.totalCost = Number(data.totalCost);
            if (callback) {
                callback();
            }
		},
		// 查询用户token积分
		getUserCount(callback) {
            queryCount().then(res => {
                if (res.code == "200" && res.msg == "success") {
                    this.userLeftCount = res.data;
                    if(callback){
                        callback()
                    }
                }
            });
		},
		// 全部系统参数
		sysData(callback) {
            sysmData().then(res => {
                if (res.code === "200" && res.msg === "success") {
                    for (let i in res.data.sysparamList) {
                        if (res.data.sysparamList[i].paramCode === "TOKEN_EXCHANGE_VAAC") {
                        // "token兑换VAAC比例"
                            this.tokenToVaac = Number(res.data.sysparamList[i].paramUrl);
                        }
                    }
                    // "购买送token比例"
                    this.giveToken = Number(res.data.scoreProportion);
                    for(let i in res.data.poundageList){
                        if (res.data.poundageList[i].poundageCode === "T_TRADE") {
                        // token手续费
                        this.tokenCut = Number(res.data.poundageList[i].poundageValue)/100;
                        }
                        if (res.data.poundageList[i].poundageCode === "I_SHOP") {
                        // 通证手续费
                        this.vaacCut = Number(res.data.poundageList[i].poundageValue)/100;
                        }
                    }
                    if (callback) {
                        callback()
                    }
                }
            });
		},
		// vaac值多少钱
		vaccTurnMoney() {
            tokenValue().then(res => {
                if (res.code === "200" && res.msg === "success") {
                this.vaacWorth = Number(res.data.price);
                }
            });
        },
        // 商品价格占比
        pricePoint(){
            var priceTotal = 0
            if(this.orderDetail){
                for(let i in this.orderDetail){
                    this.orderDetail[i]["priceRatio"] = Number(this.orderDetail[i].payPrice)/Number(this.list.totalCost);
                    priceTotal+=this.orderDetail[i].singlePrice;
                }
            }
            this.priceObj.priceTotal = priceTotal;
            this.priceObj.paycut = Number((priceTotal-this.priceObj.totalCost).toFixed(2));
        },
		// payType支付类型
		getPayType(data) {
			var userInputToken = this.useTokenNumber ? this.useTokenNumber : 0;
			var payMoney = Number(data.payPrice);
			var scoreMoney = Number(data.discountGold);
			var vaac;
			if (this.vaacWorth) {
                vaac = Number(payMoney-Number((Number(this.cutPrice)*data.priceRatio+scoreMoney).toFixed(2)))/Number(this.vaacWorth);
                if(this.isHavaMore(vaac,8)){
                    vaac = (Number(parseInt(vaac*100000000)+1)/100000000)
                }else{
                    vaac = Number(vaac)
                }
			} else {
				this.show_model = !this.show_model;
				return;
			}
			var vaacAccount = Number(vaac)*(1+this.vaacCut);
			var isHavaMore = this.isHavaMore(vaacAccount,8);
			if(isHavaMore){
				vaacAccount = (Number(parseInt(vaacAccount*100000000)+1)/100000000)
			}else{
				vaacAccount = Number(vaacAccount)
			}
			if (payMoney <= 0) {
				payMoney = 0;
			}
			var params = {
				proName: data.proName,
				totalPrice: data.singlePrice,
				proUrl: data.picUrl,
				proCount: 1,
				integral: Number(this.userLeftCount) + "",
				userAddressid: this.address.defaultAdr.id,
				discountGold: Number((this.tokenCut * userInputToken*data.priceRatio).toFixed(6)) ? (this.tokenCut * userInputToken*data.priceRatio).toFixed(6) : "0",
				consumeGold: (Number(userInputToken)*data.priceRatio).toFixed(6),
				proId: data.id,
                discountPrice: (Number(this.cutPrice)*data.priceRatio+scoreMoney).toFixed(2),
				takeGold: null,
				hashAddress: data.hashAddress,
				singlePrice:data.singlePrice,
				// 实际应付款 通证价值
				vaac: vaac,
				// 实际应付款 + 通证手续费
				vaacAccount:vaacAccount>0 ? vaacAccount:"0",
				// 订单支付类型
				oType: this.order_type || 1,
				// 购买赠送的token比例
				giveToken:this.giveToken,
				// vaac价值
				vaacWorth:this.vaacWorth,
				// 通证手续费
				vaacCut:this.vaacCut,
				// token手续费
				tokenCut : this.tokenCut,
				// "token兑换VAAC比例"
				tokenToVaac : this.tokenToVaac,
				// 临时积分 劳动token
				temporaryNum:scoreMoney/this.tokenToVaac/this.vaacWorth,
				// 临时积分金额
				temporarynumWorth:scoreMoney
			};
            // 赠送token
            params.takeGold = Number((params.singlePrice-Number(params.discountPrice))*this.giveToken).toFixed(6)
			// 消费类型
			// 带token
			if (Number(userInputToken) > 0) {
				// token消费=》{纯token  +  token通证  }
				if (Number(userInputToken) > 0 && Number(params.discountPrice) > 0) {
                    if (Number(params.discountPrice) >= params.totalPrice) {
                        // 折扣金额大于等于物价，那就是  纯token消费
                        params.totalPrice = 0;
                        params.vaac = "0";
                    } else {
                        // 折扣金额小于物价=》 token + 通证消费
                        params.totalPrice = 0;
                    }
				}
			} else {
				// 纯通证消费
				params.consumeGold = "0";
				params.totalPrice = 0;
			}
			return {
				params: params,
				userInputToken: (Number(params.discountGold)+Number(params.consumeGold)).toFixed(6),
				payMoney: Number((params.singlePrice-Number(params.discountPrice)).toFixed(2)),
				sysm:{
					// 购买赠送的token比例
					giveToken:this.giveToken,
					// vaac价值
					vaacWorth:this.vaacWorth,
					// 通证手续费
					vaacCut:this.vaacCut
				}
			};
		},
		fun() {},
		// initU
		initUserCostToken() {
			if (this.useTokenNumber) {
				this.useTokenNumber = Number(Math.floor(Number(this.useTokenNumber) * 1000000) / 1000000).toFixed(6);
			}
		},
		modelShow() {
		if (!this.address.defaultAdr) {
			Toast("请选择收货地址");
			return false;
		}
        var payType = [];
        for(let i in this.orderDetail){
            payType.push(this.getPayType(this.orderDetail[i]))
        }
        this.paydata = payType;
		this.show_model = !this.show_model;
		},
		// 跳转
		jumpToAdr() {
		this.$router.push({
			path: "/address/addressManage",
			query: { outside: true }
		});
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
		// 自动计算 token
		autoFill() {
			var useTokenNumber;
			var productValue;
			var isHavaMore;
            // 商品价值有手续费
            useTokenNumber = this.priceObj.totalCost / this.vaacWorth / this.tokenToVaac  * (1 + this.tokenCut);
            // 商品价值无手续费
            productValue = this.priceObj.totalCost / this.vaacWorth / this.tokenToVaac;
            // 标识取六位后是否有尾数
            isHavaMore = this.isHavaMore(useTokenNumber,6);
            if(useTokenNumber<100){
                this.userInputMax = this.useTokenNumber;
                return
            }else{
                if(this.userLeftCount && this.userLeftCount>useTokenNumber){
                    if(isHavaMore){
                        this.useTokenNumber = Number(parseInt(productValue*1000000)+1)/1000000
                    }else{
                        this.useTokenNumber = Number(productValue).toFixed(6)
                    }
                }else{
                    this.useTokenNumber = Number(this.userLeftCount/(1+this.tokenCut)).toFixed(6);
                }
                this.userInputMax = this.useTokenNumber;
            }
			this.countPayWorth();
		}
	},
	beforeDestroy() {
		eventBus.$off("addressObj");
        eventBus.$off("model_pay_off");
	}
	};
	</script>

	<style lang="scss"  scoped="scoped">
	@import "../../../../../common/styles/mixin.scss";
	.fill_order {
	padding: 0 0.106667rem 0;
	position: relative;
	.fill_order_content {
		// 地址
		.address {
		// 有地址的情况下
		.address_have {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #ffffff;
			box-shadow: 0px 1px 5px 0px rgba(153, 153, 153, 0.35);
			border-radius: 0.133333rem;
			margin-bottom: 0.293333rem;
			// 地址左边文本
			.address_left {
			padding: 0.586667rem 0 0.48rem 0.186667rem;
			// 姓名电话
			.left_top {
				@include font-dpr(11px);
				margin-bottom: 0.346667rem;
				color: #333333;
				.name {
				}
				.phone {
				}
			}
			// 地址
			.left_bottom {
				@include font-dpr(11px);
				color: #333333;
				.left_bottom_address {
				}
			}
			}
			// 右边编辑
			.address_right {
			margin-right: 0.293333rem;
			span {
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				background: url("../../../../../common/assets/images/shopping/edit.png")
				no-repeat;
				background-size: contain;
			}
			}
		}
		// 无地址
		.address_none {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.666667rem 0;
			box-shadow: 0px 1px 5px 0px rgba(153, 153, 153, 0.35);
			border-radius: 0.133333rem;
			margin-bottom: 0.293333rem;
			span {
			box-sizing: border-box;
			border: 0.026667rem solid #16b773;
			border-radius: 0.133333rem;
			display: inline-block;
			width: 2.133333rem;
			height: 0.72rem;
			text-align: center;
			line-height: 0.72rem;
			color: #16b773;
			}
		}
		}
		// 订单详情
		.detail {
		background-color: #ffffff;
		box-shadow: 0px 2px 10px 0px rgba(153, 153, 153, 0.35);
		padding: 0.266667rem 0.16rem 1.12rem;
		//
		.address_title {
			font-family: "MicrosoftYaHei";
			@include font-dpr(13px);
			font-weight: normal;
			font-stretch: normal;
			line-height: 0.4rem;
			letter-spacing: 0.026667rem;
			color: #333333;
			margin-bottom: 0.24rem;
		}
		
		// 列表
		.list {
			padding-bottom: 0.613333rem;
			border-bottom: 0.026667rem solid #e6e6e6;
			.item {
			&:nth-child(1) {
				margin-top: 0;
			}
			margin-top: 0.266667rem;
            // 图片
		.address_img {
			margin-bottom: 0.373333rem;
			img {
			width: 100%;
			height: 5.2rem;
			}
		}
			.row_one {
				color: #333333;
				font-family: "MicrosoftYaHei";
				.line_feed{
					width:6rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.col {
				@include font-dpr(14px);
				}
				.cnt {
				@include font-dpr(12px);
				}
			}
			.row_two {
				font-family: "MicrosoftYaHei";
				justify-content: space-between;
				.col {
				@include font-dpr(12px);
				color: #333333;
				}
				.cnt {
				@include font-dpr(9px);
				color: #999999;
				}
				.price {
				@include font-dpr(12px);
				font-weight: normal;
				font-stretch: normal;
				line-height: 0.4rem;
				letter-spacing: 0.026667rem;
				color: #ff0000;
				}
			}
			.row_three {
				@include font-dpr(10px);
				font-family: "MicrosoftYaHei";
				color: #333333;
				.col {
				}
				.cnt {
				display: inline-block;
				text-align: center;
				line-height: 0.533333rem;
				background-color: #eeeeee;
				border: 1px solid #949494;
				input {
					width: 2.133333rem;
					height: 0.533333rem;
					border: 0;
					padding: 0 0.2rem;
				}
				}
			}
			.row_four {
				font-family: "MicrosoftYaHei";
				.col {
				@include font-dpr(12px);
				color: #333333;
				}
				.cols {
				// text-decoration: line-through;
				}
				.cnt {
				@include font-dpr(12px);
				}
			}
			}
		}
		// 结算部分
		.money {
			// 啥
			.top {
				margin: 0.213333rem 0 1.12rem;
				.top_one {
					@include font-dpr(13px);
					color: #333333;
					font-family: "MicrosoftYaHei";
				}
				.top_two {
					@include font-dpr(15px);
					color: #ff0000;
					font-family: "MicrosoftYaHei-Bold";
					font-weight: bold;
				}
			}
			// 结算按钮
			.mid {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 0.293333rem;
			.btn {
				@include font-dpr(13px);
				letter-spacing: 0.026667rem;
				color: #ffffff;
				display: inline-block;
				font-family: "MicrosoftYaHei";
				height: 0.8rem;
				width: 6.133333rem;
				text-align: center;
				line-height: 0.8rem;
				background-color: #16b773;
				border-radius: 0.133333rem;
			}
			}
			// 底部
			.bottom {
			@include font-dpr(9px);
			font-family: "MicrosoftYaHei";
			font-weight: normal;
			font-stretch: normal;
			line-height: 0.4rem;
			letter-spacing: 0.026667rem;
			color: #999999;
			text-align: center;
			}
		}
		}
	}
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