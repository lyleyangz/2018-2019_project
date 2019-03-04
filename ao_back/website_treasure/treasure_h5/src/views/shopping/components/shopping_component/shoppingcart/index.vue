<template>
 <div class='shopping_car'>
     <div class="warn" v-if="list.length">温馨提示：购物车商品将在每晚00:00:00清空</div>
     <div class="car_list" v-if="list.length">
         <div class="car_item"  v-for="(item,index) in list">
            <div class="check_btn">
                <input type="checkbox" :id="'check'+index" v-model="item.checked" style="display:none;"/>
                <label :for="'check'+index" :class="item.checked?'checkboxstyle_active':'checkboxstyle'"></label>
            </div>
            <div class="left">
                <img :style="item.proCount>0? '':'opacity: 0.3;'" :src="item.picUrl" alt="">
                <img v-if="item.proCount<=0" style="position: absolute;top: 0;left: 0;" src="../../../../../common/assets/images/shopping/sale_empty.png" alt="">
            </div>
            <div class="product">
                <!-- <div class="product_mid"> -->
                    <div class="top">
                        <div class="title">{{item.proName}}</div>
                        <div class="content item">
                            <div class="number row">
                                <span class="cnt">数量：{{item.proCount}}</span>
                                <span class="col atr line_feed">{{item.paramName}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="botm item">
                        <div class="row">商品价格: ￥{{Number(item.singlePrice).toFixed(2)}}</div>
                        <div class="row">劳动taken折扣(元): {{Number(item.discountGold).toFixed(2)}}</div>
                        <div class="row">应付款(元)：{{Number(item.payPrice).toFixed(2)}}</div>
                    </div>
                <!-- </div> -->
            </div> 
            <div class="right">
                <img src="../../../../../common/assets/images/shopping/shopping_delect.png" alt="" @click="handleRemove(item)">
            </div>
         </div>
     </div>


     <div v-else  class="null">
         <div class="img">
            <img src="../../../../../common/assets/images/shopping/shoppingcar_empty.png" alt="">
         </div>
         <div class="text">
             <div class="one">购物车还是空的</div>
             <div class="two">快去挑选几件喜欢的珠宝吧~</div>
             <div class="three" @click="return_index()">去逛逛</div>
         </div>
     </div>

     <div class="footer" v-if="list.length">
        <div class="row">
            <div class="left col">
                <input type="checkbox" id="checkall" @click="handleChecked()" v-model="allChecked" style="display:none;"/>
                <label for="checkall" :class="allChecked?'checkboxstyle_active':'checkboxstyle'"></label>
                <span class="text">全选</span>
            </div>
            <div class="mid">合计：<span class="price" v-if="totalCost">￥{{Number(totalCost).toFixed(2)}}</span><span class="price" v-if="!totalCost">￥0.00</span></div>
            <div class="right" @click.stop="order()">结算</div>
        </div>
     </div>

 </div>
</template>
 
<script>
import {addCar,carList,delectCar} from "@api/api_shoppingcar";
import eventBus from "../../../../../common/eventBus/eventBus.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
        // 用户数据
        user:{
            token:null,
            wallet:null,
            userId:null,
        },
        // 合计
        totalCost:null,
      //全选

      allChecked: false,

      // 购物清单

      list: [
        //   {
        //       paramName:"颜色",
        //       paramWeight:"绿色",
        //       proCount:"100个",
        //       singlePrice:155,
        //       discountGold:55,
        //       payPrice:100,
        //       picUrl:"http://albups.xsl.one/upload/imgs/20181222/1545461563720_362.png"

        //   },
        //    {
        //       paramName:"颜色",
        //       paramWeight:"红色",
        //       proCount:"10个",
        //       singlePrice:88,
        //       discountGold:55,
        //       payPrice:33,
        //       picUrl:"http://albups.xsl.one/upload/imgs/20181222/1545461563720_362.png"

        //   }
      ],

    //   被选中的商品
        selected:[],
    };
  },
  created() {
    document.title = "购物车";
  },
  mounted() {
        this.user.token = sessionStorage.getItem("token");
        this.user.wallet = sessionStorage.getItem("wallet");
        this.user.userId = sessionStorage.getItem("userId");
        this.init()
  },
  watch: {},
  methods: {
    //   结算
        order(){
            if(this.selected.length>0){
                var sendData = {
                    totalCost:Number(this.totalCost).toFixed(2),
                    data:(this.selected)
                }
                this.$router.push({
                    name:"shoppingCartOrder",
                    params:{
                        data:JSON.stringify(sendData)
                    }
                })
            }else{
                Toast('您还没有选择商品!');
                return false;
            }
        },
        handleChecked: function(item) {
            //全选
            if (this.allChecked == false) {
                for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.checked = true;
                }
            } else {
                //取消全选
                for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.checked = false;
                }
            }
            this.allChecked = !this.allChecked;
        },
        // 删除
        handleRemove(item){
            delectCar({id:item.id}).then((res)=>{
                if(res.code == "200"){
                    Toast('删除成功!');
                    this.init()
                }
            })
        },
        // 配置要结算商品的数据
        checkSelect(callback) {
            var products = [];
            var a = 0;
            if(this.list.length>0){
                for(let i in this.list){
                    if(this.list[i].checked){
                        products.push(this.list[i])
                        a += 1;
                    }
                }
            }
            this.selected = products;
            if(callback){
                callback()
            }
            //全选单选级联 
            if(this.selected.length==this.list.length){
                this.allChecked = true;
            }else{
                this.allChecked = false;
            }
        },
        // 计算总价
        countTotalPrice(arr){
            var cost = 0;
            if(arr.length>0){
                for(let i in arr){
                    cost += arr[i].payPrice;
                }
            }else{
                return false
            }
            return cost;
        },
        // 获取购物车列表
        init(){
            carList().then((res)=>{
                if(res.code == "200"){
                    for(let i in res.data){
                        res.data[i]["checked"] = false
                    }
                    this.list = res.data;
                }
            })
        },
        // 返回商城
        return_index() {
            this.$router.replace({
                path: "/commodity?token="+this.user.token+"&userId="+this.user.userId+"&wallet="+this.user.wallet
            });
        },
  },
  updated() {
        this.checkSelect(()=>{
            this.totalCost = this.countTotalPrice(this.selected);
        })
  }
};
</script>
<style lang='scss' scoped>
@import "../../../../../common/styles/mixin.scss";
.shopping_car {
    .warn{
        padding: .093333rem 0 .12rem .333333rem;
        font-family: "PingFangSC-Regular";
        @include font-dpr(12px);
        line-height: .4rem;
        letter-spacing: .013333rem;
        color: #00b06a;
    }
    // 购物车为空
    .null{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 2.506667rem;
        .img{
            width: 4.96rem;
            height: 4.093333rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: .08rem;
            font-family: "PingFangSC-Regular";
            .one{
                @include font-dpr(15px);
                color: #333333;
            }
            .two{
                margin-top: .2rem;
                @include font-dpr(13px);
                color: #999999;
            }
            .three{
                width: 3.133333rem;
                height: .92rem;
                line-height: .92rem;
                box-sizing: content-box;
                @include font-dpr(15px);
                border-radius: .133333rem;
                border: solid 1px #16b773;
                color: #16b773;
                text-align: center;
                margin-top: .24rem;
            }
        }
    }


    // 
    .car_list {
        margin: 0 .12rem 1.4rem;
        .car_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
            background-color: #ffffff;
            box-shadow: 0px 4px 11px 0px rgba(153, 153, 153, 0.24);
            border-radius: .066667rem;
            margin-top: .106667rem;
            padding: .226667rem .253333rem .933333rem .2rem;
            height: 100%;
            &:nth-child(1) {
                margin-top: 0;
            }
            .left{
                // background-size: cover;
                width: 2.666667rem;
                height: 100%;
                margin: 0 .373333rem 0 .266667rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
            }
            .product {
                display: inline-flex;
                justify-content: space-between;
                flex-direction: column;
                .top{
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: column;
                    margin-bottom: .4rem;
                    .title{
                        margin-bottom: .2rem;
                        // text-align: center;
                    }
                    .content{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .number{
                            margin-right: .666667rem;
                            display: flex;
                            align-items: center;
                        }
                        .line_feed{
                            // flex: 1;
                            @include font-dpr(12px);
                            // width:3rem;
                            margin-left: .5rem;
                            font-family: "PingFangSC-Regular";
                            color: #666666;
                        }
                    }
                }
                .botm{
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: column;
                }
            }
            .check_btn{
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
// checklist按钮
    .checkboxstyle{
        width: .386667rem;
        height: .386667rem;
        border: solid .026667rem #aaaaaa;
        border-radius: 50%;
            box-sizing: border-box;
    }
    .checkboxstyle_active{
        width: .386667rem;
        height: .386667rem;
        background: url("../../../../../common/assets/images/shopping/check_sure.png") no-repeat;
        background-size: contain;
        border-radius: 50%;
            box-sizing: border-box;
    }
    .footer {
        position: fixed;
        bottom: 0;
        z-index: 99999;
        height: 1.2rem;
        width: 100%;
        background-color: #ffffff;
        .row{
            height: 100%;
            align-items: center;
            justify-content: space-between;
            .left{
                display: flex;
                margin-left: .4rem;
                .text{
                     margin-left: .413333rem;
                }
            }
            .mid{
                margin-right: .373333rem;
                 @include font-dpr(14px);
                font-family: "PingFangSC-Regular";
                color: #333333;
                .price{
                    font-family: "PingFangSC-Regular";
                    @include font-dpr(15px);
                    color: #ff0000;
                }
            }
            .right{
                width: 3.12rem;
                height: 100%;
                background-color: #16b773;
                font-family: "PingFangSC-Regular";
                @include font-dpr(14px);
                color: #ffffff;
                line-height: 1.2rem;
                text-align: center;
            }
        }
    }
}
</style>
 