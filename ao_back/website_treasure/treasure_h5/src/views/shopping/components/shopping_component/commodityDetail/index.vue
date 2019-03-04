<template>
	<div class="commodityDetail">
    <!-- <v-header head=""></v-header> -->
    <div class="commodityDetail_content" v-if="productMsg">
      <div class="shopping_title_img" v-if="productMsg.proUrl && productMsg.proUrl.length>0">
        <!-- <img :src="productMsg.proUrl" alt=""> -->
          <mt-swipe :auto="5000">
              <mt-swipe-item  v-for="(item,index) in productMsg.proUrl" :key="index">
                  <div class="shopping_title_img_share">
                    <!-- <span class="shopping_car" @click.stop="shoppingCar(productMsg)"></span> -->
                    <span @click.stop="share(productMsg)"></span>
                  </div>
                  <img :src="item" alt="">
              </mt-swipe-item>
          </mt-swipe>
      </div>
      <div class="commodityDetail_list_content">
          <div class="item">
            <div class="row row_one">
                <span class="lb col" v-if="productMsg.proName">{{productMsg.proName}}</span>
                <span class="cnt" v-if="productMsg.price">￥ {{productMsg.price}}</span>
            </div>
          </div>
           <div class="item">
            <div class="row row_one_one">
                <span class="cnt line_feed" >{{sku}}</span>
            </div>
          </div>
          <div class="item">
            <div class="row row_two">
                <span class="lb col" v-if="productMsg.proBatch">商品批次：{{productMsg.proBatch}}</span>
                <span class="lb col" v-if="productMsg.leftCount">当前库存：{{productMsg.leftCount}}</span>
                <span class="cnt"></span>
            </div>
          </div>
          <div class="item_three"  v-if="chainData">
            <div class="row_three" @click.stop="nfc(chainData)">
                <div class="item">
                  <div class="row">
                      <span class="cnt">区块地址：</span>
                      <span class="lb col">{{chainData.hashAddress}}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="row">
                      <span class="cnt">区块生成时间：</span>
                      <span class="lb col">{{chainData.qkTime}}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="row">
                      <span class="cnt">区块高度：</span>
                      <span class="lb col">{{(Number(chainData.qkLedgerIndex) || 0).toFixed(0)}}</span>
                  </div>
                </div> 
            </div>
    </div>
      </div>
      <!-- navbar -->
      <div class="nav">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">链商品信息</mt-tab-item>
          <mt-tab-item id="2">劳动激励</mt-tab-item>
          <mt-tab-item id="3">评价</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <!-- <mt-tab-container-item id="1" v-if="send_chain_data.qkHashId"> -->
            <mt-tab-container-item id="1">
                <div class="product_data" v-if="goodsPropertyData">
                    <div class="item" v-for="(item,index) in goodsPropertyData" :key="index">
                        <div class="row">
                            <span class="lb col">{{item.name}}</span>
                            <span class="lb col">{{item.value}}</span>
                        </div>
                    </div>
                  </div>
                  <div class="product_data" v-if="productData">
                    <div class="item" v-for="(item,index) in productData" :key="index">
                        <div class="row">
                            <span class="lb col">{{item.name}}</span>
                            <span class="lb col">{{item.value}}</span>
                        </div>
                    </div>
                  </div>
            <div v-html="navbar_2_detail" class="shopping_detail_html"></div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                  <v-discount :navbar_1_detail="navbar_1_detail"></v-discount>
            </mt-tab-container-item>
            <mt-tab-container-item id="3" v-if="ID">
                  <v-evaluate :navbar_3_detail="navbar_3_detail" :ID="ID"></v-evaluate>
            </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <!-- 分享商品 -->
		<v-share v-if="share_show" :shareData="shareData"></v-share>
    <v-footer v-if="serive" :is_Login="is_Login" :ID="ID" :serive="serive"></v-footer>
    <!-- 购物车 -->
    <div class="shopping_model" v-if="model_copy_show">
          <div class="model" v-show="model_copy_show" @click.stop="model_copy_show=false">
            <!--  -->
              <div class="mint-radiolist" @click.stop="fun">
                <div class="shopping_content">
                      <div class="car item">
                        <div class="top">
                            <div class="img"></div>
                            <div class="price"></div>
                            <div class="close"></div>
                        </div>
                        <div class="mid">
                          <div class="item">
                            <div class="title">颜色</div>
                            <div class="value" v-for="i in 5">
                              <span class="value_span">红色大红</span>
                            </div>
                          </div>
                        </div>
                        <div class="bot row">
                          <div class="left col">数量</div>
                          <div class="right row">
                            <div class="reduce col">-</div>
                            <div class="number cnt">1</div>
                            <div class="add col">+</div>
                          </div>
                        </div>
                      </div>

                       <div class="sure_pay"><span>加入购物车</span></div>
                  </div>
              </div>
          </div>
    </div>
	</div>
</template>
<script>
import { Toast } from "mint-ui";
import { goodsDetail } from "@api/api_shopping";
import eventBus from "../../../../../common/eventBus/eventBus.js";
import header from "@common/header_shopping/index.vue";
import footer from "@common/footer_shopping/index.vue";
import share from "../share/index";
// nav-3 评价
import evaluate from "../evaluate/index.vue";
// nav-1 评价
import discount from "../discount/index.vue";

export default {
  components: {
    "v-header": header,
    "v-evaluate": evaluate,
    "v-discount": discount,
    "v-footer": footer,
    'v-share':share
  },
  data() {
    return {
        // navbar切换
        selected: "1",
        // 头部商品信息信息
        productMsg: {},
        // navbar-1 折扣数据
        // send_chain_data:{},
        navbar_1_detail: [],
        // navbar-2 富文本
        navbar_2_detail: null,
        // navbar-3 评价数据
        navbar_3_detail: [],
        // 判断是否有登陆
        is_Login: true,
        // 商品ID
        ID: this.$route.params.id,
        // 存区块信息
        chainData: null,
        // 存商品溯源属性数据
        productData: null,
        // 分享
        share_show:false,
        shareData:null,
        serive:null,
        sku:"",
        goodsPropertyData:null,
        // 购物车
        model_copy_show: false,
    };
  },
  created() {
    // 判断是否有登录=有钱包
    // if (this.$route.query && this.$route.query.wallet) {
      if (!this.$route.query.wallet||this.$route.query.wallet == 0) {
        this.is_Login = false;
      }
    // }
  },
  updated(){
      sessionStorage.setItem("selectedNav",this.selected)
  },
  mounted() {
    sessionStorage.removeItem("TOPAYDATA");    
    sessionStorage.removeItem("current_video_id");
    sessionStorage.removeItem("order_type");
    if(sessionStorage.getItem("selectedNav")){
      this.selected = sessionStorage.getItem("selectedNav")
    }
    this.chainData = JSON.parse(sessionStorage.getItem("commodityDetail"));
    if (this.chainData&&this.chainData.basics) {
      this.productData = this.chainData.basics;
    }
    if (this.$route.params && this.$route.params.id) {
      this.init(this.ID);
    }

    eventBus.$on("shareOff",()=>{
			this.share_show = !this.share_show;
    })
    // 积分
    eventBus.$on("shareOn",()=>{
      if(this.productMsg){
        this.share(this.productMsg)
      }
		})
  },
  methods: {
    nfc(item) {
      location.href = "/#/home?id=" + item.hashAddress;
    },
    init(id) {
        var _this = this;
        goodsDetail({ id: id }).then(res => {
            if (res.code === "200" && res.msg === "success") {
            // android 客服参数
            let android = {
                //   顺便给购物车
                    proName:res.data.proName,
                    proId:res.data.id,
                    discountGold:"0",
                    payPrice:res.data.price,
                    picUrl:null,
            }
            //   轮播商品图片
            if (res.data && res.data.proUrl) {
                res.data.proUrl = res.data.proUrl.split(",");
                android.picUrl = res.data.proUrl[0] || ""
            }
            this.navbar_2_detail = res.data.proInfo;
            this.productMsg = res.data;
            document.title = this.productMsg.proName;
            this.serive = android;
            var goodsProperty = res.data.goodsProperty;
            this.goodsPropertyData = goodsProperty;
            
            var sku = [];
            goodsProperty.forEach(item => {
                sku.push(item.value);
            });
            this.sku = sku.join("  ")
            }
        });
    },
    // 分享
        share(data){
            this.share_show = !this.share_show;
            let share_data = {
                cover: data.proUrl[0],
                proName: data.proName,
                price: data.price,
                shareUrl: location.href.split(location.hash)[0]+'#/commodityDetail/'+data.id,
                type:2
			}
			this.shareData = share_data;
		},
    // 购物车
    shoppingCar(data){
      console.log(data)
      this.model_copy_show = !this.model_copy_show
    },
    fun(){},
  },
  beforeDestroy(){
    eventBus.$off('shareOff');
    eventBus.$off('shareOn')
	}
};
</script>
<style  lang="scss">
@import "../../../../../common/styles/mixin.scss";
.mint-navbar .mint-tab-item.is-selected {
  background-image: linear-gradient(
    180deg,
    #0bb470 10%,
    #43d99d 73%,
    #7bfec9 100%
  );
  color: #ffffff !important;
}
.mint-tab-item {
  color: #666666;
}
.nav .mint-tab-item-label {
  @include font-dpr(13px);
}
</style>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.commodityDetail {
  .commodityDetail_content {
    background-color: #f4f4f4;
    margin-bottom: 1.2rem;
    .shopping_title_img {
      height: 6.48rem;
      img {
        width: 100%;
        height: 6.48rem;
      }
      .shopping_title_img_share{
				position: absolute;
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				span{
					width: .666667rem;
					height: .666667rem;
					display: inline-block;
					background: url('../../../../../common/assets/images/shopping/share.png') no-repeat;
					background-size: contain;
					margin: .133333rem;
				}
        // 购物车
        .shopping_car{
          	width: .666667rem;
            height: .666667rem;
            display: inline-block;
            background: url('../../../../../common/assets/images/shopping/shopping_car.png') no-repeat;
            background-size: contain;
            margin: .133333rem;
        }
			}
    }
    .commodityDetail_list_content {
      padding: 0.173333rem 0.106667rem 0.293333rem;
      background-color: #ffffff;
      box-sizing: border-box;
      .item {
        margin: 0 0.186667rem;
        &:nth-child(1) {
          margin-bottom: 0.186667rem;
        }
        &:nth-child(2) {
          margin-bottom: 0.253333rem;
        }
        // 商品详情第一行文本
        .row_one {
          margin-bottom: 0.266667rem;
          .col {
            @include font-dpr(14px);
            color: #333333;
          }
          .cnt {
            @include font-dpr(14px);
            color: #ff0000;
            font-weight: bold;
          }
        }
        // 增加sku
        .row_one_one{
          .line_feed{
            width:6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        // 商品详情第二行文本
        .row_two {
          @include font-dpr(10px);
          padding-bottom: 0.266667rem;
          color: #009933;
          .col {
          }
          .cnt {
          }
        }
      }
      //
      // // 2018-11-14 新增区块
      .item_three {
        background-color: #f4f4f4;
        border-radius: 0.133333rem;
        .row_three {
          padding: 0.16rem 0.2rem;
          @include font-dpr(10px);
          font-family: "MicrosoftYaHei";
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.453333rem;
          letter-spacing: 0px;
          color: #16b733;
          .item {
            margin: 0;
            margin-top: 0.186667rem;
            &:nth-child(1) {
              margin-top: 0;
            }
            .row {
              .cnt {
                display: inline-flex;
                align-items: center;
              }
              .col {
                word-break: break-all;
              }
            }
          }
        }
      }
    }
    //
    .nav {
      margin: 0 0.12rem;
      .shopping_detail_html {
        background-color: #ffffff;
        padding: 0 0.28rem;
        // padding: 0.48rem 0.266667rem;
      }
      .product_data {
        background-color: #ffffff;
        padding: 0.32rem 0.28rem 0.4rem;
        .item {
          margin-top: 0.186667rem;
          &:nth-child(1) {
            margin-top: 0;
          }
          .row {
            @include font-dpr(12px);
            color: #666666;
          }
        }
      }
    }
  }
// 购物车模态城
  .shopping_model {
    .model {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      background-color: rgba(153, 153, 153, 0.55);
      .mint-radiolist {
        position: fixed;
        width: 100%;
        // height:100%;
        overflow: hidden;
        box-sizing: border-box;
        bottom: 0;
        background-color: #ffffff;
        .shopping_content {
          // margin-top: 0.933333rem;
          // 确定按钮

          .sure_pay {
            // margin-top: 1.146667rem;
            width: 100%;
            height: 0.933333rem;
            animation: model_height_animation 0.2s;
            background-color: #ff0000;
            // border-radius: 0.133333rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: flex-end;
            bottom: 0;
            span {
              display: inline-block;
              height: 0.346667rem;
              font-family: "MicrosoftYaHei";
              @include font-dpr(13px);
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.346667rem;
              letter-spacing: 0.08rem;
              color: #ffffff;
            }
          }
          .car {
            padding: 0.3rem 0.5rem;
          }
        }
      }
    }
  }
}
</style>