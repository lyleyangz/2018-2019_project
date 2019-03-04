<template>
	<div class="footer">
    <!-- 已登录 -->
    <div class="is_login row" v-if="is_Login" ref="footDom">
      <div class="left" :style="" @click="call()">
        <span></span>
      </div>
      <div class="mid col" @click="give()">购买送亲友</div>
      <div class="cart col" @click="addCart()">加入购物车<span class="add_one" v-if="faded">+1</span></div>
      <div class="right col" @click="buy()">购买</div>
    </div>
    <!-- 未登录 -->
    <div class="no_login" v-if="!is_Login" @click="login()">
      <div class="btn">注册个人资产钱包</div>
    </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import {addCar} from "@api/api_shoppingcar";
import { setTimeout } from 'timers';

export default {
//   props: ["is_Login", "ID"],
  props: {
		serive:{
            type: Object,
            default: function(){
                return {}
            }
		},
		is_Login:{
			type:Boolean,
			default:function(){
				return {}
			}
		},
		ID:{
			type:String,
			default:function(){
				return {}
			}
		}
	},
  data() {
    return {
        // +1特效
        faded:false,
        // 加入购物车数据
        params:null,
        //   劳动token
        temporaryObj:{
            temporaryNum:null,
            temporaryNumVal:null
        }
    };
  },
  created() {
    sessionStorage.removeItem("order_type");
  },
  mounted() {
      if(this.serive){
          this.params = {
            proId:this.ID,
            discountGold:"0",
            payPrice:this.serive.payPrice,
          }
      }
  },
  methods: {
    login() {
      window.android_client.goCreateWallet();
      // Toast("请先注册钱包！");
      // return;
    },
    buy() {
      this.$router.push({
        path: `/commodity/fillorder/${this.ID}`
      });
      sessionStorage.setItem("order_type", 1);
    },
    call() {
	//   window.android_client.goSaleService(url: String, title: String, description: String, pic: String)
		let androidMsg = {
			url:window.location.protocol+"//"+window.location.host+"/shopping.html#/commodityDetail/"+this.ID,
			proName:this.serive.proName,
			picUrl:this.serive.picUrl
		}
		window.android_client.goSaleService(androidMsg.url, androidMsg.proName, androidMsg.picUrl)
    },
    give() {
      this.$router.push({
        path: `/commodity/fillorder/${this.ID}`
      });
      sessionStorage.setItem("order_type", 2);
    },
    // 
    addCart(){
        if (sessionStorage.getItem("temporaryNum")) {
            this.temporaryObj.temporaryNum = sessionStorage.getItem("temporaryNum");
            this.temporaryObj.temporaryNumVal = sessionStorage.getItem("temporaryNumVal");
            this.params.discountGold = this.temporaryObj.temporaryNumVal;
            this.params.payPrice = (this.params.payPrice-Number(this.temporaryObj.temporaryNumVal)).toFixed(2);
        }
        if(this.params){
            addCar(this.params).then((res)=>{
                if(res.data){
                    this.faded = true;
                    setTimeout(()=>{
                        this.faded = false;
                    },2000)
                }else{
                    Toast("同一个商品不能重复加入购物车!");
                    return;
                }
            })
        }
    }
  }
};
</script>
<style>
</style>

<style lang="scss"  scoped="scoped">
@import "../../common/styles/mixin.scss";
.footer {
  position: fixed;
  bottom: 0;
  z-index: 99999;
  height: 1.2rem;
  width: 100%;
  color: #ffffff;
  // 已创建钱包
  .is_login {
    @include font-dpr(13px);
    display: flex;
    text-align: center;
    height: 100%;
    line-height: 1.2rem;
    .left{
      background-color:#ffffff;
      // margin: .333333rem;
      padding: 0 .333333rem;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        width: .533333rem;
        height: .56rem;
        background: url("../assets/images/shopping/kefu.png") no-repeat;
        background-size: 100% 100%;
        display: inline-block;
      }
    }
    .mid {
      background-color: #16b673;
    }
    .right{
      background-color: #16b673;
    }
    .cart{
        border-right: 0.026667rem solid #ffffff;
        border-left: 0.026667rem solid #ffffff;
        background-color: #ff0000;
        position: relative;
        .add_one{
            position: absolute;
            display: inline-block;
            width: .666667rem;
            height: .666667rem;
            right: 0;
            top: -0.58rem;
            line-height: .666667rem;
            text-align: center;
            animation: add_one_animation 0.5s;
            color: #ff0000;
            font-weight: bold;
        }
    }
  }
  // 未创建钱包
  .no_login {
    background-color: #16b673;
    display: flex;
    @include font-dpr(13px);
    justify-content: center;
    text-align: center;
    padding: 0 3.493333rem;
    line-height: 1.2rem;
  }
  // .no_login:hover{
  //   background: #cccccc;
  // }
}


/*增加动画animation*/
	@keyframes add_one_animation {
	from {
		transform: scale(0);
	}
	to {
		transform: scale(1);
	}
	}
</style>